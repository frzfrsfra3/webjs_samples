const fs = require('fs');
const https = require('https');
const WebSocket = require('ws');

// Read SSL certificate and private key files
const options = {
  cert: fs.readFileSync('server.crt'),
  key: fs.readFileSync('server.key')
};

// Create an HTTPS server
const server = https.createServer(options);

// Create a WebSocket server on the HTTPS server
const wss = new WebSocket.Server({ server });

// Define supported subprotocols
const supportedSubprotocols = ['chat', 'superchat'];
const userConnections = new Map();
// WebSocket server event listeners
wss.on('connection', (ws, req) => {
  // Access the subprotocols requested by the client
  const requestedSubprotocols = req.headers['sec-websocket-protocol'];
  const selectedSubprotocol = supportedSubprotocols.find(subprotocol =>
    requestedSubprotocols && requestedSubprotocols.includes(subprotocol)
  );

  if (selectedSubprotocol) {
    console.log(`Selected subprotocol: ${selectedSubprotocol}`);
    ws.send(`Server selected subprotocol: ${selectedSubprotocol}`);
  } else {
    console.log('No matching subprotocols found.');
    ws.close(1002, 'No matching subprotocol');
    return;
  }
	const userId = getUserId(req);
  // Store WebSocket connection for the user
  if (!userConnections.has(userId)) {
    userConnections.set(userId, new Set());
  }
  userConnections.get(userId).add(ws);

  // Store WebSocket connection for the user
  if (!userConnections.has(userId)) {
    userConnections.set(userId, new Set());
  }
  userConnections.get(userId).add(ws);
  
  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    ws.send(`Server received: ${message}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
	 userConnections.get(userId).delete(ws);
    if (userConnections.get(userId).size === 0) {
      userConnections.delete(userId);
    }
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

// Start the HTTPS server
const PORT = 8080;
server.listen(PORT, '127.0.0.1', () => {
  console.log(`Server is running on https://localhost:${PORT}`);
});
function getUserId(req) {
  // Implement logic to extract user ID from the request, e.g., URL or authorization header
  // Example: const userId = req.url.split('/').pop();
  return 'user123'; // Dummy user ID for demonstration
}

// Function to send a message to a user's WebSocket connections
function sendMessageToUser(userId, message) {
  if (userConnections.has(userId)) {
    userConnections.get(userId).forEach(ws => {
      ws.send(message);
    });
  }
}