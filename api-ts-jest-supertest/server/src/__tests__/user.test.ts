import * as UserService from "../service/user.service"
import * as SessionService from "../service/session.service"
import mongoose from "mongoose"
import createServer from "../utils/server"
import supertest from "supertest"
import { createUserSessionHandler } from "../controller/session.controller"

// we gonna mock out and spy on our service
const app = createServer()
const userId = new mongoose.Types.ObjectId().toString()

const userPayload = {
  _id: userId,
  email: "test@example.com",
  name: "Jane Doe"
}
const userInput = {
  email: "test@example.com",
  password: "Password456!",
  passwordConfirmation: "Password456!",
  name: "Jane Doe"
}

const sessionPayload = {
  _id: new mongoose.Types.ObjectId().toString(),
  user: userId,
  valid:true,
  userAgent:"PostmanRuntime/7.29.2",
  createdAt: new Date("2023-09-30T13:31:07.674Z"),
  updatedAt:new Date("2023-09-30T13:31:07.674Z"),
  __v:0
}

describe('user',() => {
  // Test plan
  // user registration
    // username & password get validated
    // verify password match
    // veify handler handles any errors

    describe('user registration',() => {
      describe('given username & password are valid ',() => {
        it('should return the user payload',async () => {
          const createUserServiceMock = jest
            .spyOn(UserService, 'createUser') // spyon takes 2 arguments. The first is the object you wanna spy on, the second the specific property inside the object
            // @ts-ignore                       will ignore checking for next
            .mockReturnValueOnce(userPayload) // mock out returned payload

          const {body, statusCode} = await supertest(app).post('/api/users').send(userInput) // ".send()" because sending a payload
          expect(statusCode).toBe(201)
          expect(body).toEqual(userPayload)
          expect(createUserServiceMock).toHaveBeenCalledWith(userInput)
        })

      })

      describe('given the password do not match',() => {
        it('it should return 400',async() => {
      
          const createUserServiceMock = jest
          .spyOn(UserService, 'createUser') // spyon takes 2 arguments. The first is the object you wanna spy on, the second the specific property inside the object
          // @ts-ignore                       
          .mockReturnValueOnce(userPayload) // mock out returned payload

          const {statusCode} = await supertest(app).post('/api/users').send({...userInput, passwordConfirmation:'no match'}) // spread userInput to change the passwordConfirmation
          expect(statusCode).toBe(400)
          expect(createUserServiceMock).not.toHaveBeenCalled()
          
        })
      })

      describe('given the user service throws',() => {
        it('it should return 409',async() => {
      
          const createUserServiceMock = jest
          .spyOn(UserService, 'createUser') // spyon takes 2 arguments. The first is the object you wanna spy on, the second the specific property inside the object
          // @ts-ignore                       
          .mockRejectedValue('rejected') // mock out rejection

          const {statusCode} = await supertest(app).post('/api/users').send({userInput}) // spread userInput to change the passwordConfirmation
          expect(statusCode).toBe(409)
          expect(createUserServiceMock).toHaveBeenCalled()
        })
      })
    })

  // creating a user session
    // user can login with a valid email and password
  describe('create user session',() => {
    describe('given username & password are valid ',() => {
      it('should return sign access token & refresh token', async() => {

        jest
          .spyOn(UserService, "validatePassword")
          // @ts-ignore                       
          .mockReturnValue(userPayload)

        jest
          .spyOn(SessionService, "createSession")
          // @ts-ignore                       
          .mockReturnValue(sessionPayload)
      
        const req = {
          get: () => {
            return ' user agent'
          },
          body: {
            email: "a@gmail.com",
            password: "testtest"
          }
        }
        

        const send = jest.fn()
        const status = jest.fn()

        const res = {
          send,
          status 
        }

        // @ts-ignore                 the req object does not meet all the requirement of the request interface from Express  so we gonna ignore     
        await createUserSessionHandler(req,res)

        expect(send).toHaveBeenCalledWith({
          accessToken: expect.any(String),
          refreshToken: expect.any(String)
        })

      })
    })
  })
})