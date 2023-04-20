import React, { useState, useEffect } from "react";
import LoginView from "../views/LoginView";
import Model from "../Model";

const Login = () => {
  const model = new Model();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLoginCB = (email, password) => {
    model.logIn(email, password).then(() => {
      model.retrieveDataForEmail(email);
      setIsLoggedIn(true);
      setSuccessMessage("Successfully logged in!");
    });
  };
  
  const handleRegistrationCB = (email, password) => {
    model.Registration(email, password).then(() => {
      setIsLoggedIn(true);
      setSuccessMessage("Successfully registered!");
    });
  };
  

  const handleSubmitCB = async (e) => {
    e.preventDefault();

    // Validate user input
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (isRegistering && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Call appropriate function based on whether we're logging in or registering
    try {
      if (isRegistering) {
        await handleRegistrationCB(email, password);
      } else {
        await handleLoginCB(email, password);
      }
      // Reset form fields and error message
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setError("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleCB = () => {
    setIsRegistering(!isRegistering);
    setError("");
  };

  useEffect(() => {
    if (isLoggedIn) {
      window.location.href = "/";
    }
  }, [isLoggedIn]);

  return (
    <LoginView
      email={email}
      password={password}
      confirmPassword={confirmPassword}
      error={error}
      isRegistering={isRegistering}
      setEmail={setEmail}
      setPassword={setPassword}
      setConfirmPassword={setConfirmPassword}
      handleSubmit={handleSubmitCB}
      handleToggle={handleToggleCB}
      successMessage={successMessage}
    />
  );
};

export default Login;
