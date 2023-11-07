const Product = require('../models/product')


const getProductsStatic = async (req,res) =>{
  const products = await Product.find({})
  res.status(200).json({nbhits: products.length, status: 'success', data:products})
}

const getProducts = async (req,res) =>{
  const { featured, company, name } = req.query
  const queryObject = {}

  if(featured){
    queryObject.featured = featured ==='true' ? true : false
  }
  if(company){
    queryObject.company = company
  }
  if(name){
    queryObject.name ={$regex: name, $options: 'i'}
  }
  const products = await Product.find(queryObject)
  res.status(200).json({nbhits: products.length, status: 'success', data:products})
}


module.exports = {
  getProductsStatic, getProducts
}