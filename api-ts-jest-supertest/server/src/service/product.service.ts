import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ProductModel, { ProductInput,ProductDocument } from "../models/product.model";
import { databaseResponseTimeHistogram } from "../utils/metrics";


export async function createProduct(input:ProductInput ){
  const metricslabels = {
    operation: 'createProduct' // operation define which action being done, use function name
  }
  const timer = databaseResponseTimeHistogram.startTimer() // initiate for response time for DB operation 'createProduct'

  try {
    const product = await ProductModel.create(input)
    timer({...metricslabels, success: "true"})
    return product
    
  } catch (error) {
    timer({...metricslabels, success: "false"})
    throw error
  }
}

export async function getProduct(query:FilterQuery<ProductDocument>, options: QueryOptions = { lean: true }){
  
  const metricslabels = {
    operation: 'getProduct' // operation define which action being done, use function name
  }
  const timer = databaseResponseTimeHistogram.startTimer() // initiate for response time for DB operation 'createProduct'

  try {
    const product = ProductModel.find(query, {}, options).lean()
    timer({...metricslabels, success: "true"})
    return product
    
  } catch (error) {
    timer({...metricslabels, success: "false"})
    throw error
  }
}

export async function updateProduct(
  query: FilterQuery<ProductDocument>,
  update: UpdateQuery<ProductDocument>,
  options: QueryOptions) {
  const product = await ProductModel.findOneAndUpdate(query, update, options)
  return product
}

export async function deleteProduct(query:FilterQuery<ProductDocument>){
  const product = await ProductModel.deleteOne(query)
  return product
}