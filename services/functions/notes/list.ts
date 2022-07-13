import { QueryInput } from "aws-sdk/clients/dynamodb";
import handler from "functions/handler";
import dynamoDb from "utilitites/dynamo-db";


export const main = handler(async (event) => {

  const userId = event?.requestContext.authorizer?.iam.cognitoIdentity.identityId;

  const input:QueryInput = {
    TableName: process.env.TABLE_NAME!,
    // 'KeyConditionExpression' defines the condition for the query
    // - 'userId = :userId': only return items with matching 'userId'
    //   partition key
    KeyConditionExpression: "userId = :userId",
    // 'ExpressionAttributeValues' defines the value in the condition
    // - ':userId': defines 'userId' to be the id of the author
    ExpressionAttributeValues: {
      ":userId": userId,
    } as any,
  };

  const response = await dynamoDb.query(input);
  
  return response.Items;

});