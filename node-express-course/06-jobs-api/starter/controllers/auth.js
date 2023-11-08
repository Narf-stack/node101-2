const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors/index')
const jwt = require('jsonwebtoken')



const register = async (req,res) => {
  const user = await User.create({...req.body})
  const token = jwt.sign(
    {
      userID:user._id,
      name:user.name
    },
    process.env.JWT_SECRET,
    {expiresIn:'30d'}
  )
  res.status(StatusCodes.CREATED).json({ user:{name: user.name}, token})
}


const login = async (req,res) => {
  res.json({success: true, msg:'user logged'})
}


module.exports = {
  register, login 
}