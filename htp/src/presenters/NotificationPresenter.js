import { useState, useEffect } from "react";
import Model from "../Model";
import { db } from '../firebaseModel';
import { doc, onSnapshot } from "firebase/firestore";
import { StyledEngineProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import NotificationView from "../views/NotificationView";import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Spinner from 'react-bootstrap/Spinner';

const types = ["success", "info", "warning", "error"];

function NotificationPresenter() {
  // data fields from firebase
  const [data, setData] = useState(null);

  useEffect(() => {
      async function fetchData() {
          const model = new Model();
          const user = await model.getUser();
          const docRef = doc(db, "Data", user.email);
          onSnapshot(docRef, (doc) => {
              setData(doc.data());
          })
      }
      fetchData();
  }, []);

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