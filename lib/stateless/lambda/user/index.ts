import { aws_lambda } from "aws-cdk-lib";
import { Construct } from "constructs";
import { ILambda } from "../ilambda";
import * as path from "path";

export interface IGetUserDataLambdaProps extends ILambda {}

export class GetUserDataLambda extends Construct {
  public readonly lambda: aws_lambda.Function;

  constructor(scope: Construct, id: string, props: IGetUserDataLambdaProps) {
    super(scope, id);

    this.lambda = new aws_lambda.Function(
      this,
      `${props.appName}-get-user-data-lambda`,
      {
        runtime: aws_lambda.Runtime.NODEJS_18_X,
        code: aws_lambda.Code.fromAsset(
          path.join(__dirname, "../src/user/presentation/handlers/get"),
          {
            exclude: ["*.ts", "*.js.map"],
          }
        ),
        handler: "index.handler",
        environment: {
          tableName: props.tableName,
        },
      }
    );
  }
}
