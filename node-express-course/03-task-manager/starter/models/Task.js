const mongoose = require('mongoose')

// Creation of our data schema 
const TaskSchema = new mongoose.Schema({
  name:String,completed: Boolean
})

// Export of our data model - (mongoose.model(ModelNameSingular, ModelNameSchema)
module.exports = mongoose.model('Task', TaskSchema)