import { Construct } from "constructs";
import { aws_lambda, aws_dynamodb } from "aws-cdk-lib";
import { GetUserDataLambda } from "./user";

interface ILambdaFns {
  appName: string;
  table: aws_dynamodb.Table;
}

export class LambdaFns extends Construct {
  public readonly getLambda: aws_lambda.Function;

  constructor(scope: Construct, id: string, props: ILambdaFns) {
    super(scope, id);

    this.getLambda = new GetUserDataLambda(
      this,
      `${props.appName}-lambda-construct`,
      {
        appName: props.appName,
        table: props.table,
      }
    ).lambda;
  }
}
