const uuid = require('uuid');

async function createDog(dynamo, s3, event, context) {
    const dogId = uuid.v4()
    const imageName = `dogs/images/${dogId}.png`;
    const body = JSON.parse(event.body);
    let dog = body.dog;
    dog.dogId = dogId;
    dog.imagePath = imageName;
    const dynamoResponse = await dynamo.put({ TableName: 'dogs', Item: dog }).promise();
    const s3Response = await s3.getSignedUrlPromise('putObject', {
        Bucket: 'dogbook-files',
        Key: imageName,
        Expires: 120
    });
    console.log(dynamoResponse.response);
    return {
        statusCode: 201,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({
            uploadUrl: s3Response
        })
    }
}

module.exports.createDog = createDog;