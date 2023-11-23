import { Request, Response, NextFunction} from 'express'
import { StatusCodes } from 'http-status-codes'

const requireUser = (req:Request, res:Response, next: NextFunction) => {
  const user = res.locals.user

  if(!user) { // will have a decoded if the token is valid 
    return res.status(StatusCodes.FORBIDDEN)
  }
  return next()
}

export default requireUser