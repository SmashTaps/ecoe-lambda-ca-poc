import { aws_apigateway, aws_lambda } from "aws-cdk-lib";
import { Construct } from "constructs";
import { IAPI } from "../iapi";

export interface IAPIGatewayProps extends IAPI {
  getLambda: aws_lambda.Function;
}

export class UserApi extends Construct {
  public readonly userApi: aws_apigateway.RestApi;
  public readonly userApiResource: aws_apigateway.IResource;

  constructor(scope: Construct, id: string, props: IAPIGatewayProps) {
    super(scope, id);

    this.userApi = new aws_apigateway.RestApi(
      this,
      `${props.appName}-user-api`,
      {
        restApiName: `${props.appName}-user-api`,
        defaultCorsPreflightOptions: {
          allowOrigins: aws_apigateway.Cors.ALL_ORIGINS,
          allowMethods: aws_apigateway.Cors.ALL_METHODS,
        },
      }
    );

    this.userApiResource = this.userApi.root.addResource("user");

    this.userApiResource.addMethod(
      "GET",
      new aws_apigateway.LambdaIntegration(props.getLambda)
    );
  }
}
