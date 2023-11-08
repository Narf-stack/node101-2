const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors/index')
const bcrypt = require('bcryptjs')

const register = async (req,res) => {
  const {name, email, password} = req.body

  // PASSWORD ENCRYPTION.

  // Generate random byte for the password encryption.
  // The more the byte the more secure the encryption but more processing power required
  const salt = await bcrypt.genSalt(10)
  // encryption.
  const hashPassword = await bcrypt.hash(password, salt)

  // temporary user
  const tempUser = { name, email, password:hashPassword}
  const user = await User.create({...tempUser})
  res.status(StatusCodes.CREATED).json({user})
}


const login = async (req,res) => {
  res.json({success: true, msg:'user logged'})
}


module.exports = {
  register, login 
}