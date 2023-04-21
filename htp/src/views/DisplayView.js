import React from 'react';
import hmdty from "./images/water_2.svg"
import temp from "./images/temperature-half-svgrepo-com.svg"
import prs from "./images/pressure-svgrepo-com.svg"

function DisplayView({darkMode, data}) {
    if (!data) {
        return <p>Loading data...</p>;
    }
    return (
        <div className={darkMode ? 'cardDark' : 'cardLight'}>
        <div id="humidity" className="heading">
         <div>
           <img class="svg-icon" src={hmdty} /> Humidity
         </div>
         <div class="value-container">
           <span className='value'>{data.WeatherDataHumData}</span>
           <span class="unit">%</span>
         </div>
       </div>

       <div id="temperature" className="heading">
         <div>
           <img class="svg-icon" src={temp} />
           Temperature
         </div>
         <div class="value-container">
           <span className='value'>{data.WeatherDataTempData}</span>
           <span class="unit">&deg;C</span>
         </div>
       </div>
      
       <div id="pressure" className="heading">
         <div>
           <img class="svg-icon" src={prs}/> Pressure
         </div>
         <div class="value-container">
           <span className='value'>{data.WeatherDataPresData}</span>
           <span class="unit">hPa</span>
         </div>
       </div>
   </div>
 );
}



export default DisplayView;

