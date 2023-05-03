import React, {useState, useEffect} from "react";
import "./Styled.css";
import closetab from "./images/close-tab.svg";
import temicon from "./images/template-icon.svg"

const TemplateView = ({onTemplateClick, defaultTemplates}) => {

    useEffect(() => {
        console.log(defaultTemplates)
    })

    const items = [];

    function test() {
        console.log(defaultTemplates);
    }

    return (
        <div className="template-root">
            <div className="template-background"></div>
            <div className="template-main">
                <div className="close-tab">
                    <img src={closetab} onClick={onTemplateClick}/>
                </div>
                <div className="template-header">
                    <img src={temicon}/>
                    <h1>Templates</h1>
                </div>
                <hr/>
                <div className="template-section">
                    {Object.keys(defaultTemplates).length !== 0 && defaultTemplates.map((template, index) => (
                        <div className="template-item" key={index}>
                            <h2>{template.id}</h2>
                            <h3>Humidity</h3>
                            <h4>Min: {template.HumidtyMin} Max: {template.HumidityMax}</h4>
                            <h3>Temperature</h3>
                            <h4>Min: {template.TempMin} Max: {template.TempMax}</h4>
                            <h3>Pressure</h3>
                            <h4>Min: {template.PressureMin} Max: {template.PressureMax}</h4>
                        </div>
                    ))}
                </div>
                <hr/>
            </div>
        </div>
    );
};

export default TemplateView;