import React, { useEffect, useState } from 'react';
import Model from "../Model";
import DisplayView from '../views/DisplayView';

import { db } from '../firebaseModel';
import { doc, onSnapshot } from "firebase/firestore";


function DisplayPresenter({darkMode}) {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const model = new Model();
            const user = await model.getUser();
            const docRef = doc(db, "Data", user.email);
            onSnapshot(docRef, (doc) => {
                setData(doc.data());
            })

        }
        fetchData();
    }, []);

    console.log('data:', data);

    return (
        <div className="DisplayPresenter">
            {data ? (
                <DisplayView darkMode = {darkMode} data={data} />
            ) : (
                <p>You need to sign in/register to see your data</p>
            )}
        </div>
    );
}

export default DisplayPresenter;