import "./Styled.css";
import "./StyledTemplate.css"
import closetab from "./images/close-tab.svg";
import temicon from "./images/template-icon.svg"

const TemplateView = ({onTemplateButtonClick, onTemplateClick, defaultTemplates, onSubmitClickButton, onCreateTemplateButtonClick, createTemplateViewer, userTemplates, currentTemplate}) => {
    return (
        <div className="template-root">
            <div className="template-background"></div>
            {!createTemplateViewer && <div className="template-main">
                    <div className="close-tab">
                        <img src={closetab} onClick={onTemplateButtonClick}/>
                    </div>
                    <div className="template-header">
                        <img src={temicon}/>
                        <h1>Templates</h1>
                    </div>
                    <hr/>
                    <h5>Your Templates</h5>
                    <div className="template-section">
                        <div className="template-item" onClick={onCreateTemplateButtonClick}>
                            <h2>Create Template</h2>
                            <h6>+</h6>
                        </div>
                        {Object.keys(userTemplates).length !== 0 && Object.entries(userTemplates).map(([key, template]) => (
                            <div className={template.templateName === currentTemplate.templateName ? "current-item" : "template-item"} key={key} onClick={() => onTemplateClick(template)}>
                            <h2>{template.templateName}</h2>
                            <h3>Humidity</h3>
                            <h4>Min: {template.HumidityMin} Max: {template.HumidityMax}</h4>
                            <h3>Temperature</h3>
                            <h4>Min: {template.TempMin} Max: {template.TempMax}</h4>
                            <h3>Pressure</h3>
                            <h4>Min: {template.PressureMin} Max: {template.PressureMax}</h4>
                            </div>
                        ))}
                    </div>
                    <hr/>
                    <h5>Default Templates</h5>
                    <div className="template-section">
                       {Object.keys(defaultTemplates).length !== 0 && defaultTemplates.map((template, index) => (
                            <div className={template.templateName === currentTemplate.templateName ? "current-item" : "template-item"} key={index} onClick={() => onTemplateClick(template)}>
                                <h2>{template.templateName}</h2>
                                <h3>Humidity</h3>
                                <h4>Min: {template.HumidityMin} Max: {template.HumidityMax}</h4>
                                <h3>Temperature</h3>
                                <h4>Min: {template.TempMin} Max: {template.TempMax}</h4>
                                <h3>Pressure</h3>
                                <h4>Min: {template.PressureMin} Max: {template.PressureMax}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            }
            {createTemplateViewer && <div className="template-create">
                <div className="close-tab">
                    <img src={closetab} onClick={onCreateTemplateButtonClick}/>
                </div>
                <h2>Create Template</h2>
                <form onSubmit={onSubmitClickButton}>
                    <h3>Template Name</h3>
                    <input type="text" />
                    <h4>Humidity</h4>
                    <h5>Min: </h5><input type="text" on/> <h5>Max: </h5><input type="text"/>
                    <h4>Temperature</h4>
                    <h5>Min: </h5><input type="text"/> <h5>Max: </h5><input type="text"/>
                    <h4>Pressure</h4>
                    <h5>Min: </h5><input type="text"/> <h5>Max: </h5><input type="text"/>
                    <button type="submit">Create template</button>
                </form>
            </div>
            }
        </div>
    );
};

export default TemplateView;