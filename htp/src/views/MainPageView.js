import React, { useEffect, useState } from "react";
import DateTimeView from "./DateTimeView";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import DisplayPresenter from "../presenters/DisplayPresenter";
import { FaBell } from "react-icons/fa";
import "./Styled.css";
import NotificationPresenter from "../presenters/NotificationPresenter";

import { atom, useRecoilState} from "recoil";

export const darkModeAtom = atom({
  key: "darkMode",
  default: false
})

const MainPageView = () => {
  const [darkMode, setDarkMode] = useRecoilState(darkModeAtom);

  const [theme, setTheme] = useState("light");

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
      <h1 className="header-title"><div style={{ color: "#499BDA"}}>HTP-Analyzer</div><DateTimeView darkMode={darkMode} /></h1>
        <div className="header-icons">
          <NotificationPresenter/>
          <DarkModeSwitch
            checked={darkMode}
            onChange={toggleTheme}
            size={50}
            className="dark-mode-switch"
          />
        </div>
      </header>
        <div className="display-container">
          <DisplayPresenter/>
        </div>
    </div>
  );
};

export default MainPageView;
