
import { PutItemInput } from "aws-sdk/clients/dynamodb";
import dynamoDB from "utilitites/dynamo-db";
import handler from "functions/handler";
import * as uuid from "uuid";

export const main = handler(async (event) => {
  
  const userId = event?.requestContext.authorizer?.iam.cognitoIdentity.identityId;
  const body = JSON.parse(event?.body!);

  const input: PutItemInput = {
    TableName: process.env.TABLE_NAME!,
    Item: {
      // The attributes of the item to be created
      // inferring as any for now :)
      userId: userId, // The id of the author
      noteId: uuid.v1() as any, // A unique uuid
      content: body.content, // Parsed from request body
      attachment: body.attachment, // Parsed from request body
      createdAt:  Date.now() as any, // Current Unix timestamp
    }
  };
  await dynamoDB.put(input);
  return input.Item;
});