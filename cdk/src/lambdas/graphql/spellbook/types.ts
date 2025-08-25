import { Spell, Spellbook } from "@voidconcept/shared"
import { CombinedStorageKey, CombinedStorageReadResponse } from "../../combinedStorage/combinedStorageClient"

export const spellbookOwnerStorageLineSortKey = "owner"

export type SpellbookOwnerStorageLine = CombinedStorageKey & Pick<Spellbook, 'ownerId'> & {
    sortKey: typeof spellbookOwnerStorageLineSortKey
}

export const isSpellbookOwnerStorageLine = 
    (line: CombinedStorageReadResponse): line is SpellbookOwnerStorageLine => line.sortKey === spellbookOwnerStorageLineSortKey

export const spellbookAttributeStorageLineSortKey = "attributes"

export type SpellbookAttributesLine = CombinedStorageKey & Pick<Spellbook, 'maxPrepared' | 'name'> & {
    sortKey: typeof spellbookAttributeStorageLineSortKey
}

export const isSpellbookAttributesLine = 
    (line: CombinedStorageReadResponse): line is SpellbookAttributesLine => line.sortKey === spellbookAttributeStorageLineSortKey

export type SpellbookSpellLinePartitonKey = `spell#${number}`

export type SpellbookSpellLine = CombinedStorageKey & Spell & {
    sortKey: SpellbookSpellLinePartitonKey
}

export const isSpellbookSpellLine = 
    (line: CombinedStorageReadResponse): line is SpellbookSpellLine => line.sortKey.startsWith("spell#")
