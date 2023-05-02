import React from 'react';
import "./Styled.css";

function DisplayForum(props) {
    return (
        <div className="forum-container">
            <h1>Forum</h1>
            {props.children}
        </div>
    );
}

export default DisplayForum;