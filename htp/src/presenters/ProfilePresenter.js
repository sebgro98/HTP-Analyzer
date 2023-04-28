import React, { useState, useEffect } from "react";
import ProfileView from "../views/ProfileView";
import Model from "../Model";
import { db, auth } from "../firebaseModel";
import { collection, doc, setDoc, onSnapshot } from "firebase/firestore";

const userProfileCollection = collection(db, "userProfiles");

const ProfilePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem("isLoggedIn")) || false
  );
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [telephone, setTelephone] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [error, setError] = useState("");
  const [imageURL, setImageURL] = useState("");
  useEffect(() => {
    const model = new Model();
    const checkUser = async () => {
      const user = await model.getUser();
      console.log(user);
      if (user) {
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setAddress(user.address);
        setTelephone(user.telephone);
        setProfilePicture(user.profilePicture);
      }
    };
    if (isLoggedIn) {
      checkUser();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        const { uid: userId } = user;
        const userProfileDoc = doc(userProfileCollection, userId);
        const unsubscribeProfile = onSnapshot(userProfileDoc, (doc) => {
          if (doc.exists()) {
            const userData = doc.data();
            setFirstName(userData.firstName);
            setLastName(userData.lastName);
            setAddress(userData.address);
            setTelephone(userData.telephone);
            setImageURL(userData.imageURL);
          }
        });
        return () => unsubscribeProfile();
      }
    });
    return () => unsubscribeAuth();
  }, []);

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

  async function handleSaveChanges() {
    if (!firstName || !lastName || !address || !telephone) {
      setError("Please fill out all required fields");
      return;
    }
    const updatedUser = {
      firstName,
      lastName,
      address,
      telephone,
      imageURL,
    };
    const { uid: userId } = auth.currentUser || {};
    if (userId) {
      try {
        const userProfileDoc = doc(userProfileCollection, userId);
        await setDoc(userProfileDoc, updatedUser);
        console.log("User profile saved successfully");
      } catch (error) {
        console.log("Error saving user profile:", error);
      }
    }
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {auth.currentUser ? (
        <div style={{ maxWidth: 600 }}>
          <ProfileView
            isLoggedIn={isLoggedIn}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            address={address}
            setAddress={setAddress}
            telephone={telephone}
            setTelephone={setTelephone}
            profilePicture={profilePicture}
            setProfilePicture={setProfilePicture}
            error={error}
            handleLogout={handleLogout}
            handleImageUpload={handleImageUpload}
            handleSaveChanges={handleSaveChanges}
          />
        </div>
      ) : (
        <p>Please log in to access the profile page.</p>
      )}
    </div>
  );
};

export default ProfilePage;
