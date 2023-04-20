import React from "react";
import "../views/Styled.css";

const Sidebar = ({ isLoggedIn, handleLogout }) => {
  console.log("isLoggedIn in Sidebar: ", isLoggedIn);
  return (
    <div className="sidebar-container">
      <ul className="sidebar-list">
        {isLoggedIn ? (
          <>
            <li className="sidebar-item">
              <a href="/">Home</a>
            </li>
            <li className="sidebar-item">
              <button className="logout-button" onClick={handleLogout}>Logout</button>
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
