const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
  featured: {
    type:Boolean,
    default: false
  },
  rating: {
    type:Number,
    default: 4.5
  },
  createdAt:{
    type: Date,
    default: Date.now()
  },
  name: {
    type:String,
    required:[true, 'must provide name'],
    trim:true
  },
  price: {
    type:Number,
    required:[true, 'must provide price'],
    trim:true
  },
  company: {
    type:String,
    enum: {
      values: ['ikea','liddy','caressa','marcos'],
      message: '{VALUES} is not in the list'
    },
    // enum: ['ikea','liddy','caressa','marcos'],
  }
})


module.exports = mongoose.model('Product',productSchema)