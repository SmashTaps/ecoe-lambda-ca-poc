import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { IUser } from "../../../domain/entities/user";
import { SaveUserUseCase } from "../../../domain/useCases/saveUserUseCase";
import { DynamoDBUserRepository } from "../../../infrastructure/aws/repositories/DynamoDBUserRepository";

export async function handler(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  const data = JSON.parse(event.body || "{}");

  if (process.env.tableName === undefined) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        debug: event,
      }),
    };
  }

  if (Object.keys(data).length === 0) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Bad Request",
        debug: event,
      }),
    };
  }

  try {
    const user: IUser = {
      pk: `USER#${data.id}`,
      sk: `USER#${data.id}`,
      firstName: data.firstName,
      lastName: data.lastName,
    };

    const userRespository = new DynamoDBUserRepository(process.env.tableName);
    const saveUserUseCase = new SaveUserUseCase(userRespository);
    const savedData = await saveUserUseCase.execute(user);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "User saved",
        user: savedData,
      }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Server Error",
        debug: event,
        error,
      }),
    };
  }
}
