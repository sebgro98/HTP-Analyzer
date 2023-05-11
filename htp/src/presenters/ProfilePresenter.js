import React, { useState, useEffect } from "react";
import ProfileView from "../views/ProfileView";
import { db, auth } from "../firebaseModel";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";

const ProfilePage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (!user) {
        setErrorMessage("Please log in to view this page");
      } else {
        // User is authenticated, fetch user data from Firestore
        const docRef = doc(db, "Users", user.uid);
        const unsubscribeFirestore = onSnapshot(docRef, (doc) => {
          if (doc.exists) {
            const data = doc.data();
            setFirstName(data?.firstName || "");
            setLastName(data?.lastName || "");
            setGender(data?.gender || "");
            setEmail(user.email);
          }
        });
        return () => unsubscribeFirestore();
      }
    });
    return () => unsubscribeAuth();
  }, []);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSaveChanges = async (event) => {
    event.preventDefault();

    const user = getAuth().currentUser;

    if (!user) {
      setErrorMessage("User not authenticated");
      return;
    }

    try {
      // Update the user's email
      if (email !== user.email) {
        await user.updateEmail(email);
      }

      // Update the user's Firestore document
      const docRef = doc(db, "Users", user.uid);
      await updateDoc(docRef, {
        firstName,
        lastName,
        gender,
        email,
      });

      setSuccessMessage("Changes saved successfully!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      setErrorMessage(`Error: ${error.message}`);
    }
  };

  if (errorMessage) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <p style={{ fontSize: "24px", fontWeight: "bold", color: "red" }}>
          {errorMessage}
        </p>
      </div>
    );
  }

  return (
    <ProfileView
      firstName={firstName}
      onFirstNameChange={handleFirstNameChange}
      lastName={lastName}
      onLastNameChange={handleLastNameChange}
      gender={gender}
      onGenderChange={handleGenderChange}
      email={email}
      onEmailChange={handleEmailChange}
      password={password}
      onPasswordChange={handlePasswordChange}
      confirmPassword={confirmPassword}
      onConfirmPasswordChange={handleConfirmPasswordChange}
      onSaveChanges={handleSaveChanges}
      setGender={setGender}
      currentEmail={email}
      successMessage={successMessage}
    />
  );
};

export default ProfilePage;
