# Frontend Deployment Guide

To deploy your React frontend application to CloudFront, follow these steps:

1. Build the frontend application:
```bash
cd frontend
npm install
npm run build
```

2. Deploy the infrastructure with CDK:
```bash
cd infrastructure
npm install
npm run build
cdk deploy
```

3. After the deployment completes successfully, the CDK will output the CloudFront distribution URL. You can access your website using this URL.

## Infrastructure Details

The deployment creates:
- An S3 bucket to store the website files
- A CloudFront distribution for content delivery
- Automatic deployment of the frontend build files to S3
- HTTPS redirection for secure access

The CloudFront distribution is configured to:
- Serve index.html as the default root object
- Redirect all 404 errors to index.html for SPA support
- Use HTTPS for all requests

## Notes
- The S3 bucket is private and only accessible through CloudFront
- The infrastructure is set up to destroy the S3 bucket when the stack is destroyed (not recommended for production)
- The distribution automatically invalidates when new content is deployed