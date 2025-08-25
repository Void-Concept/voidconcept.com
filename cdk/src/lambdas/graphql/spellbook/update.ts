import { AppSyncResolverEvent } from "aws-lambda";
import { MutationUpdateSpellbookArgs, Maybe, UpdateSpellbookResponse } from '@voidconcept/shared'
import { CombinedStorageClient } from "../../combinedStorage/combinedStorageClient";
import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { isCognitoIdentity } from "./shared";
import { SpellbookService } from "./spellbookService";

const dynamoDb = new DynamoDB()
const tableName = process.env.combinedStorage!
const combinedStorageClient = new CombinedStorageClient(dynamoDb, tableName, "spellbook")
const spellbookService = new SpellbookService(combinedStorageClient)

export const handler = async (
    event: AppSyncResolverEvent<MutationUpdateSpellbookArgs>
): Promise<Maybe<UpdateSpellbookResponse>> => {
    console.log(JSON.stringify(event))

    const identity = event.identity
    if (!isCognitoIdentity(identity)) {
        throw new Error("You are not logged in")
    }

    const {id, spellbook} = event.arguments

    const existingSpellbook = await spellbookService.get(id)

    if (!existingSpellbook || existingSpellbook.ownerId !== identity.sub) {
        throw new Error("Spellbook doesn't exist")
    }

    return spellbookService.upsert(id, identity.sub, spellbook)
}

