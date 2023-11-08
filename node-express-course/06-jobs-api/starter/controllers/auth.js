

const register = async (req,res) => {
  res.status(200).json({success: true, msg:'user registered'})
}


const login = async (req,res) => {
  res.status(200).json({success: true, msg:'user logged'})
}


module.exports = {
  register, login 
}