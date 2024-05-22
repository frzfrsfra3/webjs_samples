const WebSocket = require('ws');
const fs = require('fs');

// Read SSL certificate file (optional, for self-signed certificates)
const options = {
  cert: fs.readFileSync('server.crt')
};

// Connect to the WebSocket server
const ws = new WebSocket('wss://localhost:8080', options);

ws.on('open', () => {
  console.log('Connected to the server');
  ws.send('Hello Server');
});

ws.on('message', (message) => {
  console.log(`Received: ${message}`);
});

ws.on('close', () => {
  console.log('Disconnected from the server');
});
