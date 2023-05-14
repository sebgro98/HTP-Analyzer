import { useState, createContext } from "react";
import { toast } from "react-toastify";
import ding from "../views/sounds/ding.mp3";

var notificationPlayer = new Audio(ding);
notificationPlayer.volume = 0.5;

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const addNotification = (msg) => {
    const currentTime = new Date();
    notificationPlayer.play();
    const newNotification = {
      id: Date.now(),
      content: msg,
      time: currentTime.getTime(),
      read: false,
    };
    setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
    setUnreadCount((prevUnreadCount) => prevUnreadCount + 1);
    toast(
      <div className="msgText">
        {msg}
      </div>,
      {
        type: "info",
      }
    );
  };

  const markAsRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    setUnreadCount((prevUnreadCount) => prevUnreadCount - 1);
  };

  const markAllAsRead = () => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => ({ ...notification, read: true }))
    );
    setUnreadCount(0);
  };

  const clear = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        markAsRead,
        markAllAsRead,
        clear,
        unreadCount,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}