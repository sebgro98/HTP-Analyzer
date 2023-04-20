import React, { useState, useEffect } from 'react'

export const DateTimeView = ({darkMode}) => {
    var [date, setDate] = useState(new Date());

    useEffect(() => {
        var timer = setInterval(() => setDate(new Date()), 1000)
        return function cleanup() {
            clearInterval(timer)
        }
    });

    const dateFormat = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    })
    
    return(
        <div className={darkMode ? 'timeDateDark' : 'timeDateLight'}>
                <p>{date.toLocaleTimeString()}</p>
                <p>{dateFormat.format(date)}</p>
        </div>
    )
}

export default DateTimeView;