import React from "react";
import MainPageView from "../views/MainPageView";
import templateView from "../views/templateView";

const MainPage = ({ isLoggedIn, handleLogout }) => {
    return (
        <div>
            <templateView/>
            <MainPageView isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>
        </div>
    )
};

export default MainPage;