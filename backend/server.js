const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

// Enable CORS so frontend on Vercel can fetch data from backend
app.use(cors());

// Root route to avoid "Cannot GET /" error
app.get('/', (req, res) => {
  res.send('🚗 Vehicle Tracker Backend is running!');
});

// API endpoint to get dummy vehicle data
app.get('/api/vehicle', (req, res) => {
  const filePath = path.join(__dirname, 'vehicleData.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading vehicleData.json:', err);
      return res.status(500).json({ error: 'Failed to read vehicle data.' });
    }

    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (parseErr) {
      console.error('Error parsing vehicleData.json:', parseErr);
      res.status(500).json({ error: 'Invalid JSON format in data file.' });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
