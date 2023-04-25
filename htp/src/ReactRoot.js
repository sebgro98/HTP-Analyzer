import {useNavigate, Link, Route, Routes} from "react-router-dom";
import "./index.css";
import "./views/Styled.css";
import Login from "./presenters/LoginPresenter";
import MainPage from "./presenters/MainPagePresenter";
import Sidebar from "./components/Sidebar";
import loggedIn from "./loggedIn";
import Display from "./presenters/DisplayPresenter";

function ReactRoot() {
    const navigate = useNavigate();
    const homeClickCB = () => {
        navigate("/");
    };
    const loginClickCB = () => {
        navigate("/login");
    };

    const var_loggedIn = loggedIn();

    return (

            <div style={{ width: "100%" }}>
                {var_loggedIn ? (
                    <Sidebar />
                ) : (
                    <div className="flexRow tempNav">
                        <Link to="/">Home</Link>
                        <Link to="/login">Login</Link>
                    </div>
                )}

                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/display" element={<Display />} />
                </Routes>
            </div>
    );
}

export default ReactRoot;
