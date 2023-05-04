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


var notificationPlayer = new Audio(ding);
notificationPlayer.volume = 0.5;

const types = ["success", "info", "warning", "error"];

function NotificationView ({ data }) {
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

// Controversial
const readData = {
  CurrentIntervalsHumMax: data.CurrentIntervals.HumMax[0],
  CurrentIntervalsHumMin: data.CurrentIntervals.HumMin[0],
  CurrentIntervalsTempMax: data.CurrentIntervals.TempMax[0], 
  CurrentIntervalsTempMin: data.CurrentIntervals.TempMin[0],
  CurrentIntervalsPresMax: data.CurrentIntervals.PresMax[0],
  CurrentIntervalsPresMin: data.CurrentIntervals.PresMin[0]
}
const currentHum = data.WeatherData.Hum[0];
const currentTemp = data.WeatherData.Temp[0];
const currentPres = data.WeatherData.Pres[0];

  const [humMaxNotified, setHumMaxNotified] = useState(false);
  const [humMinNotified, setHumMinNotified] = useState(false);
  const [tempMaxNotified, setTempMaxNotified] = useState(false);
  const [tempMinNotified, setTempMinNotified] = useState(false);
  const [presMaxNotified, setPresMaxNotified] = useState(false);
  const [presMinNotified, setPresMinNotified] = useState(false);
  
  useEffect(() => {
    // maxHum
    if ( currentHum  >= readData.CurrentIntervalsHumMax && !humMaxNotified) {
      addNotification("Current humidity reached it's maximum value!")
      setHumMaxNotified(true);
    } else if (currentHum < readData.CurrentIntervalsHumMax && humMaxNotified) {
      setHumMaxNotified(false);
    }
    // minHum
    if ( currentHum  < readData.CurrentIntervalsHumMin && !humMinNotified) {
      addNotification("Current humidity reached it's minimum value!")
      setHumMinNotified(true);
    } else if (currentHum >= readData.CurrentIntervalsHumMin && humMinNotified) {
      setHumMinNotified(false);
    }
    // maxTemp
    if ( currentTemp  >= readData.CurrentIntervalsTempMax && !tempMaxNotified) {
      addNotification("Current temperature reached it's maximum value!")
      setTempMaxNotified(true);
    } else if (currentTemp < readData.CurrentIntervalsTempMax && tempMaxNotified) {
      setTempMaxNotified(false);
    }
    // minTemp
    if ( currentTemp  < readData.CurrentIntervalsTempMin && !tempMinNotified) {
      addNotification("Current temperature reached it's minimum value!")
      setTempMinNotified(true);
    } else if (currentTemp >= readData.CurrentIntervalsTempMin && tempMinNotified) {
      setTempMinNotified(false);
    }
    // maxPres
    if ( currentPres  >= readData.CurrentIntervalsPresMax && !presMaxNotified) {
      addNotification("Current pressure reached it's maximum value!")
      setPresMaxNotified(true);
    } else if (currentPres < readData.CurrentIntervalsPresMax && presMaxNotified) {
      setPresMaxNotified(false);
    }
    // minPres
    if ( currentPres  < readData.CurrentIntervalsPresMin && !presMinNotified) {
      addNotification("Current pressure reached it's minimum value!")
      setPresMinNotified(true);
    } else if (currentPres >= readData.CurrentIntervalsPresMin && presMinNotified) {
      setPresMinNotified(false);
    }

  }, [currentHum, humMaxNotified, humMinNotified, currentTemp, tempMaxNotified, tempMinNotified, currentPres, presMaxNotified, presMinNotified]);
 
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
                height: "250px",
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