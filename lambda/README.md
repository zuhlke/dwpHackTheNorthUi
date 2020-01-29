# Description
This package contains a Lambda function that establishes a connection to a remote MongoDB and retrieves questions list from the database. This document describes the requirements, and process of deploying a Lambda function into AWS.

## Requirements
Make sure the following distributions and packages are installed 
1. The latest version of Go (see [the Go installation guideline](https://golang.org/doc/install))
2. Lambda package: ```go get github.com/aws/aws-lambda-go/lambda``` 
3. Mongo driver: ```go.mongodb.org/mongo-driver/mongo```
 
## Compile executable
Lambda functions need to be compiled into executables before uploading to AWS.
```bash
GOOS=linux go build file-name.go
```
Setting ```GOOS``` in ```linux``` ensures that the compiled executable is compatible with the Go runtime, even it is compiled in a non-linux environment.


## Create a deployment package
In the folder where the executable is located, run the following command.
```bash
zip function.zip file-name
```

## Deploy a function to AWS
To deploy a function, an AWS role is needed. Make sure to use an existing role, or create a new role for your function.
```bash
aws lambda create-function --function-name your-function-name --runtime go1.x \
--zip-file fileb://function.zip --handler name-of-the-executable \
--role arn:aws:iam:numbers:role/execution role \
--environment "Variables={URI=your_connection_string,DATABASE_NAME=your_db_name,COLLECTION=your_collection}" \
--tags "ProjectName=dwpHackTheNorth,ProjectCode=z10020,ProjectOwner=Manchester"

```
