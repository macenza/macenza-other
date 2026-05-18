const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  department: {
    type: String,
    required: true,
    trim: true
  },
  salary: {
    type: String,
    trim: true
  },
  employmentType: {
    type: String,
    enum: ['Full Time', 'Part Time', 'Internship', 'Contract'],
    default: 'Full Time'
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  experience: {
    type: String,
    trim: true
  },
  skills: {
    type: String, // Comma-separated skills or array of skills, string is easiest for simple form entries
    trim: true
  },
  openings: {
    type: Number,
    default: 1
  },
  deadline: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  requirements: {
    type: String
  },
  benefits: {
    type: String
  },
  status: {
    type: String,
    enum: ['Active', 'Draft'],
    default: 'Active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Job', JobSchema);
