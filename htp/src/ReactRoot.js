import { Link, Route, Routes } from "react-router-dom";
import "./index.css";
import "./views/Styled.css";
import Login from "./presenters/LoginPresenter";
import MainPage from "./presenters/MainPagePresenter";
import Sidebar from "./components/Sidebar";
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
            {isLoggedIn ? null : (
                <div className="flexRow tempNav">
                    <Link to="/">Home</Link>
                    <Link to="/login">Login</Link>
                </div>
            )}

            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </div>
    );
}

export default ReactRoot;