const fs = require('fs');
const https = require('https');
const WebSocket = require('ws');

// Options to allow self-signed certificates
const options = {
  cert: fs.readFileSync('server.crt'),
  rejectUnauthorized: false // Allow self-signed certificates
};

// Create an HTTPS agent with the options
const agent = new https.Agent(options);

// Create a WebSocket client and specify the agent and subprotocols
const ws = new WebSocket('wss://127.0.0.1:8080', ['chat', 'superchat'], {
  agent: agent
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
