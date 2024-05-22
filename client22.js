const WebSocket = require('ws');
const fs = require('fs');
const ws = new WebSocket('wss://localhost:8080', ['chat', 'superchat']);
/*
ws.onopen = () => {
  console.log('Connected to the server');
};

ws.onmessage = (event) => {
  console.log(`Received: ${event.data}`);
};

ws.onclose = () => {
  console.log('Disconnected from the server');
};

ws.onerror = (error) => {
  console.error('WebSocket error:', error);
};
*/
ws.on('open', () => {
  console.log('Connected to the server');
  ws.send('welcmeeee :)');
});

ws.on('message', (message) => {
  console.log(`Received: ${message}`);
});

ws.on('close', () => {
  console.log('Disconnected from the server');
});

ws.on('error', (error) => {
  console.error('WebSocket error:', error);
});