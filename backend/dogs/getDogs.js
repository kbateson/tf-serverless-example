async function getDogs(dynamo, event, context) {
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

module.exports.getDogs = getDogs;