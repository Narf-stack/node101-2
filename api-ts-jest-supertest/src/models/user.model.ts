import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import config from 'config'


// create a specific interface for user input, ommiting certains values to keep constency in user.controller#createUserHandler 
// from the interface for the req.body and the one expected by createUser match
export interface UserInput {
  email:string,
  name: string,
  password: string, 
}


// Typescript definition for the UserSchema 
export interface UserDocument extends UserInput, mongoose.Document {
  createdAt: Date,
  updatedAt: Date, 
  comparePassword(candidatePassword:string): Promise<Boolean>
}


// Mongoose used to define this before mongoose 6. For backward's compatibility, we will now just define it ourselves.
interface HookNextFunction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (error?: Error): any
}

// Userschema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please provide email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
    unique: true,
  },
  name: {
    type: String,
    required: [true, 'Please provide name'],
    maxlength: 50,
    minlength: 3,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
  },
}, {
  timestamps:true
});


// Encryption user password before saving using presave hook

userSchema.pre('save', async function(next: HookNextFunction) {
  let user  = this as UserDocument
  if(!user.isModified('password')){
    return next()
  }
  
  const saltWorkFactor = config.get<number>("saltWorkFactor") // how many rounds should you salt the password

  const salt = await bcrypt.genSalt(saltWorkFactor)

  const hash = await bcrypt.hashSync(this.password, salt)

  user.password = hash

  return next()
})

// Compare passaword when user log in 

userSchema.methods.comnparePassword = async function(candidatePassword:string): Promise<Boolean>{
  const user = this as UserDocument

  const isMatch = await bcrypt.compare(candidatePassword, user.password).catch((e) => false ) 
  return isMatch
}


// Users model
const UserModel = mongoose.model('User', userSchema)

export default UserModel