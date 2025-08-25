import { AppSyncResolverEvent } from "aws-lambda";
import { Spell, Spellbook, QuerySpellbookArgs } from '@voidconcept/shared'
import { CombinedStorageClient } from "../../combinedStorage/combinedStorageClient";
import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { isSpellbookAttributesLine, isSpellbookOwnerStorageLine, isSpellbookSpellLine } from "./types";

const dynamoDb = new DynamoDB()
const tableName = process.env.TABLE_NAME!
const combinedStorageClient = new CombinedStorageClient(dynamoDb, tableName, "spellbook")

export const handler = async (
    event: AppSyncResolverEvent<QuerySpellbookArgs>
): Promise<Spellbook | null> => {
    console.log(JSON.stringify(event))
    const records = await combinedStorageClient.read(`spellbook#${event.arguments.id}`)

    const ownerLine = records.find(isSpellbookOwnerStorageLine)
    const attributesLine = records.find(isSpellbookAttributesLine)
    const spellLines: Spell[] = records.filter(isSpellbookSpellLine).map(spellLine => {
        const {partitionKey, sortKey, ...spell} = spellLine
        return spell
    })

    if (!ownerLine || !attributesLine) {
        return null
    }

    const spellbook: Spellbook = {
        ownerId: ownerLine.ownerId,
        maxPrepared: attributesLine.maxPrepared,
        name: attributesLine.name,
        spells: spellLines,
    }

    return spellbook
}

