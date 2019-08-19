const AWS = require('aws-sdk');
const config = require('config');

const awsAccessKey = process.env.AWS_ACCESSKEY || config.get('AWS-AccessKey');
const awsSecretKey = process.env.AWS_SECRETKEY || config.get('AWS-SecretKey');
const awsCredentials = new AWS.Credentials(awsAccessKey, awsSecretKey);
const bucketName = 'jwitterapp';
const region = 'us-east-2';
const endpoint = `https://${bucketName}.s3.${region}.amazonaws.com/`;
AWS.config.s3 = {
  credentials: awsCredentials,
  region
};

module.exports = {
  AWS,
  bucketName,
  endpoint
};
