module.exports.getDogs = async function (event, context) {
    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                dogs: [{
                    dogId: 1,
                    name: 'Lucy',
                    breed: 'dachshund'
                }, {
                    dogId: 2,
                    name: 'Foxy',
                    breed: 'chihuahua'
                }]
            },
            null,
            2
        ),
    }
}