#!/usr/bin/env node
import {App, Tag} from "@aws-cdk/core";
import {HostingBucketStack} from "./hosting-bucket-stack";
import {LambdaAndApiGatewayStack} from "./lambda-and-api-gateway-stack";

const hostingBucketName = 'z10020-dwp-hack-the-north';
const frontendSourcePath = '../dwp-hack-the-north-ui/build';
const getQuestionsHandler = 'main';
const getQuestionsSource = '../../lambda/questionnaire';
const uri = '';
const dbName = '';
const collection = '';

export class Main extends App {
    constructor() {
        super();
        new HostingBucketStack(this, 'HostingBucketStack', {bucketName: hostingBucketName, sourcePath: frontendSourcePath});
        new LambdaAndApiGatewayStack(this, 'LambdaAndApiGatewayStack', {srcDir: getQuestionsSource, handler: getQuestionsHandler, uri: uri, dbName: dbName, collection: collection});
    }
}

const mainConstruct = new Main();
Tag.add(mainConstruct,'ProjectName', 'DWP-Hack-the-North');
Tag.add(mainConstruct, 'ProjectOwner', 'Manchester');
Tag.add(mainConstruct, 'ProjectCode', 'z10020');

mainConstruct.synth();

