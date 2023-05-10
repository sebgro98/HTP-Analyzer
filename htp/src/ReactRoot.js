import { Route, Routes } from "react-router-dom";
import "./index.css";
import "./views/Styled.css";
import Login from "./presenters/LoginPresenter";
import MainPage from "./presenters/MainPagePresenter";
import Sidebar from "./components/Sidebar";
import ProfilePage from "./presenters/ProfilePresenter"
import Forum from "./presenters/ForumPresenter"
import {useState} from "react";
import Model from "./Model";

function ReactRoot() {
    const model = new Model();
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const storedValue = localStorage.getItem("isLoggedIn");
        return storedValue !== null ? JSON.parse(storedValue) : false;
    });

    const handleLogout = () => {
        model.logout()
            .then(() => {
                localStorage.setItem("isLoggedIn", JSON.stringify(false));
                setIsLoggedIn(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div style={{ width: "100%" }}>
            <Sidebar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />

            <Routes>
                <Route path="/forum" element={ <Forum /> } />
                <Route path="/profile" element={ <ProfilePage model={model}/> } />
                <Route path="/" element={<MainPage model={model} />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </div>
    );
}

export default ReactRoot;