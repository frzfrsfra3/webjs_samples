const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8081;

// Use body-parser to parse JSON bodies
app.use(bodyParser.json());

// Webhook endpoint
app.post('/webhook', (req, res) => {
  const message = req.body.message;
  console.log(`Webhook received message: ${message}`);
  
  // Respond to the WebSocket server
  res.status(200).send('Received');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Webhook server is running on http://localhost:${PORT}`);
});
