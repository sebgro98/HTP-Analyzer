import React, { useEffect, useState } from 'react';
import Model from '../Model';
import DisplayView from '../views/DisplayView';

function DisplayPresenter({ darkMode }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const model = new Model();
      console.log('Fetching data...');
      const result = await model.retrieveDataForEmail('hej@gmail.com');
      console.log('Data retrieved:', result);
      setData(result);
    }
    fetchData();
  }, []);

  console.log('Data:', data);

  return (
    <div className="DisplayPresenter">
      {data ? (
        <DisplayView darkMode={darkMode} data={data} />
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default DisplayPresenter;
