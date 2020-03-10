import React from 'react';
import { match as Match } from 'react-router';
import moment from 'moment-timezone';
import { History } from 'history';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './local.css';

export type LocalTimeComponentParams = {
    epochTime?: string
}

export interface LocalTimeComponentProps {
    match: Match<LocalTimeComponentParams>
    history: History
}

const getEpochTime = (time?: string) => {
    return (time && parseInt(time)) || parseInt(moment().format('x'))
}

export const LocalTimeComponent = ({ match, history }: LocalTimeComponentProps) => {
    const epochTime = getEpochTime(match.params.epochTime)
    const time = moment(epochTime)
    const abbrZone = moment.tz.zone(moment.tz.guess())?.abbr(epochTime)

    return (
        <div>
            <div className="time-local-container">
                <DatePicker
                    selected={time.toDate()}
                    onChange={(newDate) => {
                        if (newDate) {
                            const newEpochTime = newDate.getTime()
                            history.push(`/time/local/${newEpochTime}`)
                        }
                    }}
                    showTimeSelect
                    dateFormat="yyyy-MM-dd hh:mm:SS a"
                />
                <span className="time-local-zone">{abbrZone}</span>
            </div>
        </div>
    );
}