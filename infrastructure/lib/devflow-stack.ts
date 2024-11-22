import * as cdk from 'aws-cdk-lib';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';
import path = require('path');

export class DevFlowStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Frontend hosting infrastructure
    const websiteBucket = new s3.Bucket(this, 'XXXXXXXXXXXXX', {
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    // Create a CloudFront distribution
    const distribution = new cloudfront.Distribution(this, 'Distribution', {
      defaultBehavior: {
        origin: new origins.S3Origin(websiteBucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      defaultRootObject: 'index.html',
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
        },
      ],
    });

    // Deploy the website files to S3
    new s3deploy.BucketDeployment(this, 'XXXXXXXXXXXXXXXXX', {
      sources: [s3deploy.Source.asset('../frontend/build')],
      destinationBucket: websiteBucket,
      distribution,
      distributionPaths: ['/*'],
    });

    // Output the CloudFront URL
    new cdk.CfnOutput(this, 'DistributionDomainName', {
      value: distribution.distributionDomainName,
      description: 'CloudFront Distribution Domain Name',
    });

    // Backend Infrastructure
    // DynamoDB Table
    const tasksTable = new dynamodb.Table(this, 'TasksTable', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'userId', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // NOT recommended for production
    });

    // Lambda Functions
    const createTaskFunction = new lambda.Function(this, 'CreateTaskFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambda/create-task')),
      environment: {
        TABLE_NAME: tasksTable.tableName,
      },
    });

  const getTasksFunction = new lambda.Function(this, 'GetTasksFunction', {
    runtime: lambda.Runtime.NODEJS_18_X,
    handler: 'index.handler',
    code: lambda.Code.fromAsset(path.join(__dirname, '../lambda/get-tasks')),
    environment: {
      TABLE_NAME: tasksTable.tableName
    }
  });
  

    const updateTaskFunction = new lambda.Function(this, 'UpdateTaskFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambda/update-task')),
      environment: {
        TABLE_NAME: tasksTable.tableName,
      },
    });

    const deleteTaskFunction = new lambda.Function(this, 'DeleteTaskFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambda/delete-task')),
      environment: {
        TABLE_NAME: tasksTable.tableName,
      },
    });

    // Grant permissions
    tasksTable.grantReadWriteData(createTaskFunction);
    tasksTable.grantReadData(getTasksFunction);
    tasksTable.grantReadWriteData(updateTaskFunction);
    tasksTable.grantReadWriteData(deleteTaskFunction);

    // API Gateway
    const api = new apigateway.RestApi(this, 'DevFlowApi', {
      restApiName: 'DevFlow API',
      description: 'API for DevFlow task management system',
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: ['*'],
      },
    });

    const tasks = api.root.addResource('tasks');
    
    // POST /tasks
    tasks.addMethod('POST', new apigateway.LambdaIntegration(createTaskFunction));
    
    // GET /tasks
    tasks.addMethod('GET', new apigateway.LambdaIntegration(getTasksFunction));
    
    // Individual task endpoints
    const task = tasks.addResource('{taskId}');
    
    // GET /tasks/{taskId}
    task.addMethod('GET', new apigateway.LambdaIntegration(getTasksFunction));
    
    // PUT /tasks/{taskId}
    task.addMethod('PUT', new apigateway.LambdaIntegration(updateTaskFunction));
    
    // DELETE /tasks/{taskId}
    task.addMethod('DELETE', new apigateway.LambdaIntegration(deleteTaskFunction));
  }
}