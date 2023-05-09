import React, { useEffect, useState } from "react";
import Model from "../Model";
import DisplayView from "../views/DisplayView";
import { db } from "../firebaseModel";
import { doc, onSnapshot, Timestamp } from "firebase/firestore";

function DisplayPresenter() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const model = new Model();
        const user = await model.getUser();
        if (!user) {
          setError("You need to sign in/register to see your data");
          return;
        }
        const docRef = doc(db, "Data", user.email);

        onSnapshot(docRef, (doc) => {
          const fetchedData = doc.data();
          if (!fetchedData?.WeatherData?.Time) {
            setError("Data is missing or incomplete");
            return;
          }
          setData(fetchedData);
          setError(null);
        });
      } catch (error) {
        setError("Error fetching data");
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const formatGraphData = (data, type) => {
    if (!data?.[type]?.length || !data?.Time?.length) {
      return [];
    }

    const formattedData = data[type].map((value, index) => {
      const date = data.Time[index] instanceof Timestamp ? data.Time[index].toDate() : data.Time[index];
      return {
        date: date,
        value: Number(value),
      };
    });

    return formattedData;
  };

  return (
    <div className="DisplayPresenter">
      {error ? (
        <p className="noData">{error}</p>
      ) : (
        <DisplayView data={data} formatGraphData={formatGraphData} />
      )}
    </div>
  );
}

export default DisplayPresenter;
