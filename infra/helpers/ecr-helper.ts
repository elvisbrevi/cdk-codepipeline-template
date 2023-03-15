"use-strict"
import * as ecr from 'aws-cdk-lib/aws-ecr';
import { Construct } from 'constructs';
import { exec } from 'child_process'
import  * as sdk_dynamodb from '@aws-sdk/client-dynamodb';
import { ECRClient, DescribeRepositoriesCommand} from '@aws-sdk/client-ecr';
import { RemovalPolicy } from 'aws-cdk-lib';
export class EcrHelper {
     
    public static CreateEcrRepository(construct: Construct, name: string) : ecr.Repository {
        return new ecr.Repository(construct, name, {
            repositoryName: name
        });
    }

    public static BuildTagPushDockerfileToEcr(ecrName: string, ) {
        let commandCd = `cd ../examples/1-lambdas/from-ecr`;
        let commandLogin = `aws ecr get-login-password --region ${process.env.CDK_DEFAULT_REGION} | docker login --username AWS --password-stdin ${process.env.CDK_DEFAULT_ACCOUNT}.dkr.ecr.${process.env.CDK_DEFAULT_REGION}.amazonaws.com`;
        let commandBuild = `docker build -t ${ecrName} .`;
        let commandTag = `docker tag ${ecrName}:latest ${process.env.CDK_DEFAULT_ACCOUNT}.dkr.ecr.${process.env.CDK_DEFAULT_REGION}.amazonaws.com/${ecrName}:latest`;
        let commandPush = `docker push ${process.env.CDK_DEFAULT_ACCOUNT}.dkr.ecr.${process.env.CDK_DEFAULT_REGION}.amazonaws.com/${ecrName}:latest`;

        exec(`${commandCd} && ${commandLogin} && ${commandBuild} && ${commandTag} && ${commandPush}
            `, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`Output: ${stdout}`);
        });
    }

    public static async checkIfEcrRespositoryExists(name: string) : Promise<boolean> {
        const ecrClient = new ECRClient({});

        const command = new DescribeRepositoriesCommand({});
        try {
            const results = await ecrClient.send(command);
            results!.repositories!.forEach(function (repo) {
                return repo.repositoryName == name;
            }); 
            return false;
        } catch (err) {
            console.error(err);
            return false;
        }
    }
}