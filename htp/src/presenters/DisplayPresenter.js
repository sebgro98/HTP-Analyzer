import React, { useEffect, useState } from 'react';
import Model from "../Model";
import DisplayView from '../views/DisplayView';


function DisplayPresenter({darkMode}) {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const model = new Model();
            const user = await model.getUser();
            console.log('fetching data...');
            const result = await model.retrieveDataForEmail(user.email);
            console.log(user.email)
            console.log('data retrieved:', result);
            setData(result);
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