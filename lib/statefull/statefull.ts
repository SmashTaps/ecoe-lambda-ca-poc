import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { Table } from "./dynamodb/table";

interface IStatefullProps extends cdk.StackProps {
  readonly appName: string;
}

export class Statefull extends cdk.Stack {
  public readonly table: cdk.aws_dynamodb.ITable;

  constructor(scope: Construct, id: string, props?: IStatefullProps) {
    super(scope, id, props);

    if (props?.appName === undefined) {
      throw new Error("appName is required");
    }

    this.table = new Table(this, `${props.appName}-single-table`, {
      appName: props.appName,
    }).table;
  }
}
