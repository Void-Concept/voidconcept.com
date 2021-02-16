import React from 'react';
import { useState, useEffect } from 'react';

type Quest = {
    title: string
    status: string
    difficulty: number
    members: boolean
    userEligible: boolean
    questPoints: number
}

export const QuestsComponent = () => {
    const [quests, setQuests] = useState<Quest[]>([]);
    useEffect(() => {
        const doFetch = async () => {
            const response = await fetch("https://apps.runescape.com/runemetrics/quests?user=void_cosmos", {
                mode: "cors"
            })
            const questList: Quest[] = await response.json()
            setQuests(questList)
        }
        doFetch().catch(console.error)
    })

    return (
        <div>
            {JSON.stringify(quests)}
        </div>
    );
}