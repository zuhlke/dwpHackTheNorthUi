#!/usr/bin/env node
import {App} from "@aws-cdk/core";
import {HostingBucketStack} from "./hosting-bucket-stack";

const hostingBucketName = 'z10020-dwp-hack-the-north';
const frontendSourcePath = '../dwp-hack-the-north-ui/build';
const app = new App();

new HostingBucketStack(app, 'HostingBucketStack', {bucketName: hostingBucketName, sourcePath: frontendSourcePath});

app.synth();
