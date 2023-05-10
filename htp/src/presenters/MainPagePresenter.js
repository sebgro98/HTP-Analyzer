import React, {useState, useEffect} from "react";
import MainPageView from "../views/MainPageView";
import { RecoilRoot } from "recoil";
import TemplateView from "../views/templateView";


const MainPage = ({model}) => {
    const [showTemplates, setShowTemplates] = useState(false);
    const [defaultTemplates, setDefaultTemplates] = useState([]);
    const [userTemplates, setUserTemplates] = useState([]);
    const [currentTemplate, setCurrentTemplate] = useState([]);
    const [createTemplateViewer, setCreateTemplateViewer] = useState(false);

    useEffect(() => {
        async function fetchData() {
            await model.getTemplates()
            setDefaultTemplates(model.defaultTemplates);
            setUserTemplates(model.userTemplates);
            setCurrentTemplate(model.currentTemplate)
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
        async function setChangedTemplate() {
            await model.setCurrentTemplate(template);
            setCurrentTemplate(model.currentTemplate);
        }
        setChangedTemplate();
    }

    function createTemplate(event) {
        async function templateCreator() {
            const disableTemplateCreateViewer = await model.createTemplate(templateData);
            if (disableTemplateCreateViewer) {
                setCreateTemplateViewer(!createTemplateViewer);
                await model.getUserTemplateList();
                setUserTemplates(model.userTemplates);
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
                    onTemplateClick={toggleShowTemplates}
                    model={model}
                />;
            </RecoilRoot>
            {showTemplates && <TemplateView
                onTemplateButtonClick={toggleShowTemplates}
                onTemplateClick={changeTemplate}
                defaultTemplates={defaultTemplates}
                onSubmitClickButton={createTemplate}
                onCreateTemplateButtonClick={toggleCreateTemplateViewer}
                createTemplateViewer = {createTemplateViewer}
                userTemplates = {userTemplates}
                currentTemplate = {currentTemplate}
            />}

        </div>
    )
};

export default MainPage;