
import { StackContext, Table, Bucket } from "@serverless-stack/resources";

export default function Storage({ stack }:StackContext) {

  // database table
  const table = new Table(stack, "Notes", {
    fields: {
      userId: "string",
      noteId: "string",
    },
    primaryIndex: { partitionKey: "userId", sortKey: "noteId" }
  });

  // s3 bucket for all uploads
  const bucket = new Bucket(stack, "Uploads");

  return { table, bucket };
}