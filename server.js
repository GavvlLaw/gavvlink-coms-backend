// server.js
require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// Basic test route
app.get('/', (req, res) => {
  res.send('Aircall Backend is running!');
});

// Example endpoint for making an outbound call via Aircall
app.post('/api/makeCall', async (req, res) => {
  const { to } = req.body;
  if (!to) {
    return res.status(400).json({ error: 'Destination number is required' });
  }
  try {
    // Aircall call creation logic goes here; this is a stub example
    const response = await axios.post('https://api.aircall.io/v1/calls', 
      {
        from: process.env.FROM_PHONE_NUMBER,
        to: to,
      },
      {
        auth: {
          username: process.env.AIRCALL_API_KEY,
          password: '' // if no password is required
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
