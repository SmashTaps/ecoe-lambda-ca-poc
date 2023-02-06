import { aws_dynamodb, RemovalPolicy } from "aws-cdk-lib";
import { Construct } from "constructs";

export interface IStatefullTable {
  readonly appName: string;
}

export class Table extends Construct {
  public readonly table: aws_dynamodb.Table;

  constructor(scope: Construct, id: string, props: IStatefullTable) {
    super(scope, id);

    this.table = new aws_dynamodb.Table(this, `${props.appName}-table`, {
      sortKey: {
        name: "user#id",
        type: aws_dynamodb.AttributeType.STRING,
      },
      partitionKey: {
        name: "user#id",
        type: aws_dynamodb.AttributeType.STRING,
      },
      billingMode: aws_dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.RETAIN,
    });
  }
}
