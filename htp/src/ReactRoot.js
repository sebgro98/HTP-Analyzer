import {Link, Route, Routes} from "react-router-dom";
import "./index.css";
import "./views/Styled.css";
import Login from "./presenters/LoginPresenter";
import MainPage from "./presenters/MainPagePresenter";
import Sidebar from "./components/Sidebar";
import loggedIn from "./loggedIn";

function ReactRoot() {
    const var_loggedIn = loggedIn();

    return (

        <div style={{width: "100%"}}>
            {var_loggedIn ? (
                <Sidebar/>
            ) : (
                <div className="flexRow tempNav">
                    <Link to="/">Home</Link>
                    <Link to="/login">Login</Link>
                </div>
            )}

            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </div>
    );
}

export default ReactRoot;
