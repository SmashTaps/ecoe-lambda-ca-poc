import { aws_apigateway } from "aws-cdk-lib";
import { Construct } from "constructs";
import { IAPI } from "../iapi";

export interface IAPIGatewayProps extends IAPI {}

export class UserApi extends Construct {
  public readonly userApi: aws_apigateway.RestApi;

  constructor(scope: Construct, id: string, props: IAPIGatewayProps) {
    super(scope, id);

    this.userApi = new aws_apigateway.RestApi(
      this,
      `${props.appName}-user-api`,
      {
        restApiName: `${props.appName}-user-api`,
      }
    );
  }
}
