import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import {HostingBucketStack} from "../lib/hosting-bucket-stack";

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new HostingBucketStack(app, 'MyTestStack', {bucketName: '', sourcePath: ''});
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
