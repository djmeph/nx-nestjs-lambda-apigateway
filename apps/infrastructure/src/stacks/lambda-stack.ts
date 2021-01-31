import { Code, Function, Runtime } from "@aws-cdk/aws-lambda";
import { Construct, Duration, Stack, StackProps } from "@aws-cdk/core";
import { LambdaRestApi } from '@aws-cdk/aws-apigateway';
import * as path from 'path';

const zipFilePath = path.join(__dirname, '../../../..', 'lambda.zip');

export class LambdaStack extends Stack {
  private func: Function;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    this.createLambdaFunction();
    this.createApi();
  }

  createLambdaFunction() {
    this.func = new Function(this, 'api-nestjs-lambda', {
      code: Code.fromAsset(zipFilePath),
      handler: 'dist/apps/api-lambda/main.handler',
      runtime: Runtime.NODEJS_12_X,
      description: 'API Lambda Function',
      timeout: Duration.seconds(30),
      memorySize: 1024
    })
  }

  createApi() {
    new LambdaRestApi(this, 'nestj-lambda-api', {
      handler: this.func,
    });
  }
}