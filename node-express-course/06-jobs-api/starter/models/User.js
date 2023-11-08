const mongoose = require('mongoose')

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
    maxlength: [20, 'password can not be more than 20 characters'],
    minlength: [3, 'password can not be less than 3 characters']
  }
})

module.exports = mongoose.model('User',UserSchema)