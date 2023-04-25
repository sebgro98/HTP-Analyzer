import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "./views/Styled.css";
import Login from "./presenters/LoginPresenter";
import MainPage from "./presenters/MainPagePresenter";
import Sidebar from "./components/Sidebar";
import loggedIn from "./loggedIn";
import Display from "./presenters/DisplayPresenter"
import ProfilePage from "./presenters/ProfilePresenter"

const router = createBrowserRouter([
  { path: "/", element: <MainPage /> },
  { path: "/login", element: <Login /> },
  { path: "/display", element: <Display/> },
  { path: "/profile", element: <ProfilePage /> },
]);

function ReactRoot() {
  const homeClickCB = () => {
    window.location.href = "/";
  };
  const loginClickCB = () => {
    window.location.href = "/login";
  };
  const profileClickCB = () => {
    window.location.href = "/profile"
  }

  const var_loggedIn = loggedIn();

  return (
    <div style={{ width: "100%" }}>
      {var_loggedIn ? (
        <Sidebar />
      ) : (
        <div className="flexRow tempNav">
          <button onClick={homeClickCB}>Home</button>
          <button onClick={loginClickCB}>Login</button>
          <button onClick={profileClickCB}>Profile</button>
        </div>
      )}

      <RouterProvider router={router} />
    </div>
  );
}
export default ReactRoot;
