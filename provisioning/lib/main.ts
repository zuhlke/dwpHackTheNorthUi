#!/usr/bin/env node
import {App, Tag} from "@aws-cdk/core";
import {HostingBucketStack} from "./hosting-bucket-stack";
import {LambdaAndApiGatewayStack, LambdaStackProps} from "./lambda-and-api-gateway-stack";

const hostingBucketName = 'z10020-dwp-hack-the-north';
const frontendSourcePath = '../dwp-hack-the-north-ui/build';

const lambdas: LambdaStackProps[] = [
    {
        functionName: 'getQuestions',
        resourceName: 'questions',
        srcDir: '../../lambda/questionnaire',
        handler: 'main',
        uri: '',
        dbName: '',
        collection: ''
    },
    {
        functionName: 'getLoanLambda',
        resourceName: 'loan',
        srcDir: '../../lambda/calculator',
        handler: "main"
    }];

export class Main extends App {
    constructor() {
        super();
        new HostingBucketStack(this, 'HostingBucketStack', {
            bucketName: hostingBucketName,
            sourcePath: frontendSourcePath
        });
        new LambdaAndApiGatewayStack(this, 'LambdaAndApiGatewayStack', lambdas);
    }
}

const mainConstruct = new Main();
Tag.add(mainConstruct, 'ProjectName', 'DWP-Hack-the-North');
Tag.add(mainConstruct, 'ProjectOwner', 'Manchester');
Tag.add(mainConstruct, 'ProjectCode', 'z10020');

mainConstruct.synth();

