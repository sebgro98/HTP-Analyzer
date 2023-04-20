import React, { useState } from "react";
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

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLoginCB = (email, password) => {
    model.logIn(email,password).then(() => {
      model.retrieveDataForEmail(email)
      //window.location.href = "/";
    });

  };

  const handleRegistrationCB = (email, password) => {
    model.Registration(email, password).then(() => {
      window.location.href = "/";
    });
  };

  const handleSubmitCB = (e) => {
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
    if (isRegistering) {
      handleRegistrationCB(email, password);
    } else {
      handleLoginCB(email, password);
    }

    // Reset form fields and error message
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError("");
  };

  const handleToggleCB = () => {
    setIsRegistering(!isRegistering);
    setError("");
  };

  return (
    <LoginView
      isLoggedIn={isLoggedIn}
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
    />
  );
};

export default Login;
