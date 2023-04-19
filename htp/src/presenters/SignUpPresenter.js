import React from "react";
import Model from "../Test";
import SignUpView from "../views/SignUpView";

const SignUp = () => {
    const handleLogin = (username, password) => {
        const model = new Model();
        model.Details(username, password);
    };

    return (
        <>
            <SignUpView onLogin={handleLogin} />
        </>
    );
};

export default SignUp;