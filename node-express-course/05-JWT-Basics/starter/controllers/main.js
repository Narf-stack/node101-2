require('dotenv').config()
const jwt = require('jsonwebtoken')
const CustomAPIError = require('../errors/custom-error')


const login = async (req,res)=> {
  const { username, password} = req.body

  // How check if credentials are provided 
  // Option 1 : Use Mongoose validation and check with the DB
  // Option 2 : Use Joi validation to check input for put request
  // Option 3 : Check in controller right away 
  if(!username || !password){
   throw new CustomAPIError('provide login credentials',400) 
  }

  // Since no DB connection, we create a fake ID
  const id = new Date().getDate()

  // try to keep the payload small, better UX. If big payload, it will be more heavy to receive if bad internet connection, 
  const token = jwt.sign(
    {
      id,
      username
    },
    process.env.JWT_SECRET,
    {expiresIn:'30d'}
  )
  res.status(200).json({msg:'user created', token})
}


const dashboard = async (req,res) => {
  const luckyNumber = Math.random()*100

  res.status(200).json({ msg:`hello ${req.user.username}`, secret:`num: ${luckyNumber}`})
}

module.exports = {login, dashboard}