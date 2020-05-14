async function getDogById(dynamo, event, context) {
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

module.exports.getDogById = getDogById;