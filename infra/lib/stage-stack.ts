import { StackProps, Stage } from "aws-cdk-lib";
import { Construct } from "constructs";
import { LambdaStack } from "./lambda-stack";

export class PipelineStage extends Stage {

    constructor(scope: Construct, stageName: string, props?: StackProps) {
        super(scope, stageName, props);
    
        const lambdaStack = new LambdaStack(this, 'lambda-stack', stageName);
    }
    
}