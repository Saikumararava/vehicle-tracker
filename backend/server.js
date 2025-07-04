const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());

const PORT = 5000;

// Endpoint to get dummy vehicle data
app.get('/api/vehicle', (req, res) => {
  fs.readFile('backend/vehicleData.json', (err, data) => {
    if (err) return res.status(500).json({ error: 'Error reading data file' });
    res.json(JSON.parse(data));
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
