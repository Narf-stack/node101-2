


const getProductsStatic = async (req,res) =>{
  res.status(200).json({msg:'all products testing routes'})
}

const getProducts = async (req,res) =>{
  res.status(200).json({msg:'all products'})
}


module.exports = {
  getProductsStatic, getProducts
}