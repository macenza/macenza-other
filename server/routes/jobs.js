const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// GET all jobs (public can see only Active ones, admin can see all)
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    const filter = {};
    if (status) {
      filter.status = status;
    }
    // Sort by newest first
    const jobs = await Job.find(filter).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server error retrieving jobs', error: error.message });
  }
});

// POST Create a job
router.post('/create', async (req, res) => {
  try {
    const jobData = req.body;
    const newJob = new Job(jobData);
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    res.status(400).json({ message: 'Error creating job', error: error.message });
  }
});

// PUT Update a job
router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updatedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(updatedJob);
  } catch (error) {
    res.status(400).json({ message: 'Error updating job', error: error.message });
  }
});

// DELETE Delete a job
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedJob = await Job.findByIdAndDelete(id);
    if (!deletedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json({ message: 'Job deleted successfully', id });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting job', error: error.message });
  }
});

module.exports = router;
