async function getDogById(dynamo, event, context) {
    const response = await dynamo.get({ TableName: 'dogs', Key: { dogId: event.pathParameters.dogId } }).promise();
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify(
            {
                dog: response.Item
            },
            null,
            2
        ),
    }
}

module.exports.getDogById = getDogById;