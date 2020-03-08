import React, { useReducer, Dispatch } from 'react';
import { SpellComponent } from './SpellComponent';
import * as R from 'ramda';
import "./spellbook.css";
import { spells, MAX_PREPARED, Spell } from './Spellbook';

const localStorageSpellbook: SpellbookSpell[] = JSON.parse(localStorage.getItem("spellbook") || "") || []

const initialSpellbookSpells: SpellbookSpell[] = spells
    .map(spell => {
        const localStorageSpell = localStorageSpellbook.find(lsSpell => {
            return R.equals(lsSpell.spell, spell);
        })
        return {
            spell: spell,
            prepared: spell.level === "Cantrip" || !!(localStorageSpell && localStorageSpell.prepared) || !!spell.alwaysPrepared,
            concentrating: !!(localStorageSpell && localStorageSpell.concentrating)
        }
    })

interface SpellsProps {
    spells: SpellbookSpell[]
    onChange: Dispatch<SpellbookReducerAction>
}

const Spells = ({ spells, onChange }: SpellsProps) => {
    return (
        <>
            {spells.map((spell, index) => {
                return <SpellComponent key={index}
                    spell={spell.spell}
                    concentrating={spell.concentrating}
                    onConcentrate={() => {
                        onChange({ action: "concentrate", spell: spell.spell })
                    }}
                    prepared={spell.prepared}
                    onPrepare={() => {
                        onChange({ action: "prepare", spell: spell.spell })
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

interface SpellbookReducerAction {
    action: "prepare" | "concentrate"
    spell: Spell
}

const spellReducer = (spellbook: SpellbookSpell[], action: SpellbookReducerAction): SpellbookSpell[] => {
    const canPrepareNewSpell = (spellbook: SpellbookSpell[]): boolean => {
        const currentlyPrepared = spellbook.filter(spell => {
            return spell.prepared && spell.spell.level !== "Cantrip" && !spell.spell.alwaysPrepared;
        }).length;

        return currentlyPrepared < MAX_PREPARED;
    }

    const index = spellbook.findIndex(spell => {
        return spell.spell === action.spell
    });

    const affectedSpell = index > -1 && spellbook[index]
    if (!affectedSpell) {
        return spellbook;
    }

    switch (action.action) {
        case "prepare":
            const willBePrepared = !spellbook[index].prepared
            const notAlwaysPrepared = spellbook[index].spell.level !== "Cantrip" && !spellbook[index].spell.alwaysPrepared;
            if (notAlwaysPrepared && (!willBePrepared || canPrepareNewSpell(spellbook))) {
                return [
                    ...spellbook.slice(0, index),
                    {
                        ...spellbook[index],
                        prepared: willBePrepared
                    },
                    ...spellbook.slice(index + 1),
                ];
            } else {
                return spellbook;
            }
        case "concentrate":
            const isAlreadyConcentrating = !!spellbook.find(spell => {
                return spell.concentrating;
            });
            const willBeConcentrating = !spellbook[index].concentrating;
            if (!willBeConcentrating || !isAlreadyConcentrating) {
                return [
                    ...spellbook.slice(0, index),
                    {
                        ...spellbook[index],
                        concentrating: willBeConcentrating
                    },
                    ...spellbook.slice(index + 1),
                ];
            } else {
                return spellbook;
            }

        default:
            return spellbook;
    }
}

const localStorageWrapper = <S, A>(reducer: (state: S, action: A) => S): (spellbook: S, action: A) => S => {
    return (spellbook: S, action: A) => {
        const newState = reducer(spellbook, action);
        localStorage.setItem("spellbook", JSON.stringify(newState));
        return newState;
    }
}

export const SpellbookComponent = () => {
    const [spells, dispatch] = useReducer(localStorageWrapper(spellReducer), initialSpellbookSpells);

    const spellsByLevel = R.groupBy((spell: SpellbookSpell) => {
        return spell.spell.level
    })(spells)

    return (
        <div className="spellbook-container">
            {R.values(R.mapObjIndexed((spellbookSpell: SpellbookSpell[], level: string) => (
                <div key={level}>
                    <h1>{level}</h1>
                    <div className="spellbook">
                        <Spells spells={spellbookSpell} onChange={dispatch} />
                    </div>
                </div>
            ))(spellsByLevel))}
        </div>
    )
}
