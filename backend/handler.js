const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
const s3 = new AWS.S3();

const getDogs = require('./dogs/getDogs').getDogs;
const getDogById = require('./dogs/getDogById').getDogById;
const createDog = require('./dogs/createDog').createDog;

module.exports.getDogs = async (event, context) => await getDogs(dynamo, event, context);

module.exports.getDogById = async (event, context) => await getDogById(dynmo, event, context);

module.exports.createDog = async (event, context) => await createDog(dynamo, s3, event, context);