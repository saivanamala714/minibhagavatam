const handler = require('./netlify/functions/ask-gita').handler || require('./netlify/functions/ask-gita');

const testEvent = {
  httpMethod: 'POST',
  headers: {},
  body: JSON.stringify({ question: 'What is the meaning of life according to the Bhagavad Gita?' })
};

const testContext = {};

handler(testEvent, testContext)
  .then(result => {
    console.log('Function result:', JSON.stringify(result, null, 2));
  })
  .catch(error => {
    console.error('Error:', error);
  });
