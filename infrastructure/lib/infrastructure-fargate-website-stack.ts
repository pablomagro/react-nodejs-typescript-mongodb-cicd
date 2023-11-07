import * as cdk from 'aws-cdk-lib';
import { StackConfig } from './infrastructure.type';

/**
 * Represents the CloudFormation stack for the TestFive application.
 * @class
 * @extends cdk.Stack
 */
export class DockerFargateWebSiteStack extends cdk.Stack {
  constructor(scope: cdk.App, config: StackConfig, id: string, props?: cdk.StackProps) {
    const environment = config.environment;
    props = {
      ...props,
      stackName: `demo-application-stack-${environment}`,
      description: `Frontend deployment stack using Docker & Fargate  ${environment}`
    }

    super(scope, id, props);

    /**
     * 👉 Stack Definition:
     */


  }
}
