const Task = require('../models/Task')
const getTasks = async (req,res)=>{
  try {
    const tasks = await Task.find({})
    res.status(200).json({tasks})
  } catch (error) {
    res.status(500).json({msg: error})
  }
}

const createTask = async (req,res)=>{
  try {
    const task = await Task.create(req.body)
    res.status(201).json({task})
  } catch (error) {
    res.status(500).json({msg: error})
  }
}

const getSingleTask = async (req,res)=>{
  const { id:taskID } = req.params
  try {
    const task = await Task.findOne({_id:taskID})

    if(!task){
      // never forget the return otherwise infinity loop
      return res.status(404).json({msg: `No task id ${taskID} `})
    }
    res.status(200).json({task})
  } catch (error) {
    res.status(500).json({msg: error})
  }
}

const updateSingleTask = async (req,res)=>{
  const newTaskValues = req.body
  const { id:taskID } = req.params
  const filter = { _id: taskID };


  try {
    const updatedTask = await Task.findOneAndUpdate(filter,newTaskValues, {
      new:true,
      runValidators: true
    })

    if(!updatedTask){
      // never forget the return otherwise infinity loop
      return res.status(404).json({msg: `No task id ${taskID} `})
    }

    res.status(200).json({task:updatedTask, status:'success'})
  } catch (error) {
    res.status(500).json({msg: error})
  }
}

const delSingleTask = async (req,res)=>{
  const { id:taskID } = req.params
  try {
    const task = await Task.findOneAndDelete({_id:taskID})

    if(!task){
      // never forget the return otherwise infinity loop
      return res.status(404).json({msg: `No task id ${taskID} `})
    }
    // res.status(200).json({task})
    // res.status(200).send()
    res.status(200).json({task:null, status:'success'})
  } catch (error) {
    res.status(500).json({msg: error})
  }
}


module.exports = {
  getTasks, createTask, getSingleTask, updateSingleTask, delSingleTask
}