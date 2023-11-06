



const getTasks = (req,res)=>{
  res.status(200).send('all tasks ')
}

const createTask = (req,res)=>{
  res.status(200).send('create task ')
}

const getSingleTask = (req,res)=>{
  res.status(200).send('get single task ')
}

const updateSingleTask = (req,res)=>{
  res.status(200).send('update single task ')
}

const delSingleTask = (req,res)=>{
  res.status(200).send('delete single task ')
}


module.exports = {
  getTasks, createTask, getSingleTask, updateSingleTask, delSingleTask
}