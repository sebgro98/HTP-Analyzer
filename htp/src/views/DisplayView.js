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
            <div className="measurement">Humidity</div>
            <div className="parameter">
              <span className="value">{WeatherData.Hum[0]}</span>
              <span>%</span>
            </div>
            <MaxMinPresenter
              maxName="CurrentIntervals.HumMax"
              minName="CurrentIntervals.HumMin"
              initMax={data.CurrentIntervals.HumMax}
              initMin={data.CurrentIntervals.HumMin}
            />
            {Array.isArray(WeatherData.Hum) && WeatherData.Hum.length > 0 && (
              <Graph
                data={formatGraphData(WeatherData, "Hum")}
                type="Hum"
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
              initMax={data.CurrentIntervals.TempMax}
              initMin={data.CurrentIntervals.TempMin}
              model={model}
            />
            {Array.isArray(WeatherData.Temp) && WeatherData.Temp.length > 0 && (
              <Graph
                data={formatGraphData(WeatherData, "Temp")}
                type="Temp"
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
              model={model}
            />
            {Array.isArray(WeatherData.Pres) && WeatherData.Pres.length > 0 && (
              <Graph
                data={formatGraphData(WeatherData, "Pres")}
                type="Pres"
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
