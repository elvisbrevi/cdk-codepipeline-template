"use-strict"
import { Construct } from 'constructs';
import { Stack, StackProps } from 'aws-cdk-lib';
import { LambdaHelper } from '../helpers/lambda-helper';
import { ApiGwHelper } from '../helpers/apigw-helper';
import { DynamoDbHelper } from '../helpers/dynamodb-helper';

export class LambdaExamplesStack extends Stack {
  
  constructor(scope: Construct, id: string, props?: StackProps) {
    
    super(scope, id, props);

    // dynamodb
    const table = DynamoDbHelper.CreateTable(this, 'user');

    // lambda from file
    const lambda = LambdaHelper.CreateFunctionFromFile(this, '../functions/example-1','lambda-hello-world', 'dev');

    // add write permission to lambda
    table.grantReadWriteData(lambda);

    // api gateway for lambda
    const restApi = ApiGwHelper.CreateRestApi(this, 'apigwt-hello-world');
    const resource = ApiGwHelper.AddResourceToRestApi(this, restApi, 'users');
    const integration = ApiGwHelper.AddLambdaIntegration(lambda);
    const method = ApiGwHelper.AddMethod("POST", resource, integration);
  }

}
