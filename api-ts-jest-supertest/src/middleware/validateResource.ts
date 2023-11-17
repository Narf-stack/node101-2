import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
import {StatusCodes} from 'http-status-codes'


const validate = (schema:AnyZodObject) => (req:Request, res:Response, next:NextFunction) => {
  try {
    schema.parse({
      body:req.body,
      query:req.query,
      params:req.params,
    })
  } catch (e:any) {
    return res.status(StatusCodes.BAD_REQUEST).send(e.errors)
  }
}

export default validate
