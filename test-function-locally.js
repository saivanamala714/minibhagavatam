// Test the Netlify function locally
const handler = require('./netlify/functions/ask-gita').handler;

const testEvent = {
  httpMethod: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ question: 'What is the meaning of life according to the Bhagavad Gita?' })
};

const testContext = {};

handler(testEvent, testContext)
  .then(result => {
    console.log('Function response:', JSON.stringify(result, null, 2));
  })
  .catch(error => {
    console.error('Error:', error);
  });
