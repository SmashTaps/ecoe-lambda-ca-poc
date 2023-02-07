import { aws_dynamodb } from "aws-cdk-lib";

export interface ILambda {
  readonly appName: string;
  tableName: string;
}
