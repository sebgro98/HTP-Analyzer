import { StyledEngineProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import NotificationView from "../views/NotificationView";import Stack from '@mui/material/Stack';
import Spinner from 'react-bootstrap/Spinner';
import { useState, useEffect } from "react";
import { db } from "../firebaseModel";
import { doc, onSnapshot } from "firebase/firestore";

const types = ["success", "info", "warning", "error"];



function NotificationPresenter({ model }) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        async function fetchData() {
          try {
            const user = await model.getUser();
            if (!user) {
              setError("You need to sign in/register to see your data");
              return;
            }
            const docRef = doc(db, "Data", user.email);
    
            onSnapshot(docRef, (doc) => {
              const fetchedData = doc.data();
              if (!fetchedData?.WeatherData?.Time) {
                setError("Data is missing or incomplete");
                return;
              }
              setData(fetchedData);
              setError(null);
            });
          } catch (error) {
            setError("Error fetching data");
            console.error(error);
          }
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