const axios = require('axios');

const sendPostRequest = async () => {
  try {
    const response = await axios.post('http://localhost:8080/report/result', {
      documentId: '12345',
      outcome: 'reviewed',
    });
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : 'Unknown Error');
  }
};

sendPostRequest(); // Add this line to call the function

module.exports = { sendPostRequest };
