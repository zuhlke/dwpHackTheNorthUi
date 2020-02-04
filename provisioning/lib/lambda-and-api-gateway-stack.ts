import lambda = require("@aws-cdk/aws-lambda");
import path = require("path");
import {App, Construct, Stack} from "@aws-cdk/core";

export interface LambdaStackProps {
    srcDir: string
    handler: string
    uri: string
    dbName: string
    collection: string
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
    }
}

export class LambdaAndApiGatewayStack extends Stack {
    constructor(app: App, id: string, props: LambdaStackProps) {
        super(app, id);

        new LambdaAndApiGatewayConstruct(this, id, props);
    }
}
