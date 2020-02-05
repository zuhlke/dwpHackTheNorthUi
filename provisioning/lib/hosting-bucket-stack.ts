import {App, RemovalPolicy, Stack} from "@aws-cdk/core";
import {BucketDeployment, Source} from "@aws-cdk/aws-s3-deployment";
import {Bucket} from "@aws-cdk/aws-s3";

export interface HostingBucketProps {
    bucketName: string;
    sourcePath: string;
}

export class HostingBucketStack extends Stack {
    constructor(scope: App, id: string, props: HostingBucketProps) {
        super(scope, id);

        if ((props.bucketName !== null && props.bucketName !== "") && (props.sourcePath !== null && props.sourcePath !== "")) {
            const deploymentBucket = new Bucket(this, 'deployment-bucket', {
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
            console.error('ERROR: Bucket name and source path for the frontend must be provided');
            throw new Error('ERROR: Bucket name and source path for the frontend must be provided');
        }

    }
}
