import React, {useState, useEffect} from "react";
import MainPageView from "../views/MainPageView";
import TemplateView from "../views/templateView";
import Model from "../Model";

const MainPage = ({ isLoggedIn, handleLogout }) => {
    const [showTemplates, setShowTemplates] = useState(false);
    const [templates, setTemplates] = useState([]);
    const toggleShowTemplates = () => {
        setShowTemplates(!showTemplates);
    }
    const model = new Model();

    useEffect(() => {
        async function fetchData() {
            await model.getTemplateList()
            setTemplates(model.templates);
            console.log(model.templates)
        }
        fetchData();
    }, []);
    return (
        <div style={{ position: "relative", display: "flex" }}>
            <MainPageView onTemplateClick={toggleShowTemplates}/>
            {showTemplates && <TemplateView onTemplateClick={toggleShowTemplates} defaultTemplates={templates}/>}
        </div>
    )
};

export default MainPage;