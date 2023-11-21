import { object, string } from "zod"

// define the User paylod when creation 
// https://github.com/colinhacks/zod#coercion-for-primitives
export const createSessionSchema  = object({
  body:object({
    password: string({
      required_error: 'password is required'
    }).min(6, 'Password should be 6 chars min'), 
    email: string({
      required_error: 'email is required'
    }).email('not valid email')
  })
})
