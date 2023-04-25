import React, { useEffect, useState } from "react";
import DateTimeView from "./DateTimeView";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import DisplayPresenter from "../presenters/DisplayPresenter";

const MainPageView = () => {
    const [theme, setTheme] = useState("light");
    const [darkMode, setDarkMode] = useState(false);
    const toggleTheme = () => {
        if (theme === "light") {
            setTheme("dark");
            setDarkMode(true);
        } else {
            setTheme("light");
            setDarkMode(false);
        }
    };
    useEffect(() => {
        document.body.className = theme;
    }, [theme]);
    return (
        <div className={`MainPageView ${theme}`}>
            <DarkModeSwitch
                style={{ marginBottom: "2rem" }}
                checked={darkMode}
                onChange={toggleTheme}
                size={50}
                className="button"
            />
            <DateTimeView darkMode={darkMode} />
            <DisplayPresenter darkMode={darkMode} />

            )}
        </div>
    );
};

export default MainPageView;