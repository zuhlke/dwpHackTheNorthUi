import lambda = require("@aws-cdk/aws-lambda");
import path = require("path");
import apigateway = require("@aws-cdk/aws-apigateway");
import {App, Construct, Stack} from "@aws-cdk/core";
import {EmptyModel} from "@aws-cdk/aws-apigateway";

export interface LambdaStackProps {
    functionName: string;
    resourceName: string;
    srcDir: string;
    handler: string;
    uri?: string;
    dbName?: string;
    collection?: string;
}

class LambdaAndApiGatewayConstruct extends Construct {
    constructor(scope: Construct, id: string, lambdas: LambdaStackProps[]) {
        super(scope, id);
        let api = undefined;

        for (let i = 0; i < lambdas.length; i++) {
            const handler = this.createLambdaFunction(lambdas[i]);
            this.addDatabaseEnvironmentVariables(lambdas[i], handler);
            const integration = this.createLambdaIntegration(handler);
            if (api === undefined) {
                api = this.createApiGateway(handler);
            }
            const resource = this.addResource(api, lambdas[i].resourceName);
            this.addHttpGetMethod(resource, integration);
            this.addHttpPostMethod(resource, integration);
            this.enableCors(resource, handler);

        }
    }

    createLambdaFunction(props: LambdaStackProps): lambda.Function {
        return new lambda.Function(this, props.functionName, {
            functionName: props.functionName,
            runtime: lambda.Runtime.GO_1_X,
            handler: props.handler,
            code: lambda.Code.fromAsset(path.join(__dirname, props.srcDir)),
        });

    }

    addDatabaseEnvironmentVariables(props: LambdaStackProps, handler: lambda.Function): void {
        if (props.uri && props.dbName && props.collection) {
            handler.addEnvironment("URI", props.uri);
            handler.addEnvironment("DATABASE_NAME", props.dbName);
            handler.addEnvironment("COLLECTION", props.collection);
        }
    }

    createApiGateway(handler: lambda.Function): apigateway.LambdaRestApi {
        return new apigateway.LambdaRestApi(this, 'api-gateway', {
            restApiName: "API Service",
            description: "This service serves DWP Hack the North",
            handler: handler,
            proxy: false
        });
    }

    createLambdaIntegration(handler: lambda.Function): apigateway.LambdaIntegration {
        return new apigateway.LambdaIntegration(handler, {
            proxy: false,
            integrationResponses: [{
                statusCode: '200',
            }],
        });
    }

    addResource(api: apigateway.LambdaRestApi, resourceName: string): apigateway.Resource {
        return api.root.addResource(resourceName);
    }

    addHttpGetMethod(resource: apigateway.Resource, integration: apigateway.LambdaIntegration): void {
        resource.addMethod('GET', integration, {
            methodResponses: [{
                statusCode: '200',
                responseParameters: {
                    'method.response.header.Access-Control-Allow-Methods': true
                },
                responseModels: {
                    'application/json': new EmptyModel()
                }
            }],
        });
    }

    addHttpPostMethod(resource: apigateway.Resource, integration: apigateway.LambdaIntegration): void {
        resource.addMethod('POST', integration, {
            methodResponses: [{
                statusCode: '200',
                responseParameters: {
                    'method.response.header.Access-Control-Allow-Methods': true
                },
                responseModels: {
                    'application/json': new EmptyModel()
                }
            }]
        });
    }

    enableCors(resource: apigateway.Resource, handler: lambda.Function): void {
        resource.addMethod('OPTIONS', new apigateway.LambdaIntegration(handler, {
            integrationResponses: [{
                statusCode: '200',
                responseParameters: {
                    'method.response.header.Access-Control-Allow-Headers': "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent'",
                    'method.response.header.Access-Control-Allow-Origin': "'*'",
                    'method.response.header.Access-Control-Allow-Credentials': "'false'",
                    'method.response.header.Access-Control-Allow-Methods': "'OPTIONS,GET,PUT,POST,DELETE'",
                },
            }],
            passthroughBehavior: apigateway.PassthroughBehavior.NEVER,
            requestTemplates: {
                "application/json": '{"statusCode": 200}'
            },
        }), {
            methodResponses: [{
                statusCode: '200',
                responseParameters: {
                    'method.response.header.Access-Control-Allow-Headers': true,
                    'method.response.header.Access-Control-Allow-Methods': true,
                    'method.response.header.Access-Control-Allow-Credentials': true,
                    'method.response.header.Access-Control-Allow-Origin': true,
                },
            }]
        });
    }
}

export class LambdaAndApiGatewayStack extends Stack {
    constructor(app: App, id: string, props: LambdaStackProps[]) {
        super(app, id);

        new LambdaAndApiGatewayConstruct(this, id, props);
    }
}
