const fs = require('fs');
const https = require('https');
const WebSocket = require('ws');

// Read SSL certificate and private key files
const serverOptions = {
  cert: fs.readFileSync('server.crt'),
  key: fs.readFileSync('server.key')
};

// Define supported subprotocols
const supportedSubprotocols = ['chat', 'superchat'];

// Create an HTTPS server
const server = https.createServer(serverOptions);

// Create a WebSocket server on the HTTPS server
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws, req) => {
  // Access the subprotocols requested by the client
  const requestedSubprotocols = req.headers['sec-websocket-protocol'];

  // Select a subprotocol supported by both client and server
  const selectedSubprotocol = supportedSubprotocols.find(subprotocol =>
    requestedSubprotocols.includes(subprotocol)
  );

  // If no common subprotocol found, terminate the connection
  if (!selectedSubprotocol) {
    console.log('No common subprotocol found. Closing connection.');
    ws.close(1002, 'No common subprotocol');
    return;
  }

  // Inform the client about the selected subprotocol
  ws.send(`Selected subprotocol: ${selectedSubprotocol}`);

  // Handle messages, etc.
  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
  });

  ws.on('close', () => {
    console.log('Disconnected from the client');
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

// Start the HTTPS server
const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server is running on https://localhost:${PORT}`);
});
