const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  department: {
    type: String,
    required: [true, 'Please add a department'],
    trim: true
  },
  experienceLevel: {
    type: String,
    required: [true, 'Please add an experience level'],
    trim: true
  },
  skills: {
    type: [String],
    required: [true, 'Please add at least one required skill']
  },
  location: {
    type: String,
    required: [true, 'Please add a location']
  },
  contractType: {
    type: String,
    required: [true, 'Please add a contract type'],
    enum: ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship', 'Temporary']
  },
  salaryRange: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [5000, 'Description cannot be more than 5000 characters']
  },
  recruiter: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  company: {
    type: String,
    required: [true, 'Please add a company name']
  },
  status: {
    type: String,
    enum: ['open', 'closed', 'draft'],
    default: 'open'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Job', JobSchema);
