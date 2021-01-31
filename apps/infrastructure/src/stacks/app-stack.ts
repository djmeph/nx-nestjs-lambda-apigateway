import { Stack, Construct, StackProps, SecretValue } from '@aws-cdk/core';
import { GitHubSourceAction } from '@aws-cdk/aws-codepipeline-actions';
import { Artifact } from '@aws-cdk/aws-codepipeline';
import { CdkPipeline, SimpleSynthAction } from '@aws-cdk/pipelines';
import { EnvStage } from './env-stage';

export class AppStack extends Stack {
  private sourceAction: GitHubSourceAction;
  private sourceArtifact: Artifact;
  private pipeline: CdkPipeline;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    this.createSourceAction();
    this.createPipeline();
    this.createStages();
  }

  createSourceAction() {
    this.sourceArtifact = new Artifact();
    const token = SecretValue.secretsManager('GITHUB_READ_TOKEN');
    this.sourceAction = new GitHubSourceAction({
      actionName: 'GitHub',
      output: this.sourceArtifact,
      owner: 'djmeph',
      repo: 'nx-nestjs-lambda-apigateway',
      branch: 'main',
      oauthToken: token,
    });
  }

  createPipeline() {
    const cloudAssemblyArtifact = new Artifact();
    this.pipeline = new CdkPipeline(this, 'cdk-pipeline', {
      pipelineName: 'LambdaAPIPipeline',
      cloudAssemblyArtifact,
      sourceAction: this.sourceAction,
      synthAction: SimpleSynthAction.standardNpmSynth({
        sourceArtifact: this.sourceArtifact,
        cloudAssemblyArtifact,
        subdirectory: 'apps/infrastructure',
        synthCommand: 'npm run nx run infrastructure:build',
        buildCommand: 'npm run build:lambda'
      })
    })
  }

  createStages() {
    this.pipeline.addApplicationStage(
      new EnvStage(this, 'development')
    )
  }
}
