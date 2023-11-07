const Product = require('../models/product')


const getProductsStatic = async (req,res) =>{
  const products = await Product.find({})
  res.status(200).json({nbhits: products.length, status: 'success', data:products})
}

const getProducts = async (req,res) =>{
  const { featured, company, name, sort, fields } = req.query
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

  let result = Product.find(queryObject)
  // sort 
  if(sort) {
    const sortList = sort.split(',').join(' ')
    result = result.sort(sortList)
  } else {
    result = result.sort('createdAt')
  }
  // filter fields 
  if(fields) {
    const fieldsList = fields.split(',').join(' ')
    result = result.select(fieldsList)
  } 
  
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page -1) * limit

  result = result.skip(skip).limit(limit)

  const products = await result
  res.status(200).json({nbhits: products.length, status: 'success', data:products})
}


module.exports = {
  getProductsStatic, getProducts
}