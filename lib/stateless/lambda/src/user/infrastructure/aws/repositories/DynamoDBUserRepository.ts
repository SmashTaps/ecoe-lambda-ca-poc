import {
  DynamoDBClient,
  GetItemCommand,
  GetItemInput,
  PutItemCommand,
  PutItemCommandInput,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { IUser } from "../../../domain/entities/user";
import { IUserRepository } from "../../../domain/repositories/userRepository";

export class DynamoDBUserRepository implements IUserRepository {
  private dynamoDb: DynamoDBClient;

  constructor(private readonly tableName: string, dynamodb?: DynamoDBClient) {
    this.dynamoDb = dynamodb
      ? dynamodb
      : new DynamoDBClient({ region: "us-west-2" });
  }

  public async getUserById(id: string): Promise<IUser | undefined> {
    const params: GetItemInput = {
      TableName: this.tableName,
      Key: marshall({
        pk: `USER#${id}`,
        sk: `USER#${id}`,
      }),
    };

    try {
      const result = await this.dynamoDb.send(new GetItemCommand(params));

      if (!result.Item) {
        return undefined;
      }

      const { pk, sk, firstName, lastName } = unmarshall(result.Item);

      return {
        pk,
        sk,
        firstName,
        lastName,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async saveUser({
    pk,
    sk,
    firstName,
    lastName,
  }: IUser): Promise<IUser> {
    const params: PutItemCommandInput = {
      TableName: this.tableName,
      Item: marshall({
        pk,
        sk,
        firstName,
        lastName,
      }),
    };

    try {
      await this.dynamoDb.send(new PutItemCommand(params));
      return {
        pk,
        sk,
        firstName,
        lastName,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
