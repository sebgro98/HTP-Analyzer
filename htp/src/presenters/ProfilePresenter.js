import React, { useState, useEffect } from "react";
import ProfileView from "../views/ProfileView";
import Model from "../Model";
import { db } from "../firebaseModel";

const ProfilePage = ({ user }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem("isLoggedIn")) || false
  );
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  
  const [profilePicture, setProfilePicture] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const model = new Model();
    const checkUser = async () => {
      const user = await model.getUser();
      console.log(user);
      if (user) {
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.email);
        setProfilePicture(user.profilePicture);
      }
    };
    if (isLoggedIn) {
      checkUser();
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    const model = new Model();
    model
      .logout()
      .then(() => {
        localStorage.setItem("isLoggedIn", JSON.stringify(false));
        setIsLoggedIn(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLogin = async (email, password) => {
    const model = new Model();
    try {
      const response = await model.login(email, password);
      if (response.status === 200) {
        localStorage.setItem("isLoggedIn", JSON.stringify(true));
        setIsLoggedIn(true);
        setError("");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProfilePicture(reader.result);
    };
  };

  const handleSaveChanges = async () => {
    try {
      const userRef = db.collection("users").doc(user.uid);
      await userRef.update({
        firstName,
        lastName,
        email,
        profilePicture,
      });
      setError("");
      alert("Changes saved successfully!");
    } catch (error) {
      console.log(error);
      setError("Error saving changes");
    }
  };

  return (
    <ProfileView
      isLoggedIn={isLoggedIn}
      firstName={firstName}
      setFirstName={setFirstName}
      lastName={lastName}
      setLastName={setLastName}
      email={email}
      setEmail={setEmail}
      profilePicture={profilePicture}
      setProfilePicture={setProfilePicture}
      error={error}
      handleLogout={handleLogout}
      handleLogin={handleLogin}
      handleImageUpload={handleImageUpload}
      handleSaveChanges={handleSaveChanges}
    />
  );
};

export default ProfilePage;
