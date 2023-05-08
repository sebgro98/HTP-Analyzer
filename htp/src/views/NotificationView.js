import { useState, useEffect } from "react";
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
import { useNotificationCenter } from "react-toastify/addons/use-notification-center";
import { toast } from "react-toastify";
import ding from "./sounds/ding.mp3"
import { useRecoilState } from 'recoil';
import { darkModeAtom } from '../views/MainPageView';
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebaseModel';
import Model from "../Model";


var notificationPlayer = new Audio(ding);
notificationPlayer.volume = 0.5;

const types = ["success", "info", "warning", "error"];

function NotificationView ({ data }) {

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


  const [darkMode] = useRecoilState(darkModeAtom);

  const {
    notifications,
    clear,
    markAllAsRead,
    markAsRead,
    unreadCount,
  } = useNotificationCenter();
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const addNotification = (msg) => {
    notificationPlayer.play();
    toast(<div className="msgText">{msg}</div>, {
      type: "info"
    });
  };

  const toggleNotificationCenter = (event) => {
    setAnchorEl(event.currentTarget);
    setIsOpen(!isOpen);
  };

  const toggleFilter = (e) => {
    setShowUnreadOnly(!showUnreadOnly);
  };


const currentHum = data.WeatherData.Hum[0];
const currentTemp = data.WeatherData.Temp[0];
const currentPres = data.WeatherData.Pres[0];
  
  useEffect(() => {
    // maxHum
    if ( currentHum  >= data.CurrentIntervals.HumMax && !data.Notifications.HumMaxNotified) {
      addNotification("Current humidity reached it's maximum value!")
      updateData("Notifications.HumMaxNotified", true)
    } else if (currentHum < data.CurrentIntervals.HumMax && data.Notifications.HumMaxNotified) {
      updateData("Notifications.HumMaxNotified", false)
    }
    // minHum
    if ( currentHum  < data.CurrentIntervals.HumMin && !data.Notifications.HumMinNotified) {
      addNotification("Current humidity reached it's minimum value!")
      updateData("Notifications.HumMinNotified", true)
    } else if (currentHum >= data.CurrentIntervals.HumMin && data.Notifications.HumMinNotified) {
      updateData("Notifications.HumMinNotified", false)
    }
    // maxTemp
    if ( currentTemp  >= data.CurrentIntervals.TempMax && !data.Notifications.TempMaxNotified) {
      addNotification("Current temperature reached it's maximum value!")
      updateData("Notifications.TempMaxNotified", true)
    } else if (currentTemp < data.CurrentIntervals.TempMax && data.Notifications.TempMaxNotified) {
      updateData("Notifications.TempMaxNotified", false)
    }
    // minTemp
    if ( currentTemp  < data.CurrentIntervals.TempMin && !data.Notifications.TempMinNotified) {
      addNotification("Current temperature reached it's minimum value!")
      updateData("Notifications.TempMinNotified", true)
    } else if (currentTemp >= data.CurrentIntervals.TempMin && data.Notifications.TempMinNotified) {
      updateData("Notifications.TempMinNotified", false)
    }
    // maxPres
    if ( currentPres  >= data.CurrentIntervals.PresMax && !data.Notifications.PresMaxNotified) {
      addNotification("Current pressure reached it's maximum value!")
      updateData("Notifications.PresMaxNotified", true)
    } else if (currentPres < data.CurrentIntervals.PresMax && data.Notifications.PresMaxNotified) {
      updateData("Notifications.PresMaxNotified", false)
    }
    // minPres
    if ( currentPres  < data.CurrentIntervals.PresMin && !data.Notifications.PresMinNotified) {
      addNotification("Current pressure reached it's minimum value!")
      updateData("Notifications.PresMinNotified", true)
    } else if (currentPres >= data.CurrentIntervals.PresMin && data.Notifications.PresMinNotified) {
      updateData("Notifications.PresMinNotified", false)
    }

  }, [currentHum, data.Notifications.HumMaxNotified, data.Notifications.HumMinNotified, currentTemp, data.Notifications.TempMaxNotified, data.Notifications.TempMinNotified, currentPres, data.Notifications.PresMaxNotified, data.Notifications.PresMinNotified]);
 
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
                    {notification.content}
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