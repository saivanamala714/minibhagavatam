// Test script for the Netlify function (ES Module version)
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);

// Import the handler using dynamic import
const modulePath = './netlify/functions/ask-gita.js';
const { handler } = await import(modulePath);

// Create a mock event object
const event = {
  httpMethod: 'POST',
  body: JSON.stringify({ question: 'What is the meaning of life according to the Bhagavad Gita?' })
};

// Call the handler
console.log('Calling handler with event:', JSON.stringify(event, null, 2));

try {
  const response = await handler(event, {});
  console.log('Response:', JSON.stringify(response, null, 2));
} catch (error) {
  console.error('Error:', error);
  if (error.response) {
    console.error('Response data:', await error.response.text());
  }
}
