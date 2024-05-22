const https = require('https');
const fs = require('fs');
const path = require('path');

// Read SSL certificate files
const options = {
  cert: fs.readFileSync('server.crt'),
  key: fs.readFileSync('server.key'),
    rejectUnauthorized: false // Allow self-signed certificates
};

// Serve static files
const server = https.createServer(options, (req, res) => {
  const filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('File not found');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    }
  });
});

const port = 8443;
server.listen(port, () => {
  console.log(`HTTPS server is listening on port ${port}`);
});
