const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/macenza_careers';

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploads folder statically for resume viewing/downloading
const uploadsPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}
app.use('/uploads', express.static(uploadsPath));

// API Routes
const jobsRouter = require('./routes/jobs');
const applicationsRouter = require('./routes/applications');

app.use('/api/jobs', jobsRouter);
app.use('/api/applications', applicationsRouter);

// Base route for server health check
app.get('/', (req, res) => {
  res.json({ message: 'Macenza Careers API is running!' });
});

// Database connection & Server initialization
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully!');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Database connection error:', err);
    console.log('Starting server with local fallback modes...');
    // Start server even if database is offline so UI doesn't crash entirely
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT} without database connection.`);
    });
  });
