import s3 = require("@aws-cdk/aws-s3");
import {Construct, RemovalPolicy} from "@aws-cdk/core";
import {BucketDeployment, Source} from "@aws-cdk/aws-s3-deployment";

export class HostingBucket extends Construct {
    constructor(scope: Construct, id: string) {
        super(scope, id);
        const deploymentBucket = new s3.Bucket(this, 'deployment-bucket', {
            bucketName: 'z10020-dwp-hack-the-north',
            websiteIndexDocument: 'index.html',
            removalPolicy: RemovalPolicy.DESTROY, // bucket must be empty before performing 'cdk destroy'
        });

        new BucketDeployment(this, 'deploy-website', {
            sources: [Source.asset('../dwp-hack-the-north-ui/build')],
            destinationBucket: deploymentBucket
        });

        deploymentBucket.grantPublicAccess()
    }
}

