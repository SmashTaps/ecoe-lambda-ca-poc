import { IUser } from "../../domain/entities";
import { IUserRepository } from "../../domain/repositories";
import {
  PutItemCommand,
  DynamoDBClient,
  PutItemInput,
} from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";

const client = new DynamoDBClient({ region: "us-west-2" });

export class DynamoDbClient implements IUserRepository {
  async save(user: IUser, tableName: string): Promise<void> {
    const params: PutItemInput = {
      TableName: tableName,
      Item: marshall(user),
    };

    try {
      const data = await client.send(new PutItemCommand(params));
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  }
}
