import React, {useState, useEffect} from "react";
import MainPageView from "../views/MainPageView";
import TemplateView from "../views/templateView";
import Model from "../Model";

const MainPage = ({ isLoggedIn, handleLogout }) => {
    const [showTemplates, setShowTemplates] = useState(false);
    const [templates, setTemplates] = useState([]);
    const model = new Model();

    useEffect(() => {
        async function fetchData() {
            await model.getGeneralTemplateList()
            setTemplates(model.templates);
        }
        fetchData();
    }, []);

    const toggleShowTemplates = () => {
        setShowTemplates(!showTemplates);
    }

    function changeTemplate(template) {
        model.setCurrentTemplate(template);
    }
    return (
        <div style={{ position: "relative", display: "flex" }}>
            <MainPageView onTemplateClick={toggleShowTemplates}/>
            {showTemplates && <TemplateView
                onTemplateButtonClick={toggleShowTemplates}
                onTemplateClick={changeTemplate}
                defaultTemplates={templates}/>}
        </div>
    )
};

export default MainPage;