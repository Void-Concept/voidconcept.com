import React from 'react';
import { useRouteMatch, useHistory } from 'react-router';
import moment from 'moment-timezone';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './local.css';

export type LocalTimeComponentParams = {
    epochTime?: string
}

const getEpochTime = (time?: string) => {
    return (time && parseInt(time)) || parseInt(moment().startOf("minute").format('x'))
}

export const LocalTimeComponent = () => {
    const match = useRouteMatch<LocalTimeComponentParams>();
    const history = useHistory();
    const epochTime = getEpochTime(match.params.epochTime)
    const time = moment(epochTime)
    const abbrZone = moment.tz.zone(moment.tz.guess())?.abbr(epochTime)
    const zoneOffset = time.utcOffset() / 60
    
    const discordHelperTimes = [
        [`<t:${epochTime / 1000}:d>`, time.format("MM/DD/YYYY")],
        [`<t:${epochTime / 1000}:f>`, time.format("MMMM DD, YYYY h:mm A")],
        [`<t:${epochTime / 1000}:t>`, time.format("h:mm A")],
        [`<t:${epochTime / 1000}:D>`, time.format("MMMM DD, YYYY")],
        [`<t:${epochTime / 1000}:F>`, time.format("dddd, MMMM DD, YYYY h:mm A")],
        [`<t:${epochTime / 1000}:T>`, time.format("h:mm:ss A")],
        [`<t:${epochTime / 1000}:R>`, time.fromNow()],
    ]

    return (
        <div className="time-local-container">
            <div>
                <div className="time-local-date-picker">
                    <DatePicker
                        selected={time.toDate()}
                        onChange={(newDate) => {
                            if (newDate) {
                                const newEpochTime = newDate.valueOf()
                                history.push(`/time/local/${newEpochTime}`)
                            }
                        }}
                        showTimeSelect
                        dateFormat="yyyy-MM-dd hh:mm:SS a"
                    />
                </div>
                <span className="time-local-zone">{abbrZone}</span>
            </div>
            <ul>
                {discordHelperTimes.map((time, index) => 
                    <li className="time-local-zone" key={index}>
                        {time[0]} - {time[1]}
                    </li>
                )}
            </ul>
        </div>
    );
}
