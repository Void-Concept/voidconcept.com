import { MagicSchool, Spell, SpellAreaOfEffectType, SpellCastTimeType, SpellDurationType, SpellLevel, SpellRangeType } from "@voidconcept/shared"
import { SpellbookDao } from "./SpellbookDao"
import { ChangeEvent, useState } from "react"
import * as R from 'ramda'

type EditSpellComponentProps = {
    spellbookDao: SpellbookDao
    initialSpell?: Spell
}

const emptySpell: Spell = {
    name: "",
    school: MagicSchool.Abjuration,
    level: SpellLevel.Cantrip,
    castTime: {
        duration: undefined,
        type: SpellCastTimeType.Action
    },
    range: {
        distance: undefined,
        range: SpellRangeType.Self
    },
    components: {
        material: undefined,
        somatic: false,
        verbal: false
    },
    concentration: false,
    ritual: false,
    alwaysPrepared: false,
    areaOfEffect: null,
    duration: {
        duration: undefined,
        type: SpellDurationType.Days
    },
    description: [
        ""
    ],
}

const schoolOptions = Object.keys(MagicSchool)

const levelOptions = R.keys(SpellLevel).map(spellLevel => ({
    name: spellLevel.replace("Lvl_", ""),
    value: SpellLevel[spellLevel],
}))

const castTimeOptions = R.keys(SpellCastTimeType).map(castTime => ({
    name: castTime,
    value: SpellCastTimeType[castTime],
}))

const rangeOptions = R.keys(SpellRangeType).map(range => ({
    name: range,
    value: SpellRangeType[range],
}))

const durationOptions = R.keys(SpellDurationType).map(duration => ({
    name: duration,
    value: SpellDurationType[duration],
}))

const shouldShowDurationNumber = (durationType: SpellDurationType): boolean => 
    [SpellDurationType.Round, SpellDurationType.Minutes, SpellDurationType.Hours, SpellDurationType.Days].includes(durationType)

const inputStr = (event: ChangeEvent<HTMLInputElement>): string => event.currentTarget.value

const inputNumber = (event: ChangeEvent<HTMLInputElement>): number => parseInt(event.currentTarget.value)

const inputChecked = (event: ChangeEvent<HTMLInputElement>): boolean => event.currentTarget.checked

const select = (event: ChangeEvent<HTMLSelectElement>): string => event.currentTarget.value

export const EditSpellComponent= ({
    spellbookDao,
    initialSpell,
}: EditSpellComponentProps) => {
    const [spell, setSpell] = useState(initialSpell || emptySpell)

    const onUpdate = 
        <T, S>(lensPath: R.Path, eventHandler: (_: ChangeEvent<T>) => S) => 
            (event: ChangeEvent<T>) => {
                console.log("called")
                const newFieldValue = eventHandler(event)
                const newSpell: Spell = R.set(R.lensPath(lensPath), newFieldValue)(spell)
                setSpell(newSpell)
            }
    const addDescriptionLine = () => {
        const newSpell = R.set(R.lensPath(['description', spell.description.length]), "")(spell)
        setSpell(newSpell)
    }

    const removeDescriptionLine = (index: number) => {
        const newSpell = {
            ...spell,
            description: R.remove(index, 1, spell.description),
        }
        setSpell(newSpell)
    }

    console.log(spell)
    return (
        <div>
            <div>
                <label htmlFor="name">Name: </label>
                <input id="name" value={spell.name} onChange={onUpdate(['name'], inputStr)} />
            </div>

            <div>
                <label htmlFor="school">School: </label>
                <select id="school" value={spell.school} onChange={onUpdate(['school'], select)} >
                    {schoolOptions.map(school =>
                        <option key={school} value={school}>{school}</option>
                    )}
                </select>
            </div>

            <div>
                <label htmlFor="level">Level: </label>
                <select id="level" value={spell.level} onChange={onUpdate(['level'], select)} >
                    {levelOptions.map(option =>
                        <option key={option.value} value={option.value}>{option.name}</option>
                    )}
                </select>
            </div>

            <div>
                <label htmlFor="castTime">Cast Time: </label>
                <select id="castTime" value={spell.castTime.type} onChange={onUpdate(['castTime', 'type'], select)} >
                    {castTimeOptions.map(option =>
                        <option key={option.value} value={option.value}>{option.name}</option>
                    )}
                </select>
            </div>

            <div>
                <label htmlFor="range">Range: </label>
                <select id="range" value={spell.range.range} onChange={onUpdate(['range', 'range'], select)} >
                    {rangeOptions.map(option =>
                        <option key={option.value} value={option.value}>{option.name}</option>
                    )}
                </select>
            </div>

            <div>
                <label htmlFor="verbalComponent">Verbal: </label>
                <input id="verbalComponent" checked={spell.components.verbal} onChange={onUpdate(['components', 'verbal'], inputChecked)} type="checkbox" />
                
                <label htmlFor="somaticComponent">Somatic: </label>
                <input id="somaticComponent" checked={spell.components.somatic} onChange={onUpdate(['components', 'somatic'], inputChecked)} type="checkbox" />
                
                <label htmlFor="materialComponent">Material: </label>
                <input id="materialComponent" onChange={onUpdate(['components', 'material'], inputStr)} />
            </div>

            <div>
                <label htmlFor="concentration">Concentration: </label>
                <input id="concentration" checked={spell.concentration} onChange={onUpdate(['concentration'], inputChecked)} type="checkbox" />

                <label htmlFor="ritual">Ritual: </label>
                <input id="ritual" checked={spell.ritual} onChange={onUpdate(['ritual'], inputChecked)} type="checkbox" />

                <label htmlFor="alwaysPrepared">Always Prepared: </label>
                <input id="alwaysPrepared" checked={spell.alwaysPrepared} onChange={onUpdate(['alwaysPrepared'], inputChecked)} type="checkbox" />
            </div>

            <div>
                <label htmlFor="areaOfEffect">Area of Effect: </label>
                {/* TODO: boolean to show or not */}
                {/* <input id="durationNum" value={spell.duration.duration || 0} onChange={onUpdate(['duration', 'duration'])} type='number' />
                <select id="areaOfEffect" value={spell.duration.type} onChange={onUpdate(['duration', 'type'])} >
                    {durationOptions.map(option =>
                        <option value={option.value}>{option.name}</option>
                    )}
                </select> */}
            </div>

            <div>
                <label htmlFor="duration">Duration: </label>
                {shouldShowDurationNumber(spell.duration.type) && 
                    <input id="durationNum" value={spell.duration.duration || 0} onChange={onUpdate(['duration', 'duration'], inputNumber)} type='number' />
                }
                <select id="duration" value={spell.duration.type} onChange={onUpdate(['duration', 'type'], select)} >
                    {durationOptions.map(option =>
                        <option key={option.value} value={option.value}>{option.name}</option>
                    )}
                </select>
            </div>

            <div>
                <label>Description: </label>
                <button onClick={() => addDescriptionLine()}>Add line</button>
                <ul>
                    {spell.description.map((description, index) =>
                        <li key={index}>
                            <input id={`description[${index}]`} value={description} onChange={onUpdate(['description', index], inputStr)} />
                            <button onClick={() => removeDescriptionLine(index)}>remove</button>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
}