import { aws_apigateway, aws_lambda } from "aws-cdk-lib";
import { Construct } from "constructs";
import { IAPI } from "./iapi";
import { UserApi } from "./userApi";

interface IAPIGatewayProps extends IAPI {
  getLambda: aws_lambda.Function;
}

export class APIGateway extends Construct {
  public readonly userApi: aws_apigateway.RestApi;

  constructor(scope: Construct, id: string, props: IAPIGatewayProps) {
    super(scope, id);

    this.userApi = new UserApi(this, `${props.appName}-user-api`, {
      appName: props.appName,
      getLambda: props.getLambda,
    }).userApi;
  }
}
