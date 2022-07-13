import { StackContext, Api, use } from "@serverless-stack/resources";
import Storage from "./storage";

export default function API({ stack }: StackContext) {
  
  // get table from storage stack and use it in our api.
  const { table } = use(Storage);

  const api = new Api(stack, "API", {
    defaults: {
      function: {
        permissions: [table],
        environment: {
          TABLE_NAME: table.tableName,
        },
      },
    },
    routes: {
      "GET /note/{id}": "functions/notes/get.main",
      "PUT /notes/{id}": "functions/notes/update.main",
      "DELETE /notes/{id}": "functions/notes/delete.main",
      "GET /notes": "functions/notes/list.main",
      "POST /note": "functions/notes/create.main",
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url
  });

}
