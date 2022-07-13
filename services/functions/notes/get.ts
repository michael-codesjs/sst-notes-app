import { GetItemInput } from "aws-sdk/clients/dynamodb";
import handler from "functions/handler";
import dynamoDB from "utilitites/dynamo-db";


export const main = handler(async (event) => {

  // construct input.
  const input: GetItemInput = {
    TableName: process.env.TABLE_NAME!,
    // 'Key' defines the partition key and sort key of the item to be retrieved.
    Key: {
      userId: "123" as any, // The id of the author
      noteId: event?.pathParameters?.id as any, // The id of the note from the path.
    },
  };

  // get item and check for existence.
  const result = await dynamoDB.get(input);
  if (!result.Item) {
    throw new Error("Item not found.");
  }

  // Return the retrieved item
  return result.Item;

});