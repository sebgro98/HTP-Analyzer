import React, {useState, useEffect} from "react";
import MainPageView from "../views/MainPageView";
import { RecoilRoot } from "recoil";
import TemplateView from "../views/templateView";
import Model from "../Model";


const MainPage = ({ isLoggedIn, handleLogout }) => {
    const [showTemplates, setShowTemplates] = useState(false);
    const [defaultTemplates, setDefaultTemplates] = useState([]);
    const [userTemplates, serUserTemplates] = useState([]);
    const [createTemplateViewer, setCreateTemplateViewer] = useState(false);
    const model = new Model();

    useEffect(() => {
        async function fetchData() {
            await model.getDefaultTemplateList()
            setDefaultTemplates(model.defaultTemplates);
            await model.getUserTemplateList();
            serUserTemplates(model.userTemplates);
        }
        fetchData();
    }, []);

    function toggleShowTemplates() {
        setShowTemplates(!showTemplates);
    }

    function toggleCreateTemplateViewer() {
        setCreateTemplateViewer(!createTemplateViewer);
    }

    function changeTemplate(template) {
        model.setCurrentTemplate(template);
    }

    function createTemplate(event) {
        async function templateCreator() {
            const disableTemplateCreateViewer = await model.createTemplate(templateData);
            if (disableTemplateCreateViewer) {
                setCreateTemplateViewer(!createTemplateViewer);
                await model.getUserTemplateList();
                serUserTemplates(model.userTemplates);
            }
        }

        event.preventDefault();
        const data = event.target.elements;

        for (let i = 0; i < 7; i++) {
            if (!data[i].value) {
                alert("Please, fill in the format.");
                return;
            }
        }

        const templateData = {
            templateName: data[0].value,
            HumidityMin: Number(data[1].value),
            HumidityMax: Number(data[2].value),
            TempMin: Number(data[3].value),
            TempMax: Number(data[4].value),
            PressureMin: Number(data[5].value),
            PressureMax: Number(data[6].value)
        };
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
                defaultTemplates={defaultTemplates}
                onSubmitClickButton={createTemplate}
                onCreateTemplateButtonClick={toggleCreateTemplateViewer}
                createTemplateViewer = {createTemplateViewer}
                userTemplates = {userTemplates}/>}
        </div>
    )
};

export default MainPage;