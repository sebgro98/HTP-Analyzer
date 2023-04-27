import React from "react";
import "./Styled.css";
import Login from "../presenters/LoginPresenter";
import ProfileImage from "../components/ProfileImage";
import Sidebar from "../components/Sidebar";

const ProfileView = ({ isLoggedIn, firstName, setFirstName, lastName, setLastName, email, setEmail, profilePicture, setProfilePicture, error, handleLogout, handleLogin, handleImageUpload, handleSaveChanges }) => {

  const greeting = firstName && lastName ? `Hello, ${firstName} ${lastName}!` : "Hello!";

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSaveChanges(firstName, lastName, email, profilePicture);
  };

  if (!isLoggedIn) {
    return <Login handleLogin={handleLogin} error={error} />;
  }

  return (
    <>
      <Sidebar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <div className="profil-container">
        <h1 className="greeting">{greeting}</h1>
        <div className="profile-image-container">
          <ProfileImage imageURL={profilePicture} onImageUpload={handleImageUpload} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-details">
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
            </div>
            <div className="button-container">
              <button type="submit">Save changes</button>
              {error && <div className="error-message">{error}</div>}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfileView;
