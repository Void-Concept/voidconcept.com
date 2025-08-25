import React, { useState } from 'react';
import "./spell.css";
import CameraTimerIcon from "mdi-react/CameraTimerIcon";
import BullseyeArrowIcon from "mdi-react/BullseyeArrowIcon";
import TimerSandIcon from "mdi-react/TimerSandIcon";
import FlaskOutlineIcon from "mdi-react/FlaskOutlineIcon";
import ThoughtBubbleIcon from "mdi-react/ThoughtBubbleIcon";
import BookOpenPageVariantIcon from "mdi-react/BookOpenPageVariantIcon";
import { Spell, SpellCastTime, SpellCastTimeType, SpellComponents, SpellDuration, SpellDurationType, SpellRange, SpellRangeType, SpellLevel } from '@voidconcept/shared';

interface SpellComponentProps {
    spell: Spell

    prepared?: boolean
    onPrepare?: (spell: Spell) => void

    concentrating?: boolean
    onConcentrate?: (spell: Spell) => void
}

interface ConcentrationIconProps {
    className?: string
    size?: number | string
}

const ConcentrationIcon = ({ size, className }: ConcentrationIconProps) => {
    return (
        <div className={className} title="Concentration">
            <ThoughtBubbleIcon size={size} />
        </div>
    );
}

interface RitualIconProps {
    className?: string
    size?: number | string
}

const RitualIcon = ({ size, className }: RitualIconProps) => {
    return (
        <div className={className} title="Ritual">
            <BookOpenPageVariantIcon size={size} />
        </div>
    );
}

const renderCastTime = (castTime: SpellCastTime): string => {
    switch (castTime.type) {
        case SpellCastTimeType.Action:
            return "1 Action"
        case SpellCastTimeType.BonusAction:
            return "1 Bonus Action"
        case SpellCastTimeType.Reaction:
            return "1 Reaction"
        case SpellCastTimeType.Hours:
            return `${castTime.duration} Hour(s)`
        case SpellCastTimeType.Minutes:
            return `${castTime.duration} Minute(s)`
    }
}

const renderRange = (range: SpellRange): string => {
    switch (range.range) {
        case SpellRangeType.Self:
            return "Self"
        case SpellRangeType.Touch:
            return "Touch"
        case SpellRangeType.Feet:
            return `${range.distance} Feet`
        case SpellRangeType.Unlimited:
            return "Unlimited"
    }
}

const renderComponents = (components: SpellComponents): string => {
    return [
        components.verbal ? "V" : null,
        components.somatic ? "S" : null,
        !!components.material ? "M" : null,
    ]
    .filter(c => c !== null)
    .join(",")
}

const renderDuration = (duration: SpellDuration): string => {
    switch (duration.type) {
        case SpellDurationType.Instantaneous:
            return "Instantaneous"
        case SpellDurationType.Round:
            return `${duration.duration} Round(s)`
        case SpellDurationType.Minutes:
            return `${duration.duration} Minute(s)`
        case SpellDurationType.Hours:
            return `${duration.duration} Hour(s)`
        case SpellDurationType.Days:
            return `${duration.duration} Day(s)`
        case SpellDurationType.Special:
            return "Special"
        case SpellDurationType.UntilDispelled:
            return "Until Dispelled"
        case SpellDurationType.UntilDispelledOrTriggered:
            return "Until Dispelled Or Triggered"
    }
}

export const renderLevel = (level: SpellLevel): string => {
    switch (level) {
        case SpellLevel.Cantrip:
            return "Cantrip"
        case SpellLevel.Lvl_1st:
            return "1st"
        case SpellLevel.Lvl_2nd:
            return "2nd"
        case SpellLevel.Lvl_3rd:
            return "3rd"
        case SpellLevel.Lvl_4th:
            return "4th"
        case SpellLevel.Lvl_5th:
            return "5th"
        case SpellLevel.Lvl_6th:
            return "6th"
        case SpellLevel.Lvl_7th:
            return "7th"
        case SpellLevel.Lvl_8th:
            return "8th"
        case SpellLevel.Lvl_9th:
            return "9th"
    }
}

export const SpellComponent = ({ spell, prepared, concentrating, onPrepare, onConcentrate }: SpellComponentProps) => {
    const infoIconSize = "16px";
    const statsIconSize = "16px";

    const [showDescription, setShowDescription] = useState(false);

    const onSpellClick = () => {
        setShowDescription(!showDescription);
    }

    return (
        <div>
            <div className="spell" onClick={onSpellClick}>
                <div className="spell-info">
                    <span className="spell-name">{spell.name}</span>
                    <span className="spell-school">{spell.school}</span>
                    <span className="spell-level">
                        {spell.concentration ? <ConcentrationIcon size={infoIconSize} className="spell-info-icon" /> : null}
                        {spell.ritual ? <RitualIcon size={infoIconSize} className="spell-info-icon" /> : null}
                        {renderLevel(spell.level)}
                    </span>
                </div>
                <hr />
                <div className="spell-stats">
                    <span className="spell-cast-time">
                        <CameraTimerIcon size={statsIconSize} className="spell-stats-icon" />
                        {renderCastTime(spell.castTime)}
                    </span>
                    <span className="spell-range">
                        <BullseyeArrowIcon size={statsIconSize} className="spell-stats-icon" />
                        {renderRange(spell.range)}
                    </span>
                    <span className="spell-components">
                        <FlaskOutlineIcon size={statsIconSize} className="spell-stats-icon" />
                        {renderComponents(spell.components)}
                    </span>
                    <span className="spell-duration">
                        <TimerSandIcon size={statsIconSize} className="spell-stats-icon" />
                        {renderDuration(spell.duration)}
                    </span>
                </div>
                {showDescription &&
                    <div className="spell-description-container" onClick={preventClick}>
                        {spell.components.material && <>
                            <hr />
                            Material cost: {spell.components.material}
                        </>}
                        <hr />
                        <SpellDescription description={(spell.description)} />
                        {spell.higherLevel && <>
                            <hr />
                            <div>
                                {spell.higherLevel}
                            </div>
                        </>}
                    </div>
                }
            </div>
            <div className="spell-buttons">
                <button className={`spell-button ${prepared && "spell-button-prepared"}`}
                    onClick={() => {
                        onPrepare && onPrepare(spell);
                    }}>
                    Prepare
                </button>
                {spell.concentration && (
                    <button className={`spell-button ${concentrating && "spell-button-concentrating"}`}
                        onClick={() => {
                            onConcentrate && onConcentrate(spell)
                        }}>
                        Concentration
                    </button>
                )}
            </div>
        </div>
    );
};

const SpellDescription = ({ description }: { description: string[] }) => {
    return <div className="spell-description">
        {description.map((desc, index) => {
            return (
                <div key={index} className="spell-description-line">{desc}</div>
            );
        })}
    </div>
}

const preventClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();
}