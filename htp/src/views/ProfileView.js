import React, { useState } from "react";
import "./Styled.css";

const user = {
  firstName: "John",
  lastName: "Smith",
  email: "example@example.com",
  imageURL: "",
};

const ProfilePageView = () => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [image, setImage] = useState(user.imageURL);
  
  function handleImageUpload(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    };
  }
  
  function handleSaveChanges() {
    const updatedUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      imageURL: image,
    };
    // Save updatedUser to the server or perform any other necessary action
    console.log(updatedUser);
  }
  
  return (
    <div className="profil-container">
      <h1 style={{ marginTop: '100px' }}>Profile Page</h1>
      <div className="input-details">
        <div className="profile">
          <div className="profile-image" style={{backgroundImage: `url(${image})`}}></div>
          <input type="file" onChange={handleImageUpload} />
        </div>
        <div className="details-container">
          <div>
            <label>Firstname</label>
            <input
              placeholder={firstName}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label>Lastname</label>
            <input
              placeholder={lastName}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              placeholder={email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button className="save-button" onClick={handleSaveChanges}>
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePageView;
