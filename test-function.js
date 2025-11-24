// Test script for the Netlify function
import { handler } from './netlify/functions/ask-gita.js';

// Create a mock event object
const event = {
  httpMethod: 'POST',
  body: JSON.stringify({ question: 'What is the meaning of life?' })
};

// Call the handler
handler(event, {})
  .then(response => {
    console.log('Response:', response);
  })
  .catch(error => {
    console.error('Error:', error);
  });
