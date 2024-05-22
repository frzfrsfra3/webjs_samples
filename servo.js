const fs = require('fs');
const https = require('https');
const express = require('express');

const options = {
  cert: fs.readFileSync('server.crt'),
  key: fs.readFileSync('server.key')
};

const app = express();
app.use(express.static(__dirname)); // Serve the current directory

const server = https.createServer(options, app);

server.listen(8080, '127.0.0.1', () => {
  console.log('Serving HTML client on https://localhost:8081');
});
