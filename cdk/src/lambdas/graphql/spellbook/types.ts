import { Spell, Spellbook } from "@voidconcept/shared"
import { CombinedStorageKey, CombinedStorageReadResponse } from "../../combinedStorage/combinedStorageClient"

export type SpellbookOwnerStorageLine = CombinedStorageKey & Pick<Spellbook, 'ownerId'>

export const isSpellbookOwnerStorageLine = 
    (line: CombinedStorageReadResponse): line is SpellbookOwnerStorageLine => !!line.ownerId

export type SpellbookAttributesLine = CombinedStorageKey & Pick<Spellbook, 'maxPrepared' | 'name'>

export const isSpellbookAttributesLine = 
    (line: CombinedStorageReadResponse): line is SpellbookAttributesLine => !!line.maxPrepared

export type SpellbookSpellLine = CombinedStorageKey & Spell

export const isSpellbookSpellLine = 
    (line: CombinedStorageReadResponse): line is SpellbookSpellLine => !!line.name && !!line.school
