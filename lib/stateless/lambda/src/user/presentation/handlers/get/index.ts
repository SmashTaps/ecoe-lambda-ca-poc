import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBUserRepository } from "../../../infrastructure/aws/repositories/DynamoDBUserRepository";
import { GetUserByIdUseCase } from "../../../domain/useCases/getUserUseCase";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

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

  try {
    const userRepository = new DynamoDBUserRepository(process.env.tableName);
    const getUserUseCase = new GetUserByIdUseCase(userRepository);
    const user = await getUserUseCase.execute(event.queryStringParameters.id);

    if (!user) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "User not found",
        }),
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify({
        user,
      }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Server Error",
        debug: event,
      }),
    };
  }
}
