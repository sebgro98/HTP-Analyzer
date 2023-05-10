import AboutView from "../views/AboutView";
import React, { useEffect, useState } from 'react';
import {getAuth, onAuthStateChanged } from 'firebase/auth';

function AboutPresenter() {

    const [user, setUser] = useState(null);

      useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
          setUser(user);
        });

        return () => unsubscribe();
      }, []);

      if (user) {
        return <div><AboutView></AboutView></div>;
      } else {
        return <div style={{margin: "100px", textAlign: "center", fontWeight: "bold"}}>Please log in to view the about</div>;
      }
}

export default AboutPresenter;