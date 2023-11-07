# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template

## Application deployment

The npm script can be used for local test and check that app infrastructure is deployed correctly.

Below is an execution example for a testing environment within a Mac/Linux computer:

```zsh
CDK_DEFAULT_ACCOUNT=123456789 CDK_DEFAULT_REGION="ap-southeast-2" npm run deploy:testing
```
