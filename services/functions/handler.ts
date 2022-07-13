import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";

export default function handler(lambda: (event?: APIGatewayEvent, context?: Context) => any) {
  return async function (event?: APIGatewayEvent, context?: Context) {
    let body, statusCode;
    try {
      body = await lambda(event, context);
      statusCode = 200;
    } catch (error) {
      console.error(error);
      body = { error: error };
      statusCode = 500;
    }

    // Return HTTP response
    return {
      statusCode,
      body: JSON.stringify(body),
    };
  };
}