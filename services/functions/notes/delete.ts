import { DeleteItemInput } from "aws-sdk/clients/dynamodb";
import handler from "functions/handler";
import dynamoDb from "utilitites/dynamo-db";

export const main = handler(async (event) => {
  const noteId = event?.pathParameters?.id;
  const params:DeleteItemInput = {
    TableName: process.env.TABLE_NAME!,
    // 'Key' defines the partition key and sort key of the item to be removed
    Key: {
      userId: "123" as any, // The id of the author
      noteId: noteId as any, // The id of the note from the path
    },
  };

  await dynamoDb.delete(params);

  return { status: true };
});