SCRIPT_DIR=$(dirname $0) &&

S3Name=$(aws cloudformation describe-stacks --stack-name FrontendStack --query 'Stacks[0].Outputs[?OutputKey == `FrontendBucketUri`].OutputValue' --output text) &&
aws s3 sync ${SCRIPT_DIR}/../build ${S3Name} --delete &&
FrontendCdnId=$(aws cloudformation describe-stacks --stack-name FrontendStack --query 'Stacks[0].Outputs[?OutputKey == `FrontendCdnId`].OutputValue' --output text) &&
aws cloudfront create-invalidation --distribution-id ${FrontendCdnId} --paths '/*'