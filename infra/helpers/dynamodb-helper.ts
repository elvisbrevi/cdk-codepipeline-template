"use-strict"
import * as cdk_dynamodb from 'aws-cdk-lib/aws-dynamodb';
import  * as sdk_dynamodb from '@aws-sdk/client-dynamodb';
import { ListTablesCommand } from '@aws-sdk/client-dynamodb';
import { Construct } from 'constructs';
import { RemovalPolicy } from 'aws-cdk-lib';

export class DynamoDbHelper  {

    public static CreateTable(construct: Construct, name: string) : cdk_dynamodb.Table {

        return new cdk_dynamodb.Table(construct, name, {
            partitionKey: { name: 'name', type: cdk_dynamodb.AttributeType.STRING },
            tableName: name,
            removalPolicy: RemovalPolicy.DESTROY
        });
    }

    public static async CheckIfDynamoDbExists(name: string ) {
        const client = new sdk_dynamodb.DynamoDBClient({});
        const command = new ListTablesCommand({});
        try {
            const results = await client.send(command);
            return results!.TableNames!.indexOf(name) > 0;
        } catch (err) {
            console.error(err);
            return false;
        }
    }
}