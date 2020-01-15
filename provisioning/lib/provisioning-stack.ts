import * as cdk from '@aws-cdk/core';
import {HostingBucket} from "./hosting-bucket";

export class ProvisioningStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new HostingBucket(this, 'hosting-bucket')
  }
}
