#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { LambdaExamplesStack } from '../lib/lambda-stack';

const exampleEnv = { 
  account: process.env.CDK_DEFAULT_ACCOUNT, 
  region: process.env.CDK_DEFAULT_REGION 
}; 
const app = new cdk.App();

new LambdaExamplesStack(app, 'lambda-examples', { env: exampleEnv });

app.synth();