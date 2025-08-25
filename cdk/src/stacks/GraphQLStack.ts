import { StackProps, Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as appsync from 'aws-cdk-lib/aws-appsync';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as lambda_nodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';

interface GraphQLStackProps extends StackProps {
    combinedStorageTable: dynamodb.ITable;
    userPool: cognito.IUserPool;
    hostedZone: route53.IHostedZone
}

export class GraphQLStack extends Stack {
    constructor(scope: Construct, id: string, props: GraphQLStackProps) {
        super(scope, id, props);

        const domainName = `graphql.${props.hostedZone.zoneName}`

        const certificate = new acm.Certificate(this, "certificate", {
            domainName,
            validation: acm.CertificateValidation.fromDns(props.hostedZone),
        })

        const api = new appsync.GraphqlApi(this, "Api", {
            name: "graphql",
            definition: appsync.Definition.fromFile(require.resolve("@voidconcept/shared/resources/schema.graphql")),
            authorizationConfig: {
                defaultAuthorization: {
                    authorizationType: appsync.AuthorizationType.USER_POOL,
                    userPoolConfig: {
                        userPool: props.userPool,
                    },
                },
            },
            domainName: {
                domainName,
                certificate,
            },
        })

        const createResolver = this.resolverFn(api, props.combinedStorageTable)

        createResolver(this, "QuerySpellbook", "./src/lambdas/graphql/spellbook/get.ts", {
            typeName: "Query",
            fieldName: "spellbook",
        })


        createResolver(this, "MutationCreateSpellbook", "./src/lambdas/graphql/spellbook/create.ts", {
            typeName: "Mutation",
            fieldName: "createSpellbook",
        })

        new route53.CnameRecord(this, "CnameRecord", {
            recordName: "graphql",
            zone: props.hostedZone,
            domainName: api.appSyncDomainName,
        })
    }

    private resolverFn = (
        api: appsync.GraphqlApi, 
        combinedStorageTable: dynamodb.ITable,
    ) => (
        scope: Construct,
        resolverName: string,
        sourceFile: string,
        resolverProps: appsync.BaseResolverProps,
    ): void => {
        const resolverLambda = new lambda_nodejs.NodejsFunction(scope, `${resolverName}Lambda`, {
            runtime: lambda.Runtime.NODEJS_22_X,
            entry: sourceFile,
            handler: "handler",
            bundling: {
                sourceMap: true,
            },
            environment: {
                combinedStorage: combinedStorageTable.tableName,
            },
        })
        combinedStorageTable.grantReadWriteData(resolverLambda)

        const dataSource = api.addLambdaDataSource(`${resolverName}DataSource`, resolverLambda, {
            name: resolverName,
        })

        dataSource.createResolver(`${resolverName}Resolver`, resolverProps)
    }
}
