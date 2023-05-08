import React, {useState, useEffect} from "react";
import MainPageView from "../views/MainPageView";
import { RecoilRoot } from "recoil";
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

    function toggleShowTemplates() {
        setShowTemplates(!showTemplates);
    }

    function changeTemplate(template) {
        model.setCurrentTemplate(template);
    }

    function createTemplate(event) {
        async function templateCreator() {
            await model.createTemplate(templateData);
        }

        event.preventDefault();
        const data = event.target.elements;

        /*for (let i = 0; i < 7; i++) {
            if (!data[i].value) {
                console.log("Invalid data");
                return;
            }
        }*/

        const templateData = {template: data[0].value, humMin: data[1].value, humMax: data[2].value,
            tempMin: data[3].value, tempMax: data[4].value, presMin: data[5].value, presMax: data[6].value};
        templateCreator();
    }

    return (
        <div style={{ position: "relative", display: "flex" }}>
            <RecoilRoot>
                <MainPageView
                    onTemplateClick={toggleShowTemplates}/>;
            </RecoilRoot>
            {showTemplates && <TemplateView
                onTemplateButtonClick={toggleShowTemplates}
                onTemplateClick={changeTemplate}
                defaultTemplates={templates}
                onSubmitClickButton={createTemplate}/>}
        </div>
    )
};

export default MainPage;