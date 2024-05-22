const https = require('https');
const fs = require('fs');
const WebSocket = require('ws');

// Read SSL certificate files
const server = https.createServer({
  cert: fs.readFileSync('server.crt'),
  key: fs.readFileSync('server.key')
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  
  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    ws.send(`You sent: ${message}`);
  });
  
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

server.listen(8080, () => {
  console.log('Server is listening on port 8080');
});
