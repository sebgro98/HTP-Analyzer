import React, { createContext, useEffect, useState } from "react";
import Model from "./Model";

export const AuthContext = createContext(null);


function AuthProvider({ children, model }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const checkUser = async () => {
            const user = await model.getUser();
            setIsLoggedIn(!!user);
            setIsLoading(false);
        };
        checkUser();
    }, [model]);

    const logIn = async (email, password) => {
        await model.logIn(email, password);
        setIsLoggedIn(true);
    };

    const logOut = async () => {
        await model.logout();
        setIsLoggedIn(false);
    };

    const authContextValue = {
        isLoggedIn,
        isLoading,
        logIn,
        logOut,
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;