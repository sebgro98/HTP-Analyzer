import { useState, useEffect, createContext, useContext } from "react";
import {
  Alert,
  Badge,
  Box,
  Button,
  Fade,
  FormGroup,
  FormControlLabel,
  IconButton,
  Popper,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import CheckIcon from "@mui/icons-material/Check";
import { useRecoilState } from 'recoil';
import { darkModeAtom } from '../views/MainPageView';
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebaseModel';
import Model from "../Model";
import { NotificationContext } from "../components/NotificationContext";

function NotificationView({ data }) {
  
  const updateData = async (field, value) => {
    const model = new Model();
    const user =  await model.getUser();
    const docRef = doc(db, "Data", user.email);
        updateDoc(docRef, {
        [field]: value,
    })
        .then(() => {
            console.log("Updated successfully!")
        })
        .catch((error) => {
            console.error("Error updating document: ", error);
        });
}

const {addNotification, notifications, clear, markAllAsRead, markAsRead, unreadCount } = useContext(NotificationContext);

const currentHum = data.WeatherData.Hum[data.WeatherData.Hum.length - 1];
const currentTemp = data.WeatherData.Temp[data.WeatherData.Temp.length - 1];
const currentPres = data.WeatherData.Pres[data.WeatherData.Pres.length - 1];

useEffect(() => {
  // maxHum
  if (currentHum >= data.CurrentIntervals.HumMax && !data.Notifications.HumMaxNotified) {
    updateData("Notifications.HumMaxNotified", true);
    addNotification("Current humidity reached its maximum value!");
  } else if (currentHum < data.CurrentIntervals.HumMax && data.Notifications.HumMaxNotified) {
    updateData("Notifications.HumMaxNotified", false);
  }

  // minHum
  if (currentHum <= data.CurrentIntervals.HumMin && !data.Notifications.HumMinNotified) {
    updateData("Notifications.HumMinNotified", true);
    addNotification("Current humidity reached its minimum value!");
  } else if (currentHum > data.CurrentIntervals.HumMin && data.Notifications.HumMinNotified) {
    updateData("Notifications.HumMinNotified", false);
  }
  // maxTemp
  if ( currentTemp >= data.CurrentIntervals.TempMax && !data.Notifications.TempMaxNotified) {
    updateData("Notifications.TempMaxNotified", true)
    addNotification("Current temperature reached its maximum value!")
  } else if (currentTemp < data.CurrentIntervals.TempMax && data.Notifications.TempMaxNotified) {
    updateData("Notifications.TempMaxNotified", false)
  }
  // minTemp
  if ( currentTemp <= data.CurrentIntervals.TempMin && !data.Notifications.TempMinNotified) {
    updateData("Notifications.TempMinNotified", true)
    addNotification("Current temperature reached its minimum value!")
  } else if (currentTemp > data.CurrentIntervals.TempMin && data.Notifications.TempMinNotified) {
    updateData("Notifications.TempMinNotified", false)
  }
  // maxPres
  if ( currentPres >= data.CurrentIntervals.PresMax && !data.Notifications.PresMaxNotified) {
    updateData("Notifications.PresMaxNotified", true)
    addNotification("Current pressure reached its maximum value!")
  } else if (currentPres < data.CurrentIntervals.PresMax && data.Notifications.PresMaxNotified) {
    updateData("Notifications.PresMaxNotified", false)
  }
  // minPres
  if ( currentPres <= data.CurrentIntervals.PresMin && !data.Notifications.PresMinNotified) {
    updateData("Notifications.PresMinNotified", true)
    addNotification("Current pressure reached its minimum value!")
  } else if (currentPres > data.CurrentIntervals.PresMin && data.Notifications.PresMinNotified) {
    updateData("Notifications.PresMinNotified", false)
  }

}, [currentHum, data.Notifications.HumMaxNotified, data.Notifications.HumMinNotified, currentTemp, data.Notifications.TempMaxNotified, data.Notifications.TempMinNotified, currentPres, data.Notifications.PresMaxNotified, data.Notifications.PresMinNotified]);

  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const toggleNotificationCenter = (event) => {
    setAnchorEl(event.currentTarget);
    setIsOpen(!isOpen);
  };

  const toggleFilter = () => {
    setShowUnreadOnly(!showUnreadOnly);
  };

  const [darkMode] = useRecoilState(darkModeAtom);

return (
  <Box sx={{ marginRight: "10px", marginTop: "-50px" }}>
    <IconButton size="large" onClick={toggleNotificationCenter}>
      <Badge badgeContent={unreadCount} color="primary" sx={{'& .MuiBadge-badge': {margin: '8px', background: '#499BDA'}}}>
        <NotificationsIcon style={{color: darkMode ? "#ffffff" : "#1a1a1a"}} sx={{ fontSize: 60 }}/>
      </Badge>
    </IconButton>

    <Popper open={isOpen} anchorEl={anchorEl} transition>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Box>       
            <Box
              sx={{
                background: darkMode ? "#2ECC40" : "#1a1a1a",
                padding: "2px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" color="#fff" className="notificationCenter">
                Notification center
              </Typography>
              <FormGroup sx={{ color: "#fff" }}>
                <FormControlLabel
                  control={
                    <Switch
                    sx={{
                        '& .MuiSwitch-track': {
                          backgroundColor: '#d8d8d8',
                        },
                      }}
                      color="primary"
                      onChange={toggleFilter}
                      checked={showUnreadOnly}
                    />
                  }
                  label=<span className="unreadOnly">Show unread only</span>
                />
              </FormGroup>
            </Box>
            <Stack 
              sx={{
                height: "300px",
                width: "min(30ch, 40ch)",
                padding: "2px",
                background: "#f5f5f5",
                borderRadius: "2px",
                overflowY: "auto",
              }}
              spacing={0.5}
            >
              {(!notifications.length ||
                (unreadCount === 0 && showUnreadOnly)) && (
                <h6 className="font">
                  Your notification list is empty!{" "}
                </h6>
              )}
              {(showUnreadOnly
                ? notifications.filter((v) => !v.read)
                : notifications
              ).map((notification) => {
                const notificationTime = new Date(notification.time);
                const dateFormat = new Intl.DateTimeFormat('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
                return (
                  <Alert
                    severity={"info"}
                    variant="outlined"
                    action={
                      notification.read ? (
                        <CheckIcon />
                      ) : (
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="span"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <MarkChatReadIcon />
                        </IconButton>
                      )
                    }
                  >
                    <div className="msgText">{notification.content}</div>
                    <div style={{ color: "#88CC88", fontSize: "0.5rem", marginTop: "10px" }}>
                      {dateFormat.format(notificationTime)} at {notificationTime.toLocaleTimeString()}
                    </div>
                  </Alert>
                );
              })}
            </Stack>
            <Box
              sx={{ 
                background: darkMode ? "#2ECC40" : "#1a1a1a",
                padding: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <Button  variant="contained" onClick={clear} size="small" className="notificationButton">
                Clear All
              </Button>

              <Button  variant="contained" size="small" className="notificationButton" onClick={markAllAsRead}>
                Mark all as read
              </Button>
            </Box>
          </Box>
        </Fade>
      )}
    </Popper>
  </Box>
);

}

export default NotificationView;