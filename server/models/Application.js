const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  candidateName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    trim: true
  },
  experience: {
    type: String, // Years of Experience
    trim: true
  },
  linkedInUrl: {
    type: String,
    trim: true
  },
  portfolioUrl: {
    type: String,
    trim: true
  },
  coverLetter: {
    type: String
  },
  resume: {
    type: String, // File path of the uploaded resume
    required: true
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: false // Allow standalone applications if needed, but usually linked
  },
  status: {
    type: String,
    enum: ['Applied', 'Shortlisted', 'Interview Scheduled', 'Selected', 'Rejected'],
    default: 'Applied'
  },
  notes: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Application', ApplicationSchema);
