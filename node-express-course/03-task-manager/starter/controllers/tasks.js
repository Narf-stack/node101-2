const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')


const getTasks = asyncWrapper(async (req,res)=>{
    const tasks = await Task.find({})
    res.status(200).json({tasks})
})

const createTask = asyncWrapper(async (req,res)=>{
    const task = await Task.create(req.body)
    res.status(201).json({task})
})

const getSingleTask = asyncWrapper(async (req,res)=>{
  const { id:taskID } = req.params
    const task = await Task.findOne({_id:taskID})

    if(!task){
      // never forget the return otherwise infinity loop
      return res.status(404).json({msg: `No task id ${taskID} `})
    }
    res.status(200).json({task})
})

const updateSingleTask = asyncWrapper(async (req,res)=>{
  const newTaskValues = req.body
  const { id:taskID } = req.params
  const filter = { _id: taskID }

  const updatedTask = await Task.findOneAndUpdate(filter,newTaskValues, {
    new:true,
    runValidators: true
  })

  if(!updatedTask){
    // never forget the return otherwise infinity loop
    return res.status(404).json({msg: `No task id ${taskID} `})
  }

  res.status(200).json({task:updatedTask, status:'success'})
})

const delSingleTask = asyncWrapper(async (req,res)=>{
  const { id:taskID } = req.params
    const task = await Task.findOneAndDelete({_id:taskID})

    if(!task){
      // never forget the return otherwise infinity loop
      return res.status(404).json({msg: `No task id ${taskID} `})
    }
    // res.status(200).json({task})
    // res.status(200).send()
    res.status(200).json({task:null, status:'success'})
})


module.exports = {
  getTasks, createTask, getSingleTask, updateSingleTask, delSingleTask
}