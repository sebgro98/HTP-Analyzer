import React, { useEffect, useState } from "react";
import LoginView from "../views/LoginView";
import Model from "../Model";
import Sidebar from "../components/Sidebar";

const Login = () => {
  const model = new Model();
  const [isLoggedIn, setIsLoggedIn] = useState(
      JSON.parse(localStorage.getItem("isLoggedIn")) || false
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const checkUser = async () => {
      const user = await model.getUser();
      console.log(user);
    };
    checkUser();
  }, []);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLoginCB = async () => {
    try {
      await model.logIn(email, password);
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
      setIsLoggedIn(true);
      window.location.href = "/";
    } catch (error) {
      console.log(`Error logging in: ${error}`);
    }
  };

  const handleRegistrationCB = (email, password) => {
    model.Registration(email, password)
        .then(() => {
          localStorage.setItem("isLoggedIn", JSON.stringify(true));
          setIsLoggedIn(true);
          setSuccessMessage("Successfully registered!");
          window.location.href = "/";
        })
        .catch((error) => {
          setError(error.message);
        });
  };

  const handleLogout = () => {
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
    if (isLoggedIn) {
      handleLogout();
    } else {
      setIsRegistering(!isRegistering);
      setError("");
    }
  };

                return (
    <>
      <Sidebar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      {isLoggedIn ? null : (
        <LoginView
          email={email}
          password={password}
          confirmPassword={confirmPassword}
          error={error}
          successMessage={successMessage}
          isRegistering={isRegistering}
          setEmail={setEmail}
          setPassword={setPassword}
          setConfirmPassword={setConfirmPassword}
          handleSubmit={handleSubmitCB}
          handleToggle={handleToggleCB}
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
        />
      )}
    </>
  );
};

export default Login;
