import React, { useEffect, useState } from "react";
import Model from "../Model";
import DisplayView from "../views/DisplayView";
import { db } from "../firebaseModel";
import { doc, onSnapshot } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { atom, useRecoilState} from "recoil";

export const dataAtom = atom({
  key: "data",
  default: null
})

function DisplayPresenter() {
  const [data, setData] = useRecoilState(dataAtom);
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
      let date;
      if (typeof data.Time[index] === 'string') {
        date = new Date(data.Time[index]);
      } else if (data.Time[index] instanceof Timestamp) {
        date = data.Time[index].toDate();
      } else {
        return null;
      }

      return {
        date: date,
        value: Number(value),
      };
    }).filter((item) => item !== null);

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
