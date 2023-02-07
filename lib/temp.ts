// domain/entities/Data.ts
export interface Data {
  id: string;
  property1: string;
}

export class DataEntity implements Data {
  id: string;
  property1: string;

  constructor(id: string, property1: string) {
    this.id = id;
    this.property1 = property1;
  }
}

// domain/repositories/DataRepository.ts
import { Data } from "../entities/Data";

export interface DataRepository<T> {
  getData: (id: string) => Promise<T | undefined>;
}

// usecases/GetData.ts
import { DataRepository } from "../domain/repositories/DataRepository";

export const getData = async <T>(id: string, repository: DataRepository<T>) => {
  return repository.getData(id);
};

// presentation/controllers/DataController.ts
import { getData } from "../../usecases/GetData";
import { DataRepository } from "../../domain/repositories/DataRepository";

interface DataSource {
  getData: (id: string) => Promise<Data | undefined>;
}

const getDataController = async <T>(id: string, dataSource: DataSource) => {
  try {
    const data = await getData(id, {
      getData: (id) => dataSource.getData(id),
    });
    if (!data) {
      throw new Error(`Data with id '${id}' not found`);
    }
    return data;
  } catch (error) {
    return error.message;
  }
};

export const handler = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
): Promise<APIGatewayProxyResult> => {
  try {
    const id = event.pathParameters.id;
    const dataSource: DataSource = {
      getData: async (id: string) => {
        const dynamoDb = new DynamoDB.DocumentClient();
        const params = {
          TableName: "YourTableName",
          Key: { id },
        };

        const result = await dynamoDb.get(params).promise();
        return result.Item as Data;
      },
    };
    const data = await getDataController(id, dataSource);
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: error.message,
    };
  }
};
