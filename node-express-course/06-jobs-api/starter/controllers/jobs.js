const { StatusCodes } = require('http-status-codes')
const Job = require('../models/Job')
const { BadRequestError, NotFoundError } = require('../errors/index')


const getJobs = async (req,res) => {
  const jobs = await Job.find({createdBy: req.user.userID}).sort('createdAt')
  res.status(StatusCodes.OK).json({jobs, count: jobs.length})
}

const getJob = async (req,res) => {
  const {user:{userID}, params:{id:jobID}} = req
  const job = await Job.findOne({_id:jobID, createdBy:userID})

  if(!job){
    throw new NotFoundError(`No job id ${jobID}`)
  }

  res.status(StatusCodes.OK).json({job})
}

const createJob = async (req,res) => {
  req.body.createdBy = req.user.userID
  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json({job})
}

const updateJob = async (req,res) => {
  const {user:{userID}, params:{id:jobID}, body:{company,position, status}} = req

  if(company ===' ' || position ===' '){
    throw new BadRequestError('please provide params')
  }
  const filter = {_id:jobID, createdBy:userID}
  const newjobValues = {company:company, position:position, status:status}
  const updatedjob = await Job.findOneAndUpdate(filter,newjobValues, {
    new:true,
    runValidators: true
  })

  if(!updatedjob){
    throw new NotFoundError(`No job id ${jobID}`)
  }

  res.status(StatusCodes.OK).json({success:true, job:updatedjob})
}

const deleteJob = async (req,res) =>{
  const {user:{userID}, params:{id:jobID}} = req
  const job = await Job.findByIdAndRemove({_id:jobID, createdBy:userID})
  if(!job){
    // never forget the return otherwise infinity loop
    return next( new NotFoundError(`No job id ${jobID}`))
  }
  res.status(StatusCodes.OK).json({success:true, data:job })
}

module.exports = {
  getJobs, getJob, createJob, updateJob, deleteJob
}