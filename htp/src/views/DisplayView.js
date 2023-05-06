import React, { useState, useEffect } from "react";
import MaxMinPresenter from "../presenters/MaxMinPresenter";
import Graph from "../components/Graph";
import "./Styled.css";
import { db } from "../firebaseModel";
import { collection, onSnapshot } from "firebase/firestore";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { darkModeAtom } from "../views/MainPageView";
import { useRecoilState } from "recoil";

function DisplayView() {
  const [data, setData] = useState({
    WeatherData: {},
    CurrentIntervals: {},
    Outlets: {},
  });

  const [darkMode] = useRecoilState(darkModeAtom);

  const { WeatherData, CurrentIntervals, Outlets } = data || {};

  const formatGraphData = (data, type) => {
    if (!data || Object.keys(data).length === 0) {
      return [];
    }
    const groupedData = [];
  
    data.forEach((item) => {
      if (!item.Time) {
        return;
      }
  
      const date = item.Time.toDate();
      const formattedDate = `${
        date.getMonth() + 1
      }, ${date.getDate()}, ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  
      const value = Number(item[type][0]); 
  
      groupedData.push({
        date: formattedDate,
        value,
      });
    });
  
    return groupedData;
  };
  
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Data"), (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      console.log("Checking data fetched from firestore");
      console.log("Data from Firebase:", data);
      console.log("End checking data fetched from firestore");
      console.log("New log statement");
      setData(data[0]);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (WeatherData) {
      console.log("================");
      console.log("WeatherData:", WeatherData);
      console.log("Type: humidity");
      console.log(
        "Formatted data:",
        formatGraphData(WeatherData.Hum, "humidity")
      );
      console.log("Type: temperature");
      console.log(
        "Formatted data:",
        formatGraphData(WeatherData.Temp, "temperature")
      );
      console.log("Type: pressure");
      console.log(
        "Formatted data:",
        formatGraphData(WeatherData.Pres, "pressure")
      );

      console.log("================");
    }
  }, [WeatherData]);

  if (
    !WeatherData ||
    !WeatherData.Hum ||
    !WeatherData.Temp ||
    !WeatherData.Pres
  ) {
    return <p>Loading data...</p>;
  }

  return (
    <div className="display-view">
      <div className={`card${darkMode ? "Dark" : "Light"}`}>
        <div className="column">
          <div className="box">
            <WaterDropIcon
              style={{ color: darkMode ? "#ffffff" : "#1a1a1a" }}
              sx={{ fontSize: 60 }}
            />
            <div className="measurement">Humidity</div>
            <div className="parameter">
              <span className="value">{WeatherData.Hum[0]}</span>
              <span>%</span>
            </div>
            <MaxMinPresenter
              maxName="CurrentIntervals.HumMax"
              minName="CurrentIntervals.HumMin"
              initMax={CurrentIntervals.HumMax}
              initMin={CurrentIntervals.HumMin}
            />
            {Array.isArray(WeatherData.Hum) && WeatherData.Hum.length > 0 && (
              <Graph
                data={formatGraphData(WeatherData.Hum)}
                type="humidity"
                darkMode={darkMode}
              />
            )}
          </div>
        </div>

        <div className="column">
          <div className="box">
            <DeviceThermostatIcon
              style={{ color: darkMode ? "#ffffff" : "#1a1a1a" }}
              sx={{ fontSize: 60 }}
            />
            <div className="measurement">Temperature</div>
            <div className="parameter">
              <span className="value">{WeatherData.Temp[0]}</span>
              <span>&deg;C</span>
            </div>
            <MaxMinPresenter
              maxName="CurrentIntervals.TempMax"
              minName="CurrentIntervals.TempMin"
              initMax={CurrentIntervals.TempMax}
              initMin={CurrentIntervals.TempMin}
            />
            {Array.isArray(WeatherData.Temp) && WeatherData.Temp.length > 0 && (
              <Graph
                data={formatGraphData(WeatherData.Temp)}
                type="temperature"
                darkMode={darkMode}
              />
            )}
          </div>
        </div>

        <div className="column">
          <div className="box">
            <CompareArrowsIcon
              style={{ color: darkMode ? "#ffffff" : "#1a1a1a" }}
              sx={{ fontSize: 60 }}
            />
            <div className="measurement">Pressure</div>
            <div className="parameter">
              <span className="value">{WeatherData.Pres[0]}</span>
              <span>hPa</span>
            </div>
            <MaxMinPresenter
              maxName="CurrentIntervals.PresMax"
              minName="CurrentIntervals.PresMin"
              initMax={CurrentIntervals.PresMax}
              initMin={CurrentIntervals.PresMin}
            />
            {Array.isArray(WeatherData.Pres) && WeatherData.Pres.length > 0 && (
              <Graph
                data={formatGraphData(WeatherData.Pres)}
                type="pressure"
                darkMode={darkMode}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DisplayView;
