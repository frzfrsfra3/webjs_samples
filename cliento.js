const fs = require('fs');
const https = require('https');
const WebSocket = require('ws');

// Options to allow self-signed certificates
const options = {
  cert: fs.readFileSync('server.crt'), // This line can be omitted if not needed
  rejectUnauthorized: false // Allow self-signed certificates
};

// Create an HTTPS agent with the options
const agent = new https.Agent(options);

// Create a WebSocket client and specify the agent
const ws = new WebSocket('wss://localhost:8080', {
  agent: agent,
  headers: {
    'Sec-WebSocket-Protocol': ['chat', 'superchat'].join(',')
  }
});

ws.on('open', () => {
  console.log('Connected to the server');
  ws.send('welcome :)');
});

ws.on('message', (event) => {
  console.log(`Received: ${event.data}`);
});

ws.on('close', () => {
  console.log('Disconnected from the server');
});

ws.on('error', (error) => {
  console.error('WebSocket error:', error);
});
