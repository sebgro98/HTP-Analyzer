import React, { useEffect, useState } from "react";
import DateTimeView from "./DateTimeView";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import DisplayView from "./DisplayView";
import DisplayPresenter from "../presenters/DisplayPresenter";
import LogoutButton from "./LogoutView";

const MainPageView = ({ isLoggedIn, handleLogout }) => {
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
            {isLoggedIn && <LogoutButton handleLogout={handleLogout} />}
            <DarkModeSwitch
                style={{ marginBottom: "2rem" }}
                checked={darkMode}
                onChange={toggleTheme}
                size={50}
                className="button"
            />
            <h1>Main Page</h1>
            <DateTimeView darkMode={darkMode} />
            <DisplayPresenter darkMode={darkMode} />
            {isLoggedIn && (
                <button className="logout-button" onClick={handleLogout}>
                    Logout
                </button>
            )}
        </div>
    );
};

export default MainPageView;