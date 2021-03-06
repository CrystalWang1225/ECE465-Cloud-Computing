'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.userReqList = (event, context, callback) => {
  console.log(event.headers);
  var params = {
      TableName: process.env.BLOOD_TABLE,
      FilterExpression: "#item_userID = :this_userID",
      ExpressionAttributeValues: {
        ":this_userID": event.pathParameters.id,
      },
      ExpressionAttributeNames: {
        "#item_userID": "requesterID",
      },
  };
  // fetch all todos from the database
  dynamoDb.scan(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS, POST, GET, PUT" },
        body: JSON.stringify({"message": "Couldn\'t fetch a request list"}),
      });
      return;
    }

    // create a response
    var itemsArray = [];
    for(var i = 0; i < result.Items.length; i++){
      itemsArray.push(result.Items[i]);
    }
    const response = {
      statusCode: 200,
      headers: { "Access-Control-Allow-Headers" : "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS, POST, GET, PUT" },
      body: JSON.stringify(itemsArray),
    };
    callback(null, response);
  });
};
