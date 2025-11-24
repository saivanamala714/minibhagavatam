// Test script for the Netlify function (CommonJS version)
const { handler } = require('./netlify/functions/ask-gita.js');

// Create a mock event object
const event = {
  httpMethod: 'POST',
  body: JSON.stringify({ question: 'What is the meaning of life?' })
};

// Call the handler
handler(event, {})
  .then(response => {
    console.log('Response:', JSON.stringify(response, null, 2));
  })
  .catch(error => {
    console.error('Error:', error);
  });
