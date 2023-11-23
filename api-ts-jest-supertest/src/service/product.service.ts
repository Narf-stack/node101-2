import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ProductModel, { ProductInput,ProductDocument } from "../models/product.model";


export async function createProduct(input:ProductInput ){
  const product = await ProductModel.create(input)
  return product

}

export async function getProduct(query:FilterQuery<ProductDocument>, options: QueryOptions = { lean: true }){
  const product = await ProductModel.find(query, {}, options).lean()
  return product
}

export async function updateProduct(
  query: FilterQuery<ProductDocument>,
  update: UpdateQuery<ProductDocument>,
  options: QueryOptions) {
  const product = await ProductModel.findOneAndUpdate(query, update, options)
  return product
}

export async function deleteProduct(query:FilterQuery<ProductDocument>){
  const product = ProductModel.deleteOne(query)
  
}