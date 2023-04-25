import React from "react";
import "./Styled.css";

const user = {
  firstName: "John",
  lastName: "Smith",
  email: "example@example.com",
  imageURL: "",
};

const ProfileView = () => {
  function onNameChangeACB(e) {
  }
  return (
    <div className="profil-container" style={{ marginTop: "100px" }}>
      <h1 className="title">Profile Page</h1>
      <div className="input-details">
        <div className="profile">
          <div className="profile-image"></div>
          <button className="upload-profile-button">Upload</button>
        </div>
        <div className="details-container">
          <div>
            <label>Firstname</label>
            <input placeholder={user.firstName}></input>
          </div>
          <div>
            <label>Lastname</label>
            <input placeholder={user.lastName} onInput={onNameChangeACB}></input>
          </div>
          <div>
            <label>Email:</label>
            <input onInput={onNameChangeACB} placeholder={user.email}></input>
          </div>
          <button className="save-button">Save changes</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
