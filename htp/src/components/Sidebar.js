import React from "react";
import "../views/Styled.css";

const Sidebar = ({ isLoggedIn }) => {
  return (
    <div className="sidebar-container">
      <ul className="sidebar-list">
        {isLoggedIn ? (
          <>
            <li className="sidebar-item">
              <a href="/">Home</a>
            </li>
            <li className="sidebar-item">
              <a href="/profile">Profile</a>
            </li>
            <li className="sidebar-item">
              <a href="/logout">Logout</a>
            </li>
          </>
        ) : (
          <>
            <li className="sidebar-item">
              <a href="/">Home</a>
            </li>
            <li className="sidebar-item">
              <a href="/login">Login</a>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
