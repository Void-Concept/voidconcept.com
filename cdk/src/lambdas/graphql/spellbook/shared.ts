import { AppSyncIdentity, AppSyncIdentityCognito } from "aws-lambda";

export const isCognitoIdentity = 
    (identity: AppSyncIdentity): identity is AppSyncIdentityCognito => 
        !!identity && (identity as any).sub && (identity as any).name

export const partitionKeyFor = (id: string): string => `spellbook#${id}`