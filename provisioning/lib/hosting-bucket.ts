import s3 = require("@aws-cdk/aws-s3");
import {Construct, RemovalPolicy} from "@aws-cdk/core";
import {BucketDeployment, Source} from "@aws-cdk/aws-s3-deployment";

export interface HostingBucketProps {
    bucketName: string
    sourcePath: string
}

export class HostingBucket extends Construct {
    constructor(scope: Construct, id: string, props: HostingBucketProps = {bucketName: '', sourcePath: ''}) {
        super(scope, id);

        if ( (props.bucketName != null && props.bucketName != "") && (props.sourcePath != null && props.sourcePath != "")) {
            const deploymentBucket = new s3.Bucket(this, 'deployment-bucket', {
                bucketName: props.bucketName,
                websiteIndexDocument: 'index.html',
                removalPolicy: RemovalPolicy.DESTROY, // bucket must be empty before performing 'cdk destroy'
            });

            new BucketDeployment(this, 'deploy-website', {
                sources: [Source.asset(props.sourcePath)],
                destinationBucket: deploymentBucket
            });

            deploymentBucket.grantPublicAccess()
        } else {
            console.error('ERROR: Bucket name and source path for the frontend must be provided')
        }

    }
}
