import mongoose from 'mongoose'
import { UserDocument } from './user.model'


// Typescript definition for the sessionSchema 
export interface sessionDocument extends mongoose.Document {
  user: UserDocument['_id'],
  valid: boolean,
  userAgent: string,
  createdAt: Date,
  updatedAt: Date 
}


// Mongoose used to define this before mongoose 6. For backward's compatibility, we will now just define it ourselves.
interface HookNextFunction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (error?: Error): any
}

// sessionSchema
const sessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user']
  },
  valid: {
    type: Boolean,
    default: true
  },
  userAgent: {
    type: String
  }
}, {
  timestamps:true
});


// session model
const SessionModel = mongoose.model<sessionDocument>('Session', sessionSchema)

export default SessionModel