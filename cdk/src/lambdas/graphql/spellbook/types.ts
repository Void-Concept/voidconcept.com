const magicSchools = [
    "Abjuration", 
    "Conjuration", 
    "Divination", 
    "Enchantment", 
    "Evocation",
    "Illusion", 
    "Necromancy", 
    "Transmutation"
] as const

type MagicSchool = typeof magicSchools[number]

type SpellComponents = {
    verbal: boolean
    somatic: boolean
    material?: string
}

export type Spell = {
    name: string
    level: number
    school: MagicSchool
    castTime: string
    range: string
    areaOfEffect: string
    components: SpellComponents
    duration: string
    description: string[]
    higherLevel?: string
    concentration: boolean
    ritual: boolean
    alwaysPrepared: boolean
}

export type Spellbook = {
    ownerId: string
    name?: string
    maxPrepared: number
    spells: Spell[]
}