const mongoose = require('mongoose')

// Creation of our data schema 
const TaskSchema = new mongoose.Schema({
  name:{
    // Validators
    type: String,
    required:[true, 'must provide name'],
    trim:true,
    maxlength: [10, 'name can not be more than 10 characters'],
    minlength: [3, 'name can not be less than 3 characters'],
  },
  completed:{
    // Validators
    type: Boolean,
    default: false
  }
})

// Export of our data model - (mongoose.model(ModelNameSingular, ModelNameSchema)
module.exports = mongoose.model('Task', TaskSchema)