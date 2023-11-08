const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors/index')

const register = async (req,res) => {
  const user = await User.create({...req.body})
  res.status(StatusCodes.CREATED).json({user})
}


const login = async (req,res) => {
  res.json({success: true, msg:'user logged'})
}


module.exports = {
  register, login 
}