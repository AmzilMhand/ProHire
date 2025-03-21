const express = require('express');
const { 
  createJob, 
  getJobs, 
  getJob, 
  updateJob, 
  deleteJob, 
  getRecruiterJobs 
} = require('../controllers/jobController');

const router = express.Router();

// Protect middleware
const { protect, authorize } = require('../middleware/auth');

// Routes
router.route('/')
  .get(getJobs)
  .post(protect, authorize('recruiter'), createJob);

router.route('/recruiter')
  .get(protect, authorize('recruiter'), getRecruiterJobs);

router.route('/:id')
  .get(getJob)
  .put(protect, authorize('recruiter'), updateJob)
  .delete(protect, authorize('recruiter'), deleteJob);

module.exports = router;
