import React from "react";
import MaxMinPresenter from "../presenters/MaxMinPresenter";
import Graph from "../components/Graph";
import "./Styled.css";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { useRecoilState } from "recoil";
import { darkModeAtom } from "./MainPageView";

function DisplayView({ data, formatGraphData, model}) {
  const [darkMode] = useRecoilState(darkModeAtom);
  const { WeatherData, CurrentIntervals, Outlets } = data || {};

  if (
    !WeatherData?.Hum ||
    !WeatherData?.Temp ||
    !WeatherData?.Pres
  ) {
    return (
      <div className="loading">
        <img src="http://www.ppimusic.ie/images/loading_anim.gif" alt="Loading data..." />
      </div>
    );
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
            <div style={{marginTop: "10px", marginBottom: "5px"}}> 
            <span className="measurement">Humidity | </span>
              <span className="value">{WeatherData.Hum[WeatherData.Hum.length - 1]}</span>
              <span className="value"> %</span>
            </div>
            {Array.isArray(WeatherData.Hum) && WeatherData.Hum.length > 0 && (
              <Graph
                data={formatGraphData(WeatherData, "Hum")}
                type="Hum"
                darkMode={darkMode}
              />
            )}
            <MaxMinPresenter
              maxName="CurrentIntervals.HumMax"
              minName="CurrentIntervals.HumMin"
              initMax={data.CurrentIntervals.HumMax}
              initMin={data.CurrentIntervals.HumMin}
              model={model}
            />
          </div>
        </div>

        <div className="column">
          <div className="box">
            <DeviceThermostatIcon
              style={{ color: darkMode ? "#ffffff" : "#1a1a1a" }}
              sx={{ fontSize: 60 }}
            />
            <div style={{marginTop: "10px", marginBottom: "5px"}}> 
                <span className="measurement">Temperature  |  </span>
                <span className="value">{WeatherData.Temp[WeatherData.Temp.length - 1]}</span>
                <span className="value"> &deg;C</span>
            </div>
            {Array.isArray(WeatherData.Temp) && WeatherData.Temp.length > 0 && (
              <Graph
                data={formatGraphData(WeatherData, "Temp")}
                type="Temp"
                darkMode={darkMode}
              />
            )}
            <MaxMinPresenter
              maxName="CurrentIntervals.TempMax"
              minName="CurrentIntervals.TempMin"
              initMax={data.CurrentIntervals.TempMax}
              initMin={data.CurrentIntervals.TempMin}
              model={model}
            />
          </div>
        </div>

        <div className="column">
          <div className="box">
            <CompareArrowsIcon
              style={{ color: darkMode ? "#ffffff" : "#1a1a1a" }}
              sx={{ fontSize: 60 }}
            />
            <div style={{marginTop: "10px", marginBottom: "5px"}}> 
                <span className="measurement">Pressure | </span>
              <span className="value">{WeatherData.Pres[WeatherData.Pres.length - 1]}</span>
              <span className="value"> hPa</span>
            </div>
            {Array.isArray(WeatherData.Pres) && WeatherData.Pres.length > 0 && (
              <Graph
                data={formatGraphData(WeatherData, "Pres")}
                type="Pres"
                darkMode={darkMode}
              />
            )}
            <MaxMinPresenter
              maxName="CurrentIntervals.PresMax"
              minName="CurrentIntervals.PresMin"
              initMax={CurrentIntervals.PresMax}
              initMin={CurrentIntervals.PresMin}
              model={model}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DisplayView;
