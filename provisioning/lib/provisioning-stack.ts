import * as cdk from '@aws-cdk/core';
import {HostingBucket} from "./hosting-bucket";

export class ProvisioningStack extends cdk.Stack {
  private readonly hostingBucketName = 'z10020-dwp-hack-the-north';
  private readonly frontendSourcePath = '../dwp-hack-the-north-ui/build';

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new HostingBucket(this, 'hosting-bucket', {bucketName: this.hostingBucketName, sourcePath: this.frontendSourcePath})
  }
}
