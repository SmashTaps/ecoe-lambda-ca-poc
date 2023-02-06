import { aws_dynamodb, aws_lambda, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { APIGateway } from "./apigateway";
import { LambdaFns } from "./lambda";

export interface ICAPOCStatelessStackProps extends StackProps {
  appName: string;
  table: aws_dynamodb.Table;
}

export class CAPOCStatelessStack extends Stack {
  constructor(scope: Construct, id: string, props: ICAPOCStatelessStackProps) {
    super(scope, id, props);

    const lambdaConstruct = new LambdaFns(this, `${props.appName}-lambda-fns`, {
      appName: props.appName,
      table: props.table,
    });

    new APIGateway(this, `${props.appName}-api-gateway`, {
      appName: props.appName,
      getLambda: lambdaConstruct.getLambda,
    });
  }
}
