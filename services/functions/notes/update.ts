import { UpdateItemInput } from "aws-sdk/clients/dynamodb";
import handler from "functions/handler";
import dynamoDb from "utilitites/dynamo-db";


export const main = handler(async (event) => {

  const data = JSON.parse(event?.body!);

  // construct the input.
  const input:UpdateItemInput = {
    TableName: process.env.TABLE_NAME!,
    // 'Key' defines the partition key and sort key of the item to be updated
    Key: {
      userId: "123" as any, // The id of the author
      noteId: event?.pathParameters?.id as any, // The id of the note from the path
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET content = :content, attachment = :attachment",
    ExpressionAttributeValues: {
      ":attachment": data.attachment,
      ":content": data.content,
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settings
    ReturnValues: "ALL_NEW",
  };

  // finally, edit the note.
  await dynamoDb.update(input);

  return { status: true };

})