import lambda = require("@aws-cdk/aws-lambda");
import path = require("path");
import apigateway = require("@aws-cdk/aws-apigateway");
import {App, Construct, Stack} from "@aws-cdk/core";

export interface LambdaStackProps {
    srcDir: string;
    handler: string;
    uri: string;
    dbName: string;
    collection: string;
}

class LambdaAndApiGatewayConstruct extends Construct {
    constructor(scope: Construct, id: string, props: LambdaStackProps) {
        super(scope, id);

        const handler = new lambda.Function(this, 'GetQuestions', {
            functionName: "getQuestions",
            runtime: lambda.Runtime.GO_1_X,
            handler: props.handler,
            code: lambda.Code.fromAsset(path.join(__dirname, props.srcDir)),
            environment: {
                URI: props.uri,
                DATABASE_NAME: props.dbName,
                COLLECTION: props.collection
            }
        });

        const api = new apigateway.LambdaRestApi(this, 'api-gateway', {
            restApiName: "API Service",
            description: "This service serves DWP Hack the North",
            handler: handler,
            proxy: false
        });

        const getQuestionsIntegration = new apigateway.LambdaIntegration(handler, {
            proxy: false,
            requestTemplates: {"application/json": '{ "statusCode": "200" }'},
            integrationResponses: [{
                statusCode: '200',
            }],
        });

        const questions = api.root.addResource('questions');
        questions.addMethod('GET', getQuestionsIntegration, {
            methodResponses: [{
             statusCode: '200',
                responseParameters: {
                    'method.response.header.Access-Control-Allow-Methods': true
                },
                responseModels: {
                }
            }],
        });

        questions.addMethod('POST', getQuestionsIntegration, {
            methodResponses: [{
                statusCode: '200',
                responseParameters: {
                    'method.response.header.Access-Control-Allow-Methods': true
                },
            }]
        });

    }
}

export class LambdaAndApiGatewayStack extends Stack {
    constructor(app: App, id: string, props: LambdaStackProps) {
        super(app, id);

        new LambdaAndApiGatewayConstruct(this, id, props);
    }
}
