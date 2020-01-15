import * as cdk from '@aws-cdk/core';
import s3 = require("@aws-cdk/aws-s3");
import s3deploy = require("@aws-cdk/aws-s3-deployment");

export class ProvisioningStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const deploymentBucket = new s3.Bucket(this, 'dwp-hack-the-north-bucket', {
      bucketName: 'z10020-dwp-hack-the-north',
      websiteIndexDocument: 'index.html',
      removalPolicy: cdk.RemovalPolicy.DESTROY, // the bucket must be empty before running `cdk destroy`
    });

    new s3deploy.BucketDeployment(this, 'deploy-wesbite', {
      sources: [s3deploy.Source.asset('../dwp-hack-the-north-ui/build')],
      destinationBucket: deploymentBucket
    });

    deploymentBucket.grantPublicAccess()
  }
}
