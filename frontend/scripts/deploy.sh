yarn build --cwd .. &&
S3Name=$(aws cloudformation describe-stacks --stack-name FrontendStack --query 'Stacks[0].Outputs[?OutputKey == `FrontendBucketUri`].OutputValue' --output text) &&
aws s3 sync ../build ${S3Name}