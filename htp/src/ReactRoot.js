import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import "./index.css"
import "./views/Styled.css"
import Login from "./presenters/LoginPresenter"
import MainPage from "./presenters/MainPagePresenter"


const router = createBrowserRouter([
  { path: "/", element: <MainPage /> },
  { path: "/login", element: <Login /> },
])

function ReactRoot() {
  const homeClickCB = () => {
    window.location.href = "/"
  }
  const loginClickCB = () => {
    window.location.href = "/login"
  }


  return (
    <div>
      <div className='flexRow tempNav'>
        <button onClick={homeClickCB}>Home</button>
        <button onClick={loginClickCB}>Login</button>
      </div>


      <RouterProvider router={router} />
    </div>
  );
}
export default ReactRoot