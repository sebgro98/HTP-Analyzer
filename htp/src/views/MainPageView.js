import React, { useEffect, useState } from "react";
import DateTimeView from "./DateTimeView";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import DisplayPresenter from "../presenters/DisplayPresenter";
import { FaBell } from "react-icons/fa";
import "./Styled.css";
import temicon from "./images/template-icon.svg"

const MainPageView = ({onTemplateClick}) => {
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
      <header className="header">
      <h1 className="header-title">HTP-Analyzer <DateTimeView darkMode={darkMode} /></h1>
        <div className="header-icons">
          <div onClick={onTemplateClick} className="template-icon">
            <img src={temicon} width="40"/>
            <h2>Templates</h2>
          </div>
          <FaBell className="fa-bell" />
          <DarkModeSwitch
            checked={darkMode}
            onChange={toggleTheme}
            size={50}
            className="dark-mode-switch"
          />
        </div>
      </header>
      <div className="main-grid">
        <div className="display-container">
          <DisplayPresenter darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
};

export default MainPageView;
