const Job = require('../models/Job');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Create a new job
// @route   POST /api/jobs
// @access  Private (Recruiter only)
exports.createJob = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.recruiter = req.user.id;
  
  const job = await Job.create(req.body);
  
  res.status(201).json({
    success: true,
    data: job
  });
});

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
exports.getJobs = asyncHandler(async (req, res, next) => {
  const jobs = await Job.find().populate({
    path: 'recruiter',
    select: 'firstName lastName'
  });
  
  res.status(200).json({
    success: true,
    count: jobs.length,
    data: jobs
  });
});

// @desc    Get jobs created by recruiter
// @route   GET /api/jobs/recruiter
// @access  Private (Recruiter only)
exports.getRecruiterJobs = asyncHandler(async (req, res, next) => {
  const jobs = await Job.find({ recruiter: req.user.id });
  
  res.status(200).json({
    success: true,
    count: jobs.length,
    data: jobs
  });
});

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Public
exports.getJob = asyncHandler(async (req, res, next) => {
  const job = await Job.findById(req.params.id).populate({
    path: 'recruiter',
    select: 'firstName lastName'
  });
  
  if (!job) {
    return next(new ErrorResponse(`Job not found with id of ${req.params.id}`, 404));
  }
  
  res.status(200).json({
    success: true,
    data: job
  });
});

// @desc    Update job
// @route   PUT /api/jobs/:id
// @access  Private (Recruiter only)
exports.updateJob = asyncHandler(async (req, res, next) => {
  let job = await Job.findById(req.params.id);
  
  if (!job) {
    return next(new ErrorResponse(`Job not found with id of ${req.params.id}`, 404));
  }
  
  // Make sure user is job owner
  if (job.recruiter.toString() !== req.user.id) {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to update this job`, 401));
  }
  
  job = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  
  res.status(200).json({
    success: true,
    data: job
  });
});

// @desc    Delete job
// @route   DELETE /api/jobs/:id
// @access  Private (Recruiter only)
exports.deleteJob = asyncHandler(async (req, res, next) => {
  const job = await Job.findById(req.params.id);
  
  if (!job) {
    return next(new ErrorResponse(`Job not found with id of ${req.params.id}`, 404));
  }
  
  // Make sure user is job owner
  if (job.recruiter.toString() !== req.user.id) {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to delete this job`, 401));
  }
  
  await job.deleteOne();
  
  res.status(200).json({
    success: true,
    data: {}
  });
});
