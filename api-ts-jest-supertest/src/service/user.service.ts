import UserModel, { UserInput } from '../models/user.model'
import log from '../utils/logger'


export async function createUser(input: UserInput) {
  try {
    return await UserModel.create(input)
  } catch (error:any) {
    throw new Error(error)
  }
}