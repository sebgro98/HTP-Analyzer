import { StyledEngineProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import NotificationView from "../views/NotificationView";import Stack from '@mui/material/Stack';
import Spinner from 'react-bootstrap/Spinner';
import { dataAtom } from "./DisplayPresenter";
import { useRecoilState } from 'recoil';

const types = ["success", "info", "warning", "error"];

function NotificationPresenter() {
    const [data] = useRecoilState(dataAtom);

  return (
    <div className="DisplayPresenter">
        {data ? (
            <StyledEngineProvider injectFirst>
                <NotificationView data = {data}/>
                <ToastContainer position="bottom-right" newestOnTop />
          </StyledEngineProvider>
        ) : (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: "30px", marginTop: "-40px" }}>
                <Spinner animation="grow" variant="dark" size="large"/>
            </div>
        )}
    </div>
);
  
}

export default NotificationPresenter;