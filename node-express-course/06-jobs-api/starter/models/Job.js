const mongoose = require('mongoose')


const JobSchema = new mongoose.schema({
  company: {
    type: String,
    required:[true, 'must provide cpny'],
    trim:true,
    minlength: [3, 'name can not be less than 3 characters'],
    maxlength: [50, 'name can not be less than 50 characters']
  },
  position: {
    type: String,
    required:[true, 'must provide position'],
    trim:true,
    minlength: [3, 'name can not be less than 3 characters'],
    maxlength: [100, 'name can not be less than 50 characters']
  },
  status: {
    type: String,
    default: 'pending',
    enum: [ 'interview', 'declined', 'pending']
  },
  createdBy: {
    type: mongoose.Types.ObjectId, // Precise that the type will be an Id from a relation
    ref: 'User', // specify the name of the model for the relation with
    required:[true, 'must provide user']
  }
},{timestamps:true})

module.exports = mongoose.model('Job', JobSchema)