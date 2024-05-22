<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>WebSocket Monitor</title>
  <style>
    body { font-family: Arial, sans-serif; }
    #log { max-height: 500px; overflow-y: auto; border: 1px solid #ccc; padding: 10px; }
    p { margin: 5px 0; }
  </style>
</head>
<body>
  <h1>WebSocket Monitor</h1>
  <div id="log"></div>

  <script>
    const logDiv = document.getElementById('log');

    function logMessage(message) {
      const p = document.createElement('p');
      p.textContent = message;
      logDiv.appendChild(p);
    }

    // Connect to the WebSocket server
    const ws = new WebSocket('wss://localhost:8080', ['chat', 'superchat']);

    ws.onopen = () => {
      logMessage('Connected to the server');
    };

    ws.onmessage = (event) => {
      logMessage(`Received: ${event.data}`);
    };

    ws.onclose = () => {
      logMessage('Disconnected from the server');
    };

    ws.onerror = (error) => {
      logMessage(`WebSocket error: ${error.message}`);
    };
  </script>
</body>
</html>
