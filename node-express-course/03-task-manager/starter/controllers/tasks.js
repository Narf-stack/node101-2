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

const updateSingleTask = (req,res)=>{
  const { id } = req.params

  res.status(200).json({success: true, data: `update task id ${id}`})
}

const delSingleTask = (req,res)=>{
  const { id } = req.params

  res.status(200).json({success: true, data: `del task id ${id}`})
}


module.exports = {
  getTasks, createTask, getSingleTask, updateSingleTask, delSingleTask
}