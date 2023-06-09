import React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { IconButton } from "@mui/material";
import { FaHome, FaSignOutAlt, FaSignInAlt, FaBars, FaUserAlt,  FaComments, FaAddressCard } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Sidebar({ isLoggedIn, handleLogout }) {

    console.log("Is this true or false:" + isLoggedIn)
    const [sidebarOpen, setSidebarOpen] = React.useState(false);
    const routes = ["/", "/profile", "/forum", "/about"];
    const icons = [<FaHome />, <FaUserAlt />, <FaComments />, <FaAddressCard />];

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return;
        }
        setSidebarOpen(open);
    };

    const list = () => (
        <Box
            sx={{
                color: "black",
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
                <ListItemButton
                    key="/"
                    component={Link}
                    to="/"
                    onClick={() => setSidebarOpen(false)}
                >
                    <ListItemIcon>
                        <FaHome />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItemButton>

                <ListItemButton
                    key="/profile"
                    component={Link}
                    to="/profile"
                    onClick={() => setSidebarOpen(false)}
                >
                    <ListItemIcon>
                        <FaUserAlt />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                </ListItemButton>
                <ListItemButton
                    key="/forum"
                    component={Link}
                    to="/forum"
                    onClick={() => setSidebarOpen(false)}
                >
                    <ListItemIcon>
                        <FaComments />
                    </ListItemIcon>
                    <ListItemText primary="Forum" />
                </ListItemButton>

                <ListItemButton
                    key="/about"
                    component={Link}
                    to="/about"
                    onClick={() => setSidebarOpen(false)}
                >
                    <ListItemIcon>
                        <FaAddressCard />
                    </ListItemIcon>
                    <ListItemText primary="About" />
                </ListItemButton>

                {!isLoggedIn ? (
                    <ListItemButton
                        component={Link}
                        to="/login"
                        onClick={() => setSidebarOpen(false)}
                    >
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
                <IconButton sx={{ color: 'red' }} onClick={toggleDrawer(true)}>
                    <FaBars style={{ color: "#499BDA", fontSize: '40px'}} />
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