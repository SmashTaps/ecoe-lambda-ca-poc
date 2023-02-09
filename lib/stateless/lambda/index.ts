import { Construct } from "constructs";
import { aws_lambda } from "aws-cdk-lib";
import { GetUserDataLambda, SaveUserLambda } from "./user";

interface ILambdaFns {
  appName: string;
  tableName: string;
}

export class LambdaFns extends Construct {
  public readonly getLambda: aws_lambda.Function;
  public readonly saveLambda: aws_lambda.Function;

  constructor(scope: Construct, id: string, props: ILambdaFns) {
    super(scope, id);

    this.getLambda = new GetUserDataLambda(
      this,
      `${props.appName}-lambda-construct`,
      {
        appName: props.appName,
        tableName: props.tableName,
      }
    ).lambda;

    this.saveLambda = new SaveUserLambda(
      this,
      `${props.appName}-lambda-save-construct`,
      {
        appName: props.appName,
        tableName: props.tableName,
      }
    ).lambda;
  }
}
