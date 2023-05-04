import React from 'react';
import MaxMinPresenter from '../presenters/MaxMinPresenter';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import "./Styled.css"
import { darkModeAtom } from '../views/MainPageView';
import { useRecoilState } from 'recoil';


function DisplayView({ data }) {
  const [darkMode] = useRecoilState(darkModeAtom);
  if (!data) {
    return <p>Loading data...</p>;
  }

  const { WeatherData } = data;
  
  return (
    <div className={`card${darkMode ? 'Dark' : 'Light'}`}>
      <div className="column">
        <div className="box">
        <WaterDropIcon style={{color: darkMode ? "#ffffff" : "#1a1a1a"}} sx={{ fontSize: 60 }}/>
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
          <DeviceThermostatIcon style={{color: darkMode ? "#ffffff" : "#1a1a1a"}} sx={{ fontSize: 60 }}/>
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
        <CompareArrowsIcon style={{color: darkMode ? "#ffffff" : "#1a1a1a"}} sx={{ fontSize: 60 }}/>
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
