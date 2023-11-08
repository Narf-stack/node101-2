

const getJobs = async (req,res) => {
  res.status(200).json({success: true, data:'all jobs'})
}

const getJob = async (req,res) => {
  res.status(200).json({success:true, data:'the job'})
}

const createJob = async (req,res) => {
  res.status(200).json({success: true, data:'job created'})
}

const updateJob = async (req,res) => {
  res.status(200).json({success:true, data:'jpb updated'})
}

const deleteJob = async (req,res) =>{
  res.status(200).json({success:true, data:'job deleted'})
}

module.exports = {
  getJobs, getJob, createJob, updateJob, deleteJob
}