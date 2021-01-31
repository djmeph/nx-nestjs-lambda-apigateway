import * as cdk from '@aws-cdk/core';
import { AppStack } from './stacks/app-stack';

const app = new cdk.App();
new AppStack(app, 'nx-nestjs-lambda-apigateway', {
  env: { account: process.env.AWS_ACCOUNT, region: process.env.AWS_REGION },
});
