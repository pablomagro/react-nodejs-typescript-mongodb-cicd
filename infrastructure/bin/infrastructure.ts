#!/usr/bin/env node

import * as cdk from 'aws-cdk-lib';
import { S3WebSiteStack } from '../lib/infrastructure-s3-website-stack';
import { DockerFargateWebSiteStack } from '../lib/infrastructure-fargate-website-stack';

const app = new cdk.App();

const env = app.node.tryGetContext("config");
const config = app.node.tryGetContext(env);

interface MultiStackProps extends cdk.StackProps {
  encryptBucket?: boolean;
}

const props: MultiStackProps = {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT ?? config.account,
    region: process.env.CDK_DEFAULT_REGION ?? config.region
  }
}

async function buildStack() {
  new S3WebSiteStack(app, config, "S3WebSiteStack", props);
  new DockerFargateWebSiteStack(app, config, "DockerFargateWebSiteStack", props);
}

buildStack()

app.synth();
