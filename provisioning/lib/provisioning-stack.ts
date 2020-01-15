import * as cdk from '@aws-cdk/core';
import s3 = require("@aws-cdk/aws-s3");

export class ProvisioningStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const deploymentBucket = new s3.Bucket(this, 'dwp-hack-the-north-bucket', {
      bucketName: 'z10020-dwp-hack-the-north',
      websiteIndexDocument: 'index.html',
      removalPolicy: cdk.RemovalPolicy.DESTROY, // the bucket must be empty before running `cdk destroy`
    });


    deploymentBucket.grantPublicAccess()
  }
}
