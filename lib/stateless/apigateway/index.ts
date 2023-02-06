import { aws_apigateway } from "aws-cdk-lib";
import { Construct } from "constructs";
import { UserApi } from "./userApi";

interface IAPIGatewayProps {
  readonly appName: string;
}

class APIGateway extends Construct {
  public readonly userApi: aws_apigateway.RestApi;

  constructor(scope: Construct, id: string, props: IAPIGatewayProps) {
    super(scope, id);

    this.userApi = new UserApi(this, `${props.appName}-user-api`, {
      appName: props.appName,
    }).userApi;
  }
}
