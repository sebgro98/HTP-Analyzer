import React, {useEffect, useState} from "react";
import DateTimeView from "./DateTimeView";
import { DarkModeSwitch } from 'react-toggle-dark-mode';

const MainPageView = (props) => {
    const [theme, setTheme] = useState('light');
    const [darkMode, setDarkMode] = useState(false);
    const toggleTheme = () => {
        if(theme === 'light') {
            setTheme('dark');
            setDarkMode(true);
        } else {
            setTheme('light');
            setDarkMode(false);
        }
    };
    useEffect(() => {
        document.body.className = theme;
    }, [theme]);
    return(
        <div className={`MainPageView ${theme}`}>
            <DarkModeSwitch
                style={{ marginBottom: '2rem' }}
                checked={darkMode}
                onChange={toggleTheme}
                size={50}
                className="button"
            />
            <h1>Main Page</h1>
            <DateTimeView darkMode = {darkMode}/>
        </div>
    );
}

export default MainPageView;