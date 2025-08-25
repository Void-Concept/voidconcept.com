import { AppSyncResolverEvent } from "aws-lambda";
import { MutationCreateSpellbookArgs, Maybe, CreateSpellbookResponse } from '@voidconcept/shared'
import { CombinedStorageClient } from "../../combinedStorage/combinedStorageClient";
import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { SpellbookAttributesLine, SpellbookOwnerStorageLine, SpellbookSpellLine } from "./types";
import { randomUUID } from "crypto";
import { isCognitoIdentity, partitionKeyFor } from "./shared";

const dynamoDb = new DynamoDB()
const tableName = process.env.combinedStorage!
const combinedStorageClient = new CombinedStorageClient(dynamoDb, tableName, "spellbook")

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

    const partitionKey = partitionKeyFor(newSpellbookId)

    const ownerLine: SpellbookOwnerStorageLine = {
        ownerId: identity.sub,
        partitionKey: partitionKey,
        sortKey: "owner"
    }

    const attributesLine: SpellbookAttributesLine = {
        partitionKey: partitionKey,
        sortKey: "attributes",
        maxPrepared: spellbook.maxPrepared,
        name: spellbook.name,
    }

    const spellLines: SpellbookSpellLine[] = spellbook.spells.map((spell, index) => ({
        partitionKey,
        sortKey: `spell#${index}`,
        ...spell
    }))

    const wasCreated = await combinedStorageClient.upsert([ownerLine, attributesLine, ...spellLines])

    if (!wasCreated) {
        return null
    } else {
        return {
            id: newSpellbookId,
            spellbook: {
                ownerId: identity.sub,
                ...spellbook,
            },
        }
    }
}

