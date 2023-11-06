const Task = require('../models/Task')
const getTasks = (req,res)=>{
  res.status(200).send('all tasks ')
}

const createTask = async (req,res)=>{
  const task = await Task.create(req.body)
  res.status(201).json({task})
}

const getSingleTask = (req,res)=>{
  const { id } = req.params

  res.status(200).json({success: true, data: `create task id ${id}`})
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