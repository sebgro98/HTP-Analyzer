import React from "react";
import MainPageView from "../views/MainPageView";

const MainPage = ({ isLoggedIn, handleLogout }) => {
    return <MainPageView isLoggedIn={isLoggedIn} handleLogout={handleLogout} />;
};

export default MainPage;