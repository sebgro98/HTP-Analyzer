import React from 'react';
import "./Styled.css";
import closetab from "./images/close-tab.svg";
import temicon from "./images/template-icon.svg"

const templateView = ({onTemplateClick}) => {
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

                    <div className="template-item">
                        <h2>Greenhouse</h2>
                        <h3>Humidity</h3>
                        <h4>Min: 20 Max: 20</h4>
                        <h3>Temperature</h3>
                        <h4>Min: 20 Max: 20</h4>
                        <h3>Pressure</h3>
                        <h4>Min: 20 Max: 20</h4>
                    </div>
                </div>
                <hr/>
            </div>
        </div>
    );
};

export default templateView;