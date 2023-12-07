import { object, string, TypeOf } from "zod"

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - email
 *        - name
 *        - password
 *        - passwordConfirmation
 *      properties:
 *        email:
 *          type: string
 *          default: jane.doe@example.com
 *        name:
 *          type: string
 *          default: Jane Doe
 *        password:
 *          type: string
 *          default: stringPassword123
 *        passwordConfirmation:
 *          type: string
 *          default: stringPassword123
 *    CreateUserResponse:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *        name:
 *          type: string
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */

// define the User payload when creation 
// https://github.com/colinhacks/zod#coercion-for-primitives
export const createUserSchema  = object({
  body:object({
    name: string({
      required_error: 'Name is required'
    }), 
    password: string({
      required_error: 'password is required'
    }).min(6, 'Password should be 6 chars min'),
    passwordConfirmation: string({
      required_error: 'password is required'
    }).min(6, 'Password confirmation should be 6 chars min'), 
    email: string({
      required_error: 'password is required'
    }).email('not valid email')
  }).refine((data) => data.password === data.passwordConfirmation, { // https://github.com/colinhacks/zod#customize-error-path
    message: "Passwords don't match",
    path: ["passwordConfirmation"]
  })
})

// create the interface for user input, and ommiting the value for passwordConfirmation so that 
// in user.controller#createUserHandler the interface for the req.body and the one expected by createUser match
export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>, 'body.passwordConfirmation'> 