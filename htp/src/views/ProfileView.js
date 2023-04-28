import React from "react";
import "./Styled.css"


const ProfileView = ({
  isLoggedIn,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  address,
  setAddress,
  telephone,
  setTelephone,
  profilePicture,
  setProfilePicture,
  error,
  handleLogout,
  handleImageUpload,
  handleSaveChanges,
}) => {
  const greeting = `Hello, ${firstName}!`;

  return (
    <div className="profile-view-container">
      <h2>{greeting}</h2>
      <div className="profile-view-form">
        <label htmlFor="first-name" className="profile-view-label">First Name:</label>
        <input
          type="text"
          id="first-name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="profile-view-input"
        />
        <label htmlFor="last-name" className="profile-view-label">Last Name:</label>
        <input
          type="text"
          id="last-name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="profile-view-input"
        />
        <label htmlFor="address" className="profile-view-label">Address:</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="profile-view-input"
        />
        <label htmlFor="telephone" className="profile-view-label">Telephone:</label>
        <input
          type="text"
          id="telephone"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          className="profile-view-input"
        />
        <div className="profile-view-image-container">
          <label htmlFor="profile-picture" className="profile-view-label">Profile Picture:</label>
          <input
            type="file"
            accept="image/*"
            id="profile-picture"
            onChange={handleImageUpload}
            className="profile-view-input"
          />
          <img src={profilePicture} alt="Profile" style={{ maxWidth: 100 }} />
        </div>
        {error && <p className="profile-view-error">{error}</p>}
        <button onClick={handleSaveChanges}>Save Changes</button>
      </div>
    </div>
  );
};

export default ProfileView;
