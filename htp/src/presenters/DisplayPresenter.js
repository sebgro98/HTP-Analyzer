import React, { useEffect, useState } from "react";
import DisplayView from "../views/DisplayView";
import { db } from "../firebaseModel";
import { doc, onSnapshot, Timestamp } from "firebase/firestore";
import moment from "moment";

function DisplayPresenter({ model }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
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
      let date = data.Time[index];

      if (typeof date === "string") {
        // Try parsing the date string using multiple formats
        const formats = ["YYYY-MM-DD HH:mm:ss", "MMMM D, YYYY [at] HH:mm:ssA", "LLL"];
        for (const format of formats) {
          const parsedDate = moment(date, format);
          if (parsedDate.isValid()) {
            date = parsedDate.toDate();
            break;
          }
        }
      } else if (date instanceof Timestamp) {
        date = date.toDate();
      }

      return {
        date: date,
        value: Number(value),
      };
    });

    return formattedData;
  };

  return (
    <div>
      {error ? (
        <p className="noData">{error}</p>
      ) : (
        <DisplayView data={data} formatGraphData={formatGraphData} model={model} />
      )}
    </div>
  );
}

export default DisplayPresenter;
