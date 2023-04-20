import React from "react";
import "./Styled.css";

const LoginView = ({
  email,
  password,
  confirmPassword,
  error,
  successMessage,
  isRegistering,
  setEmail,
  setPassword,
  setConfirmPassword,
  handleSubmit,
  handleToggle,
  isLoggedIn
}) => {
  return (
    <div className="login-container">
      <>
        <h1 className="login-header">{isRegistering ? "Register" : "Login"}</h1>
        {error && <p className="login-error">{error}</p>}
        {successMessage && <p className="login-success">{successMessage}</p>}
        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-label">
            <input
              className="login-input"
              type="email"
              value={email}
              placeholder="Email:"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="login-label">
            <input
              className="login-input"
              type="password"
              value={password}
              placeholder="Password:"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {isRegistering && (
            <label className="login-label">
              <input
                className="login-input"
                type="password"
                value={confirmPassword}
                placeholder="Confirm Password:"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>
          )}

          {isLoggedIn ? ( // render Logout button if user is logged in
            <button
              className="login-button"
              type="button"
              onClick={handleToggle}
            >
              Logout
            </button>
          ) : (
            <button className="login-button" type="submit">
              {isRegistering ? "Register" : "Login"}
            </button>
          )}

          {!isLoggedIn && (
            <button
              className="login-toggle-button"
              type="button"
              onClick={handleToggle}
            >
              {isRegistering ? "Go back to Login" : "Register"}
            </button>
          )}
        </form>
      </>
    </div>
  );
};

export default LoginView;
