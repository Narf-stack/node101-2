import supertest from "supertest"
import createServer from "../utils/server"
import { MongoMemoryServer} from "mongodb-memory-server" // will start an in memory version of MongoDB, because we connect in the code (overkill option, because we are mocking the MongodDB service)
import mongoose from "mongoose"
import { createProduct } from "../service/product.service"
import { signJwt } from "../utils/jwt.utils"


const app = createServer()
const userId = new mongoose.Types.ObjectId().toString()

// Payloads
// for cleaningless strore the payload in fixture file 
export const productPayload = {
  user: userId,
  title: "Canon EOS 1500D DSLR Camera with 18-55mm Lens",
  description: "Designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy to use automatic shooting modes, large 24.1 MP sensor, Canon Camera Connect app integration and built-in feature guide, EOS 1500D is always ready to go.",
  price: 567.9,
  image: "https://i.imgur.com/QlRphfQ.jpg"
}

export const userPayload = {
  _id: userId,
  email: "a@gmail.com",
  name: 'sdfghj'
}

describe('product', () => {
  beforeAll(async() => {
    const mongoServer = await MongoMemoryServer.create() // create an instance of MongoDB in memory so we can connect

    await mongoose.connect(mongoServer.getUri())
  })

  afterAll(async()=>{ // will close the connection to MongoDB
    await mongoose.disconnect()   
    await mongoose.connection.close()
  })

  describe('get product route', ()=>{
    // describe('given the product does not exist', ()=>{ // under what condition it is being tested
    //   it('should return a 404', async()=>{ // supertest return a promess so we need a async here  
    //     const productId= 'product-123'

    //     await supertest(app).get(`/api/products/${productId}`).expect(404) // supertest is a way to connect to the api 
    //   })
    // })

    describe('given the product does exist', ()=>{ // under what condition it is being tested
      it('should return a 200 and the product', async()=>{ // supertest return a promess so we need a async here  
        const product = await createProduct(productPayload)
        const productId = product.productId

        const {body, statusCode} = await supertest(app).get(`/api/products/${productId}`) // supertest is a way to connect to the api 
          
        expect(statusCode).toBe(200)
        expect(body[0].productId).toBe(product.productId)
      })
    })
  })

  describe('create product route', ()=>{
    describe('given the user is not logged in', ()=>{ // under what condition it is being tested
      it('should return a 403', async()=>{ // supertest return a promess so we need a async here  
        // const {statusCode} = await supertest(app).post("/api/products") 
          
        // expect(statusCode).toBe(403)
      })
    })

    describe('given the user is logged in', ()=>{ // under what condition it is being tested
      it('should return a 200 and create the product', async()=>{ // supertest return a promess so we need a async here  
        const jwt = signJwt(userPayload)

        const {body, statusCode,error} = await supertest(app)
          .post(`/api/products`)
          .set('Authorization', `Bearer ${jwt}`)
          .send(productPayload)

        
        expect(statusCode).toBe(200)
        expect(body).toEqual({
          __v: 0,
          _id: expect.any(String),
          createdAt: expect.any(String),
          description: "Designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy to use automatic shooting modes, large 24.1 MP sensor, Canon Camera Connect app integration and built-in feature guide, EOS 1500D is always ready to go.",
          image: "https://i.imgur.com/QlRphfQ.jpg",
          price: 567.9,
          productId: expect.any(String),
          title: "Canon EOS 1500D DSLR Camera with 18-55mm Lens",
          updatedAt: expect.any(String),
          user: expect.any(String) // since this is a dynamic value, we just expecting a value with the correct type
        })
      })
    })
  })
})