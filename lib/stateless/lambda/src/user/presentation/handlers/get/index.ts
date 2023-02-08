import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { UserRepository } from "../../../infrastructure/aws/repositories/getUserRepository";
import { GetUserByIdUseCase } from "../../../domain/useCases/getUserUseCase";

export async function handler(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  if (!event.queryStringParameters || !event.queryStringParameters.id) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Bad Request",
        debug: event,
      }),
    };
  }

  if (!process.env.tableName) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Table name missing",
        debug: event,
      }),
    };
  }

  const getUserUseCase = new GetUserByIdUseCase(
    new UserRepository(process.env.tableName)
  );

  const user = await getUserUseCase.execute(event.queryStringParameters.id);

  if (!user) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "User not found",
        debug: event,
      }),
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify({
      user,
    }),
  };
}

// import {
//   DynamoDBClient,
//   GetItemCommand,
//   GetItemCommandOutput,
//   GetItemInput,
// } from "@aws-sdk/client-dynamodb";
// import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
// import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

// export const handler = async function (
//   event: APIGatewayProxyEvent
// ): Promise<APIGatewayProxyResult> {
//   if (!event.queryStringParameters || !event.queryStringParameters.id) {
//     return {
//       statusCode: 400,
//       body: JSON.stringify({
//         message: "Bad Request",
//         debug: event,
//       }),
//     };
//   }

//   const id = event.queryStringParameters.id;

//   try {
//     if (!process.env.tableName) {
//       console.error("Table name is not defined");
//       return {
//         statusCode: 500,
//         body: JSON.stringify({
//           message: "Internal server error",
//         }),
//       };
//     }

//     const tableName = process.env.tableName;

//     const dynamoDb = new DynamoDBClient({ region: "us-west-2" });

//     const params: GetItemInput = {
//       TableName: tableName,
//       Key: marshall({
//         pk: `USER#${id}`,
//         sk: `USER#${id}`,
//       }),
//     };

//     const result: GetItemCommandOutput = await dynamoDb.send(
//       new GetItemCommand(params)
//     );

//     if (!result.Item) {
//       return {
//         statusCode: 200,
//         body: "No user found",
//       };
//     }

//     const data = unmarshall(result.Item);

//     return {
//       statusCode: 200,
//       body: JSON.stringify(data),
//     };
//   } catch (err: any) {
//     return {
//       statusCode: 500,
//       body: JSON.stringify({
//         message: err.message,
//         data: id,
//       }),
//     };
//   }
// };
