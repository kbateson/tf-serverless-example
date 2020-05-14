const uuid = require('uuid');

async function createDog (dynamo, s3, event, context) {
    const imageName = `dogs/images/${uuid.v4()}.png`;
    const body = JSON.parse(event.body);
    let dog = body.dog;
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
        body: JSON.stringify({
            uploadUrl: s3Response
        })
    }
}

module.exports.createDog = createDog;