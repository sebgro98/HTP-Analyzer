import React, {useState} from "react";
import MainPageView from "../views/MainPageView";
import TemplateView from "../views/templateView";

const MainPage = ({ isLoggedIn, handleLogout }) => {
    const [showTemplates, setShowTemplates] = useState(false);
    const toggleShowTemplates = () => {
        setShowTemplates(!showTemplates);
    }
    return (
        <div style={{ position: "relative", display: "flex" }}>
            <MainPageView onTemplateClick={toggleShowTemplates}/>
            {showTemplates && <TemplateView onTemplateClick={toggleShowTemplates}/>}
        </div>
    )
};

export default MainPage;