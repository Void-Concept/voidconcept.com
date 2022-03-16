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
        [`<t:${epochTime}:d>`, time.format("MM/DD/YYYY")],
        [`<t:${epochTime}:f>`, time.format("MMMM DD, YYYY H:mm A")],
        [`<t:${epochTime}:t>`, time.format("H:mm A")],
        [`<t:${epochTime}:D>`, time.format("MMMM DD, YYYY")],
        [`<t:${epochTime}:F>`, time.format("dddd, MMMM DD, YYYY H:mm A")],
        [`<t:${epochTime}:T>`, time.format("H:mm:ss A")],
        [`<t:${epochTime}:R>`, time.fromNow()],
    ]

    return (
        <div className="time-local-container">
            <div>
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
                <span className="time-local-zone">{abbrZone}</span>
                {/* <input type="number" value={zoneOffset}/> */}
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
