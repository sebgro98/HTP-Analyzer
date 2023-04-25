import React from 'react';
import hmdty from "./images/water_2.svg"
import temp from "./images/temperature-half-svgrepo-com.svg"
import prs from "./images/pressure-svgrepo-com.svg"
import "./Styled.css"

function DisplayView({ darkMode, data }) {
  if (!data) {
    return <p>Loading data...</p>;
  }

  const { humidity, temperature, pressure } = data;

  return (
    <div className={`card${darkMode ? 'Dark' : 'Light'}`}>
      <div className="column">
        <div className="box">
          <img className="svg-icon" src={hmdty} alt="Humidity" />
          <div className="measurement">Humidity</div>
          <div className="parameter">{humidity}%</div>
        </div>
      </div>

      <div className="column">
        <div className="box">
          <img className="svg-icon" src={temp} alt="Temperature" />
          <div className="measurement">Temperature</div>
          <div className="parameter">{temperature}&deg;C</div>
        </div>
      </div>

      <div className="column">
        <div className="box">
          <img className="svg-icon" src={prs} alt="Pressure" />
          <div className="measurement">Pressure</div>
          <div className="parameter">{pressure}hPa</div>
        </div>
      </div>
    </div>
  );
}

export default DisplayView;
