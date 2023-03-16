#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { LambdaExamplesStack } from '../lib/infra-stack';

const exampleEnv = { 
  account: process.env.CDK_DEFAULT_ACCOUNT, 
  region: process.env.CDK_DEFAULT_REGION 
}; 
const app = new cdk.App();

new LambdaExamplesStack(app, 'cicd-codepipeline-examples', { env: exampleEnv });

app.synth();