import React from "react";
import MainPageView from "../views/MainPageView";
import { RecoilRoot } from "recoil";

const MainPage = ({ isLoggedIn, handleLogout }) => {
    return (
        <RecoilRoot>
            <MainPageView isLoggedIn={isLoggedIn} handleLogout={handleLogout} />;
        </RecoilRoot>
    )
    
};

export default MainPage;