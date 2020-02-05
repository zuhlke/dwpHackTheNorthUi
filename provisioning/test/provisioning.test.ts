import * as cdk from '@aws-cdk/core';
import {HostingBucketStack} from "../lib/hosting-bucket-stack";

test('Empty Stack fails due to empty properties', async () => {
  
    const app = new cdk.App();
    // WHEN
    expect(() => {
      new HostingBucketStack(app, 'MyTestStack', {bucketName: '', sourcePath: ''})
    }).toThrowError('ERROR: Bucket name and source path for the frontend must be provided');
}, 100);
