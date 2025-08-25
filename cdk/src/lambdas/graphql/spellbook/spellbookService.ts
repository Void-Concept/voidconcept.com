import { SpellbookInput, CreateSpellbookResponse, Spell, Spellbook } from "@voidconcept/shared";
import { CombinedStorageClient } from "../../combinedStorage/combinedStorageClient";
import { partitionKeyFor } from "./shared";
import { isSpellbookAttributesLine, isSpellbookOwnerStorageLine, isSpellbookSpellLine, SpellbookAttributesLine, SpellbookOwnerStorageLine, SpellbookSpellLine } from "./types";

export type SpellbookResponse = Omit<CreateSpellbookResponse, '__typename'>

export class SpellbookService {
    constructor(
        private combinedStorageClient: CombinedStorageClient,
    ) {}

    get = async (id: string): Promise<Spellbook | null> => {
        const records = await this.combinedStorageClient.read(partitionKeyFor(id))
        
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

    upsert = async (id: string, ownerId: string, spellbook: SpellbookInput): Promise<SpellbookResponse | null> => {
        const partitionKey = partitionKeyFor(id)
    
        const ownerLine: SpellbookOwnerStorageLine = {
            ownerId: ownerId,
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
    
        const wasCreated = await this.combinedStorageClient.upsert([ownerLine, attributesLine, ...spellLines])
    
        if (!wasCreated) {
            return null
        } else {
            return {
                id,
                spellbook: {
                    ownerId,
                    ...spellbook,
                },
            }
        }
    }
}