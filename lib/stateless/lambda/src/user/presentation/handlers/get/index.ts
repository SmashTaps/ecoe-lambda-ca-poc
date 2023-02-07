import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import {
  DataSource,
  getUserController,
} from "../../controllers/userDataController";
import {
  DynamoDBClient,
  GetItemCommand,
  GetItemInput,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { IUser } from "../../../domain/entities/interfaces/user";

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

    const dataSource: DataSource = {
      getUser: async (id: string) => {
        const dynamoDb = new DynamoDBClient({ region: "us-west-2" });

        const params: GetItemInput = {
          TableName: tableName,
          Key: marshall({
            pk: `USER#${id}`,
            sk: `USER#${id}`,
          }),
        };

        const result = await dynamoDb.send(new GetItemCommand(params));

        if (!result.Item) {
          return undefined;
        }

        const data = unmarshall(result.Item);

        return {
          pk: data.pk,
          sk: data.sk,
        };
      },
    };

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
