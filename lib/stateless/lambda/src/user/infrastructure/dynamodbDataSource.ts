import {
  DynamoDBClient,
  GetItemCommand,
  GetItemInput,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { IUser } from "../domain/entities/interfaces/user";
import { IDataSource } from "./interfaces/dataSource";

export class DynamoDBDataSource implements IDataSource {
  private dynamoDb: DynamoDBClient;
  private tableName: string;

  constructor(tableName: string) {
    this.dynamoDb = new DynamoDBClient({ region: "us-west-2" });
    this.tableName = tableName;
  }

  public async getUser(id: string): Promise<IUser | undefined> {
    const params: GetItemInput = {
      TableName: this.tableName,
      Key: marshall({
        pk: `USER#${id}`,
        sk: `USER#${id}`,
      }),
    };

    const result = await this.dynamoDb.send(new GetItemCommand(params));

    if (!result.Item) {
      return undefined;
    }

    const data = unmarshall(result.Item);

    return {
      pk: data.pk,
      sk: data.sk,
    };
  }
}
