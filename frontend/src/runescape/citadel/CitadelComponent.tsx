import React, { useEffect, useMemo, useState } from 'react';
import './citadel.css';
import moment, { Moment } from 'moment-timezone';

const seed = 1622251625000

export const CitadelComponent = () => {

    const [resetTime, setResetTime] = useState(calculateResetTime());
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(resetTime));

    useEffect(() => {
        if (moment().isAfter(resetTime)) {
            setResetTime(calculateResetTime())
        }

        setTimeout(() => {
            setTimeLeft(calculateTimeLeft(resetTime))
        }, 1000)
    }, [resetTime, timeLeft])

    return (
        <div className="citadel-container">
            <h1>Clan Citadel</h1>
            <div>Next reset: {resetTime.toLocaleString()}</div>
            <div>Next reset in: {timeLeft.days} days, {timeLeft.hours} hours, {timeLeft.minutes} minutes, {timeLeft.seconds} second</div>
        </div>
    )
}

const calculateTimeLeft = (resetTime: Moment) => {
    const now = moment()
    const timeTilReset = resetTime.diff(now)

    return {
        days: Math.floor(timeTilReset / (1000 * 60 * 60 * 24)),
        hours: Math.floor((timeTilReset / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((timeTilReset / (1000 * 60)) % 60),
        seconds: Math.floor((timeTilReset / 1000) % 60)
    }
}

const calculateResetTime = () => {
    const seedMoment = moment(seed)
    const now = moment()

    const resetTime = seedMoment
    while (resetTime.isBefore(now)) {
        resetTime.add(7, 'days')
    }

    return resetTime
}