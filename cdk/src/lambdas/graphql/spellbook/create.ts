import { AppSyncResolverEvent } from "aws-lambda";
import { MutationCreateSpellbookArgs, Maybe, CreateSpellbookResponse } from '@voidconcept/shared'
import { CombinedStorageClient } from "../../combinedStorage/combinedStorageClient";
import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { randomUUID } from "crypto";
import { isCognitoIdentity } from "./shared";
import { SpellbookService } from "./spellbookService";

const dynamoDb = new DynamoDB()
const tableName = process.env.combinedStorage!
const combinedStorageClient = new CombinedStorageClient(dynamoDb, tableName, "spellbook")
const spellbookService = new SpellbookService(combinedStorageClient)

export const handler = async (
    event: AppSyncResolverEvent<MutationCreateSpellbookArgs>
): Promise<Maybe<CreateSpellbookResponse>> => {
    console.log(JSON.stringify(event))

    const identity = event.identity
    if (!isCognitoIdentity(identity)) {
        throw new Error("You are not logged in")
    }

    const spellbook = event.arguments.spellbook

    const newSpellbookId = randomUUID()

    return spellbookService.upsert(newSpellbookId, identity.sub, spellbook)
}

