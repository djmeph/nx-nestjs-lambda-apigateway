import { Construct, StackProps, Stage } from "@aws-cdk/core";
import { LambdaStack } from "./lambda-stack";

export class EnvStage extends Stage {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new LambdaStack(this, 'lambda-stack', {
      env: { account: process.env.AWS_ACCOUNT, region: process.env.AWS_REGION },
    });
  }
}