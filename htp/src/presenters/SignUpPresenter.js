import React from "react";
import Model from "../Model";
import SignUpView from "../views/SignUpView";

const SignUp = () => {
    const handleLogin = (username, password) => {
        const model = new Model();
        model.Registration(username, password);
    };

    return (
        <>
            <SignUpView onLogin={handleLogin} />
        </>
    );
};

export default SignUp;