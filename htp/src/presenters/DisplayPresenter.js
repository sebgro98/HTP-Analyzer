import React, { useEffect, useState } from 'react';
import Model from "../Model";
import DisplayView from '../views/DisplayView';


function DisplayPresenter({darkMode}) {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const model = new Model();
            console.log('fetching data...');
            const result = await model.retrieveDataForEmail('hej@gmail.com');
            console.log('data retrieved:', result);
            setData(result);
        }
        fetchData();
    }, []);

    console.log('data:', data);

    return (
        <div className="DisplayPresenter">
            <h1>Display Data</h1>
            {data ? (
                <DisplayView darkMode = {darkMode} data={data} />
            ) : (
                <p>Loading data...</p>
            )}
        </div>
    );
}

export default DisplayPresenter;