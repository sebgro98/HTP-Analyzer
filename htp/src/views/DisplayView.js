import React from 'react';
import MaxMinPresenter from '../presenters/MaxMinPresenter';
import hmdty from "./images/water_2.svg"
import temp from "./images/temperature-half-svgrepo-com.svg"
import prs from "./images/pressure-svgrepo-com.svg"
import "./Styled.css"

function DisplayView({ darkMode, data }) {
  if (!data) {
    return <p>Loading data...</p>;
  }

  const { WeatherData } = data;
  
  return (
    <div className={`card${darkMode ? 'Dark' : 'Light'}`}>
      <div className="column">
        <div className="box">
          <img className="svg-icon" src={hmdty} alt="Humidity" />
          <div className="measurement">Humidity</div>
          <div className="parameter">
            <span className="value">{WeatherData.Hum[0]}</span>
            <span>%</span>
          </div>
          <MaxMinPresenter maxName = {"CurrentIntervals.HumMax"} minName = {"CurrentIntervals.HumMin"} initMax={100} initMin={12} />
        </div>
      </div>

      <div className="column">
        <div className="box">
          <img className="svg-icon" src={temp} alt="Temperature" />
          <div className="measurement">Temperature</div>
          <div className="parameter">
            <span className="value">{WeatherData.Temp[0]}</span>
            <span>&deg;C</span>
          </div>
          <MaxMinPresenter maxName = {"CurrentIntervals.TempMax"} minName = {"CurrentIntervals.TempMin"} initMax={28} initMin={2} />
        </div>
      </div>

      <div className="column">
        <div className="box">
          <img className="svg-icon" src={prs} alt="Pressure" />
          <div className="measurement">Pressure</div>
          <div className="parameter">
            <span className="value">{WeatherData.Pres[0]}</span>
            <span>hPa</span>
          </div>
          <MaxMinPresenter maxName = {"CurrentIntervals.PresMax"} minName = {"CurrentIntervals.PresMin"} initMax={1200} initMin={800} />
        </div>
      </div>
    </div>
  );
}

export default DisplayView;
