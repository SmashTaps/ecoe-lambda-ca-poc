import {
  APIGatewayEventRequestContext,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda";
import {
  DataSource,
  getUserController,
} from "../../controllers/userDataController";
import { DynamoDB } from "aws-sdk";
import { IUser } from "../../../domain/entities/interfaces/user";

export const handler = async function (
  event: APIGatewayProxyEvent,
  context: APIGatewayEventRequestContext
): Promise<APIGatewayProxyResult> {
  if (!event.pathParameters || !event.pathParameters.id) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Bad Request",
      }),
    };
  }

  const id = event.pathParameters.id;

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

    const dataSource: DataSource = {
      getUser: async (id: string) => {
        const dynamoDb = new DynamoDB.DocumentClient();
        const params = {
          TableName: tableName,
          Key: { id },
        };

        const result = await dynamoDb.get(params).promise();

        if (!result.Item) {
          return undefined;
        }

        return {
          pk: result.Item.pk,
          sk: result.Item.sk,
        };
      },
    };

    const user: IUser = await getUserController(id, dataSource);

    return {
      statusCode: 200,
      body: JSON.stringify(user),
    };
  } catch (err: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: err.message,
      }),
    };
  }
};
