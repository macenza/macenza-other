const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Application = require('../models/Application');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

// File Filter (Optional: PDF, DOC, DOCX only)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['.pdf', '.doc', '.docx'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF, DOC, and DOCX are allowed.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// POST Create application (Public Candidate Apply Form)
router.post('/create', upload.single('resume'), async (req, res) => {
  try {
    const {
      candidateName,
      email,
      phone,
      location,
      experience,
      linkedInUrl,
      portfolioUrl,
      coverLetter,
      jobId
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Resume file is required' });
    }

    // Save relative path accessible via static middleware
    const resumePath = `/uploads/${req.file.filename}`;

    const newApplication = new Application({
      candidateName,
      email,
      phone,
      location,
      experience,
      linkedInUrl,
      portfolioUrl,
      coverLetter,
      resume: resumePath,
      jobId: jobId || null,
      status: 'Applied',
      notes: ''
    });

    await newApplication.save();
    
    // Populate job details for client feedback if needed
    const populated = await newApplication.populate('jobId');
    res.status(201).json(populated);
  } catch (error) {
    res.status(400).json({ message: 'Error submitting application', error: error.message });
  }
});

// GET applications (with optional query filtering)
router.get('/', async (req, res) => {
  try {
    const { status, search, location, jobId } = req.query;
    const filter = {};

    if (status) {
      filter.status = status;
    }
    if (jobId) {
      filter.jobId = jobId;
    }
    if (location) {
      filter.location = { $regex: location, $options: 'i' };
    }
    if (search) {
      filter.$or = [
        { candidateName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const applications = await Application.find(filter)
      .populate('jobId')
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Server error retrieving applications', error: error.message });
  }
});

// GET filtered applications (explicit filter route just in case)
router.get('/filter', async (req, res) => {
  try {
    const { name, location, position, experience, employmentType } = req.query;
    const filter = {};

    if (name) {
      filter.candidateName = { $regex: name, $options: 'i' };
    }
    if (location) {
      filter.location = { $regex: location, $options: 'i' };
    }
    if (experience) {
      filter.experience = { $regex: experience, $options: 'i' };
    }

    let applications = await Application.find(filter).populate('jobId');

    // Filter by Job Position Title or Job Employment Type since they are nested in Job schema
    if (position || employmentType) {
      applications = applications.filter(app => {
        if (!app.jobId) return false;
        let match = true;
        if (position && !app.jobId.title.toLowerCase().includes(position.toLowerCase())) {
          match = false;
        }
        if (employmentType && app.jobId.employmentType !== employmentType) {
          match = false;
        }
        return match;
      });
    }

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Server error filtering applications', error: error.message });
  }
});

// PUT Update application status and notes
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    
    const updateData = {};
    if (status !== undefined) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;

    const updatedApp = await Application.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).populate('jobId');
    if (!updatedApp) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.json(updatedApp);
  } catch (error) {
    res.status(400).json({ message: 'Error updating application', error: error.message });
  }
});

module.exports = router;
