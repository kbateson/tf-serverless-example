module.exports.getDogs = async function (event, context) {
    const AWS = require('aws-sdk');
    var dynamo = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
    var response = await dynamo.scan({ TableName: 'dogs' }).promise();
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
    var dynamo = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
    var response = await dynamo.get({ TableName: 'dogs', Key: { dogId: event.pathParameters.dogId } }).promise();
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