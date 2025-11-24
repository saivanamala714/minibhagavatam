// Simple HTTP server to test Netlify function locally (CommonJS version)
const http = require('http');
const { handler } = require('./netlify/functions/ask-gita.js');

const PORT = 8888;

const server = http.createServer(async (req, res) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end();
    return;
  }

  // Only handle POST requests
  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Method Not Allowed' }));
    return;
  }

  try {
    // Read the request body
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      try {
        // Parse the JSON body
        const { question } = JSON.parse(body);
        
        if (!question) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Question is required' }));
          return;
        }

        // Call the Netlify function handler
        const result = await handler({
          httpMethod: 'POST',
          body: JSON.stringify({ question })
        }, {});

        // Send the response
        res.writeHead(result.statusCode || 200, result.headers);
        res.end(result.body);
      } catch (error) {
        console.error('Error processing request:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error processing request' }));
      }
    });
  } catch (error) {
    console.error('Server error:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Internal Server Error' }));
  }
});

server.listen(PORT, () => {
  console.log(`Test server running at http://localhost:${PORT}`);
  console.log(`Test with: curl -X POST http://localhost:${PORT} -H "Content-Type: application/json" -d '{"question":"What is the meaning of life?"}'`);
});
