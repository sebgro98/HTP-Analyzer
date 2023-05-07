import React, { useState, useEffect } from 'react'
import { darkModeAtom } from '../views/MainPageView';
import { useRecoilState } from 'recoil';

export const DateTimeView = () => {
    const [darkMode] = useRecoilState(darkModeAtom);

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
                <div>{date.toLocaleTimeString()}</div>
                <div>{dateFormat.format(date)}</div>
        </div>
    )
}

export default DateTimeView;