import React, { useMemo } from 'react';
import './citadel.css';
import moment from 'moment-timezone';

const seed = 1617851520000

export const CitadelComponent = () => {
    const seedMoment = moment(seed)
    const now = moment()

    const resetTime = useMemo(() => {
        const seedMoment = moment(seed)
        const now = moment()

        const resetTime = seedMoment
        while (resetTime.isBefore(now)) {
            resetTime.add(7, 'days')
        }

        return resetTime
    }, [seed])


    return (
        <div className="citadel-container">
            <h1>Clan Citadel</h1>
            <span>Next reset: {resetTime.toLocaleString()}</span>
        </div>
    )
}
