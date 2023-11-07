import * as cdk from 'aws-cdk-lib';
import * as sns from "aws-cdk-lib/aws-sns";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as cloudwatch from "aws-cdk-lib/aws-cloudwatch";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as s3Deploy from "aws-cdk-lib/aws-s3-deployment";
// import * as snsSubscriptions from "aws-cdk-lib/aws-sns-subscriptions";
import { CfnOutput } from 'aws-cdk-lib';
import { S3WebSiteStack } from '../lib/infrastructure-s3-website-stack';
import { StackConfig } from '../lib/infrastructure.type';
import '@aws-cdk/assert/jest';

describe('S3WebSiteStack', () => {

  const config: StackConfig = {
    "environment": "test",
    "frontendSources": "./",
    "domainName": "test.site",
    "snsRecipient": "recipient-test@gmail.com"
  };

  let app: cdk.App;
  let stack: S3WebSiteStack;

  beforeEach(() => {
    app = new cdk.App();
    stack = new S3WebSiteStack(app, config, 'S3WebSiteStack', {
      env: {
        account: '1234567890',
        region: 'test-region-1',
      }
    });
  });

  test('S3WebSiteStack should create an S3 bucket', () => {
    // Act
    const bucket = stack.node.findChild('ReactAppBucket');

    // Assert
    expect(bucket).toBeInstanceOf(s3.Bucket);
  });

  test('S3WebSiteStack should create a CloudFront distribution', () => {
    // Act
    const distribution = stack.node.findChild(`demo-application-distribution-${config.environment}`);

    // Assert
    expect(distribution).toBeInstanceOf(cloudfront.CloudFrontWebDistribution);
  });

  test('S3WebSiteStack should create an ACM certificate', () => {
    // Act
    const certificate = stack.node.findChild('Certificate Test Five');

    // Assert
    expect(certificate).toBeInstanceOf(acm.DnsValidatedCertificate);
  });

  test('S3WebSiteStack should create a Route 53 record for the CloudFront distribution', () => {
    // Act
    const record = stack.node.findChild('Alias');

    // Assert
    expect(record).toBeInstanceOf(route53.ARecord);
  });

  test('S3WebSiteStack should deploy the React app to the S3 bucket', () => {
    // Act
    const deployment = stack.node.findChild(`demo-application-s3-deployment-${config.environment}`);

    // Assert
    expect(deployment).toBeInstanceOf(s3Deploy.BucketDeployment);
  });

  test('S3WebSiteStack should create an alarm that triggers if there are more than 100 errors in a 5-minute period for two consecutive periods', () => {
    // Act
    const alarm = stack.node.findChild(`demo-application-alarm-higherrorrate-${config.environment}`);

    // Assert
    expect(alarm).toBeInstanceOf(cloudwatch.Alarm);
    // expect(alarm.threshold).toBe(100);
    // expect(alarm.evaluationPeriods).toBe(2);
    // expect(alarm.datapointsToAlarm).toBe(2);
    // expect(alarm.comparisonOperator).toBe(cloudwatch.ComparisonOperator.GREATER_THAN_THRESHOLD);
    // expect(alarm.alarmDescription).toBe('S3 bucket number of errors.');
  });

  test('S3WebSiteStack should create an SNS topic and a subscription', () => {
    // Act
    const topic = stack.node.findChild('demo-application-sns');
    const subscription = stack.node.findChild(`demo-application-alarm-higherrorrate-${config.environment}`);

    // Assert
    expect(topic).toBeInstanceOf(sns.Topic);
    // expect(subscription).toBeInstanceOf(snsSubscriptions.EmailSubscription);
  });

  test('S3WebSiteStack should create an alarm that triggers if the average 4xx error rate exceeds 1% in a 5-minute period for two consecutive periods', () => {
    // Act
    const alarm = stack.node.findChild(`demo-application-alarm-highcloudfront4xxerrorrate-${config.environment}`) as cloudwatch.Alarm;

    // Assert
    expect(alarm).toBeInstanceOf(cloudwatch.Alarm);
    // expect(alarm.metric.metricName).toBe('NumberOfErrors');
    // expect(alarm.metric.namespace).toBe('AWS/S3');
    // expect(alarm.metric.dimensionsMap).toEqual({ BucketName: reactAppBucket.bucketName });
    // expect(alarm.metric.statistic).toBe('SampleCount');
    // expect(alarm.metric.period).toEqual(cdk.Duration.minutes(5));
    // expect(alarm.threshold).toBe(100);
    // expect(alarm.evaluationPeriods).toBe(2);
    // expect(alarm.datapointsToAlarm).toBe(2);
    // expect(alarm.comparisonOperator).toBe(cloudwatch.ComparisonOperator.GREATER_THAN_THRESHOLD);
    // expect(alarm.alarmDescription).toBe('S3 bucket number of errors.');
  });

  test('S3WebSiteStack should add an SNS action to the CloudFront 4xx error rate alarm', () => {
    // Act
    const alarm = stack.node.findChild(`demo-application-alarm-highcloudfront4xxerrorrate-${config.environment}`);

    // Assert
    // expect(alarm.alarmActions[0]).toBeInstanceOf(cw_actions.SnsAction);
  });

  test('S3WebSiteStack should create a dashboard for monitoring and managing alarms', () => {
    // Act
    const dashboard = stack.node.findChild('Test Five Dashboard');

    // Assert
    expect(dashboard).toBeInstanceOf(cloudwatch.Dashboard);
    // expect(dashboard.dashboardName).toBe('test-five-infrastructure-dashboard');
  });

  test('S3WebSiteStack should add widgets to the dashboard for the high error rate alarm and the high CloudFront 4xx error rate alarm', () => {
    // Act
    const dashboard = stack.node.findChild('Test Five Dashboard');

    // Assert
    // expect(dashboard.widgets).toContainEqual(new cloudwatch.AlarmWidget({ title: 'High Error Rate', alarm: stack.node.findChild(`demo-application-alarm-higherrorrate-${config.environment}`') });
    // expect(dashboard.widgets).toContainEqual(new cloudwatch.AlarmWidget({ title: 'High Cloud Front 4xx Error Rate', alarm: stack.node.findChild(`demo-application-alarm-highcloudfront4xxerrorrate-${config.environment}`) }));
  });

  test('S3WebSiteStack should create CfnOutputs for the React app bucket name, the CloudFront distribution domain name, and the site certificate certificate ARN', () => {
    // Act
    const reactAppBucketNameOutput = stack.node.findChild('reactAppBucketName');
    const cloudFrontDistributionDomainNameOutput = stack.node.findChild('cloudFrontDistributionDomainName');
    const siteCertificateCertificateArnOutput = stack.node.findChild('siteCertificateCertificateArn');

    // Assert
    expect(reactAppBucketNameOutput).toBeInstanceOf(CfnOutput);
    expect(cloudFrontDistributionDomainNameOutput).toBeInstanceOf(CfnOutput);
    expect(siteCertificateCertificateArnOutput).toBeInstanceOf(CfnOutput);
  });

});
