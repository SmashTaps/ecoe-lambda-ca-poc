import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { IUser } from "../../../../../../lib/stateless/lambda/src/user/domain/entities/user";
import { DynamoDBUserRepository } from "../../../../../../lib/stateless/lambda/src/user/infrastructure/aws/repositories/DynamoDBUserRepository";

describe("DynamoDBUserRepository", () => {
  let dynamoDb: DynamoDBClient;
  let userRepository: DynamoDBUserRepository;

  beforeEach(() => {
    dynamoDb = new DynamoDBClient({ region: "us-west-2" });
    userRepository = new DynamoDBUserRepository("test-table", dynamoDb);
  });
  const item = {
    Item: {
      pk: { S: "USER#1" },
      sk: { S: "USER#1" },
      firstName: { S: "Sameera" },
      lastName: { S: "Abeywickrama" },
    },
  };

  describe("getUserById", () => {
    it("returns the user when the id is provided", async () => {
      jest.spyOn(dynamoDb, "send").mockImplementation((command) => {
        return Promise.resolve(item);
      });

      const result = await userRepository.getUserById("1");
      expect(result).toEqual({
        pk: "USER#1",
        sk: "USER#1",
        firstName: "Sameera",
        lastName: "Abeywickrama",
      });
    });

    it("returns undefined when the id is not provided", async () => {
      jest.spyOn(dynamoDb, "send").mockImplementation((command) => {
        return Promise.resolve({});
      });

      const result = await userRepository.getUserById("1");
      expect(result).toBeUndefined();
    });

    it("throws if the dynamodb client rejects", async () => {
      jest.spyOn(dynamoDb, "send").mockImplementation((command) => {
        return Promise.reject(new Error("error"));
      });

      await expect(userRepository.getUserById("1")).rejects.toThrow("error");
    });
  });

  describe("saveUser", () => {
    const saveItem: IUser = {
      pk: `USER#1`,
      sk: `USER#1`,
      firstName: "Sameera",
      lastName: "Abeywickrama",
    };

    it("returns the user if the user is saved", async () => {
      jest.spyOn(dynamoDb, "send").mockImplementation((command) => {
        return Promise.resolve(item);
      });

      const result = await userRepository.saveUser(saveItem);

      expect(result).toEqual({
        pk: "USER#1",
        sk: "USER#1",
        firstName: "Sameera",
        lastName: "Abeywickrama",
      });
    });

    it("throws if the dynamodb client rejects", async () => {
      jest.spyOn(dynamoDb, "send").mockImplementation((command) => {
        return Promise.reject(new Error("error"));
      });

      await expect(userRepository.saveUser(saveItem)).rejects.toThrow("error");
    });
  });
});
