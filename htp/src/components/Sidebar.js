import React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { IconButton } from "@mui/material";
import { FaHome, FaSignOutAlt, FaSignInAlt, FaBars, FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Sidebar({ isLoggedIn, handleLogout }) {
    const [sidebarOpen, setSidebarOpen] = React.useState(false);
    const routes = ["/", "/profile"];
    const icons = [<FaHome />, <FaUserAlt />];

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return;
        }
        setSidebarOpen(open);
    };

    const list = () => (
        <Box
            sx={{
                width: 250,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {routes.map((route, index) => (
                    <ListItemButton key={route} component={Link} to={route} onClick={() => setSidebarOpen(false)}>
                        <ListItemIcon>{icons[index]}</ListItemIcon>
                        <ListItemText primary={route === "/" ? "Home" : "Profile"} />
                    </ListItemButton>
                ))}
                {!isLoggedIn ? (
                    <ListItemButton component={Link} to="/login" onClick={() => setSidebarOpen(false)}>
                        <ListItemIcon>
                            <FaSignInAlt />
                        </ListItemIcon>
                        <ListItemText primary="Login" />
                    </ListItemButton>
                ) : (
                    <ListItemButton onClick={handleLogout}>
                        <ListItemIcon>
                            <FaSignOutAlt />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItemButton>
                )}
            </List>
        </Box>
    );

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 999,
            }}
        >
            <Box>
                <IconButton onClick={toggleDrawer(true)}>
                    <FaBars style={{ fontSize: "1.2em", padding: "0.5em" }} />
                </IconButton>
            </Box>
            <React.Fragment>
                <SwipeableDrawer
                    anchor={"left"}
                    open={sidebarOpen}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}
                >
                    {list()}
                </SwipeableDrawer>
            </React.Fragment>
        </div>
    );
}