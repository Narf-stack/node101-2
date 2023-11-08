const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'must provide name'],
    trim: true,
    maxlength: [20, 'name can not be more than 20 characters'],
    minlength: [3, 'name can not be less than 3 characters'],
  },
  email: {
    type: String,
    required: [true, 'must provide email'],
    trim: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
      'provide email'
    ],
    unique:true 
  },
  password:{
    type: String,
    required: [true, 'must provide password'],
    trim: true,
    minlength: [3, 'password can not be less than 3 characters']
  }
})

UserSchema.pre('save', async function(){
  // PASSWORD ENCRYPTION.

  // Generate random byte for the password encryption.
  // The more the byte the more secure the encryption but more processing power required
  const salt = await bcrypt.genSalt(10)
  //   encryption.
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT= function (){
  return jwt.sign(
    {
      userID: this._id,
      name: this.name
    },
    process.env.JWT_SECRET,
    {expiresIn:'30d'}
  )
}

module.exports = mongoose.model('User',UserSchema)