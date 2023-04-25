import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from "react-dom/client"; // updated import
import './index.css';
import reportWebVitals from './reportWebVitals';
import ReactRoot from './ReactRoot';
import  AuthProvider  from './Auth';
import Model from "./Model";
import {Router} from "react-router-dom";
const model = new Model();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
    <React.StrictMode>
        <AuthProvider model={model}>
            <ReactRoot />
        </AuthProvider>
    </React.StrictMode>,
    </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
