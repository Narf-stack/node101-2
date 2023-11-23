import mongoose from 'mongoose'
import { UserDocument } from './user.model.js'
// import { customAlphabet } from "nanoid";
import { v4 as uuidv4 } from 'uuid';

// Use dynamic import

// async function customAlphabet() {
//   // Use dynamic import
//   const nanoidModule = await import("nanoid");
//   const { customAlphabet } = nanoidModule;

//   // Now you can use customAlphabet as usual
//   const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);
//   // console.log(nanoid());
//   return nanoid
// }


// const nanoid = customAlphabet()
// const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

// Typescript definition for the productSchema 
export interface ProductDocument extends mongoose.Document {
  user: UserDocument['_id'],
  title: string,
  description: string,
  price:number,
  image:string,
  createdAt: Date,
  updatedAt: Date 
}


export interface ProductInput {
  user: UserDocument["_id"];
  title: string;
  description: string;
  price: number;
  image: string;
}

export interface ProductDocument extends ProductInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}
// Mongoose used to define this before mongoose 6. For backward's compatibility, we will now just define it ourselves.
interface HookNextFunction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (error?: Error): any
}

// productSchema
const productSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user']
  },
  productId: {
    type: String,
    required: true,
    unique: true,
    default: () => `product_${uuidv4()}`,
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  }
}, {
  timestamps:true
});


// product model
const ProductModel = mongoose.model<ProductDocument>('Product', productSchema)

export default ProductModel