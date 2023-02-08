import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { getUserController } from "../../controllers/userDataController";
import { IUser } from "../../../domain/entities/interfaces/user";
import { DynamoDBDataSource } from "../../../infrastructure/dynamodbDataSource";
import { IDataSource } from "../../../infrastructure/interfaces/dataSource";

export const handler = async function (
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

  const id = event.queryStringParameters.id;

  try {
    if (!process.env.tableName) {
      console.error("Table name is not defined");
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: "Internal server error",
        }),
      };
    }

    const tableName = process.env.tableName;

    const dataSource: IDataSource = new DynamoDBDataSource(tableName);

    const user: IUser = await getUserController(id, dataSource);

    return {
      statusCode: 200,
      body: user ? JSON.stringify(user) : "No user found",
    };
  } catch (err: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: err.message,
        data: id,
      }),
    };
  }
};
