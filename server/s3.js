const AWS = require('aws-sdk');
require('dotenv').config();

// Configure AWS SDK
const s3 = new AWS.S3({
  region: 'us-east-1', // e.g., us-east-1
});

module.exports = s3;
