module.exports.getDogs = async function (event, context) {
    const AWS = require('aws-sdk');
    const dynamo = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
    let request = { 
        TableName: 'dogs'};
    if(event.queryStringParameters && event.queryStringParameters.breed){
        request.FilterExpression= "#breed = :val"; 
        request.ExpressionAttributeValues= {":val": event.queryStringParameters.breed};
        request.ExpressionAttributeNames= {
            '#breed': 'breed'
        };
    }
        
    const response = await dynamo.scan(request).promise();
    console.log(response);
    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                dogs: response.Items
            },
            null,
            2
        ),
    }
}

module.exports.getDogById = async function (event, context) {
    const AWS = require('aws-sdk');
    const dynamo = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
    const response = await dynamo.get({ TableName: 'dogs', Key: { dogId: event.pathParameters.dogId } }).promise();
    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                dog: response.Item
            },
            null,
            2
        ),
    }
}

module.exports.createDog = async function (event, context) {
    const AWS = require('aws-sdk');
    const dynamo = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
    const response = await dynamo.put({TableName: 'dogs', Item: JSON.parse(event.body).dog}).promise();
    console.log(response.response);
    return {
        statusCode: 201,
    }
}