import React, { useReducer, Dispatch, useState } from 'react';
import { renderLevel, SpellComponent } from './SpellComponent';
import * as R from 'ramda';
import "./spellbook.css";
import {Spell, Spellbook} from '@voidconcept/shared'
import { useAsyncEffect } from '../../hooks';
import { SpellbookDao } from './SpellbookDao';

interface SpellsProps {
    spells: SpellbookSpell[]
    onConcentrate: (_: Spell) => void
    onPrepare: (_: Spell) => void
}

const Spells = ({ spells, onConcentrate, onPrepare }: SpellsProps) => {
    return (
        <>
            {spells.map((spell, index) => {
                return <SpellComponent key={index}
                    spell={spell.spell}
                    concentrating={spell.concentrating}
                    onConcentrate={() => {
                        onConcentrate(spell.spell)
                    }}
                    prepared={spell.prepared}
                    onPrepare={() => {
                        onPrepare(spell.spell)
                    }} />;
            })}
        </>
    )
}

interface SpellbookSpell {
    spell: Spell
    prepared: boolean
    concentrating: boolean
}

type SpellbookComponentProps = {
    spellbookDao: SpellbookDao
}
export const SpellbookComponent = ({spellbookDao}: SpellbookComponentProps) => {
    const [spellbook, setSpellbook] = useState<Spellbook | null>(null)
    const [errors, setErrors] = useState<string | null>(null)

    useAsyncEffect(async () => {
        try {
            const spellbook = await spellbookDao.get("f43a6844-6248-43c1-88e2-9e55828c7e70") //TODO: don't hard-code this spellbook
            setSpellbook(spellbook)
        } catch (e) {
            if (e instanceof Error) {
                setErrors(e.message)
            } else {
                setErrors("Unknown error occurred")
            }
        }
    }, [])

    if (!!errors) {
        return <span>Error: {errors}</span>
    }
    if (!spellbook) {
        return <span>Loading...</span>
    }

    const spellbookSpells: SpellbookSpell[] = spellbook.spells.map(spell => ({
        spell,
        prepared: false,
        concentrating: false,
    }))

    const spellsByLevel = R.groupBy((spell: SpellbookSpell) => {
        return renderLevel(spell.spell.level)
    })(spellbookSpells)

    return (
        <div className="spellbook-container">
            {R.values(R.mapObjIndexed((spellbookSpell: SpellbookSpell[], level: string) => (
                <div key={level}>
                    <h1>{level}</h1>
                    <div className="spellbook">
                        <Spells spells={spellbookSpell} onConcentrate={() => {}} onPrepare={() => {}} />
                    </div>
                </div>
            ))(spellsByLevel))}
        </div>
    )
}
