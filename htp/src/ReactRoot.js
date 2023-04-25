import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom";
import "./index.css";
import "./views/Styled.css";
import Login from "./presenters/LoginPresenter";
import MainPage from "./presenters/MainPagePresenter";
import Sidebar from "./components/Sidebar";
import loggedIn from "./loggedIn";
import Display from "./presenters/DisplayPresenter"


const router = createBrowserRouter([
  { path: "/", element: <MainPage /> },
  { path: "/login", element: <Login /> },
  { path: "/display", element: <Display/> },
]);

function ReactRoot() {
  const navigate = useNavigate()
  const homeClickCB = () => {
    window.location.href = "/";
  };
  const loginClickCB = () => {
    navigate('/login');
  };

  const var_loggedIn = loggedIn();

  return (
    <div style={{ width: "100%" }}>
      {var_loggedIn ? (
        <Sidebar />
      ) : (
        <div className="flexRow tempNav">
          <button onClick={homeClickCB}>Home</button>
          <button onClick={loginClickCB}>Login</button>
        </div>
      )}

      <RouterProvider router={router} />
    </div>

  );
}
export default ReactRoot;
