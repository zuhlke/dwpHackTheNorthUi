# AWS CDK Installation
 
 AWS Cloud Development Kit (AWS CDK) is a software development framework for specifying cloud infrastructure using in code using (i.e., TypeScript, Python, Java and C#) and provisioning it through AWS CloudFormation[[1]](https://docs.aws.amazon.com/cdk/latest/guide/home.html).
 
 This guide walks through the installation and running AWS CDK for this project. 
 
 ## Requirements
 Make sure ``Node.js (>=10.3.0)`` and ``TypeScript (>= 2.7))`` are installed in your machine.
 
 ## Installation
 Install the AWS CDK using the following command: ``npm install -g aws -cdk`` 
 
 
 Verify the installation: ``cdk --version``
 
 ## Build and deployment
 1. Compile TypeScript to JavaScript: ``npm run build``
 2. Bootstrap the stack: ``cdk bootstrap``
 3. Emits the synthesized CloudFormation template: ``cdk synth``
 4. Deploy the stack: ``cdk deploy``
 5. Destroy the stack: ``cdk destroy``
 
 ### Other useful commands
 1. Watch for changes and compile: ``npm run watch``
 2. Perform the jest unit tests: ``nom run test``
 3. Compare deployed stack with current state: ``cdk diff``
 
 ### Notes
 * Buckets must be cleaned up before ```cdk destroy``` if bucket destroy policy enabled in the stack.
 * The frontend needs to be compiled and built manually before deploying to S3 bucket.
 


