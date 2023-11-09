const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors/index')


const authenticateUser = async (req,res,next) =>{

  // check header
  const authHeader = req.headers.authorization
  
  if(!authHeader || !authHeader.startsWith('Bearer ')){
    throw new UnauthenticatedError('Authentication invalid')
  }

  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    // attach the user to the job routes
    req.user = { userID:payload.userID, name: payload.name }
    // alternate option by fetching in the DB
    // const user = User.findById(payload.id).select('-password')
    // req.user = user
    
    next()
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid')
  }
}

module.exports = authenticateUser