import { Table } from "../lib/statefull/dynamodb/table";
import * as cdk from "aws-cdk-lib";

test("creates a DynamoDB table with the expected properties", () => {
  // Arrange
  const appName = "test-app";
  const stack = new cdk.Stack();
  const table = new Table(stack, "TestTable", { appName });

  // Act
  const actualTable = table.table;

  // Assert
  expect(actualTable).toMatchSnapshot();
});
