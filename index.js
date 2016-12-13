var AWS = require('aws-sdk');

exports.handler = function(event, context, callback) {
    var docClient = new AWS.DynamoDB.DocumentClient();
    
    if (event.gameID == null) {
        callback(new Error('No Game ID'));
    }
    if (event.events == null) {
        callback(new Error('No Events'));
    }
    console.log(event.gameID.toString());
    console.log(event.events);
    var params = {
        TableName : "Game",
        Key : { 
          "gameID" : event.gameID.toString(),
        },
        UpdateExpression: "set events = :a",
        ExpressionAttributeValues:{
            ":a" : event.events
        },
        ReturnValues: "UPDATED_NEW"
    };
    docClient.update(params, function(err, data) {
        if (err) {
            callback(new Error('DynamoDB Error'));
        }
        else {
            callback(null, 'Success');
        }
    });
};

