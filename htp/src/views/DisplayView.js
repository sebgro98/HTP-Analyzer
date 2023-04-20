import React from "react";

function DisplayView(props) {
    if (!props.data) {
        return <p>Loading data...</p>;
    }

    return (

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <p>WeatherDataTime: {props.data.WeatherDataTime}</p>
                <p>WeatherDataHumData: {props.data.WeatherDataHumData}</p>
                <p>WeatherDataTempData: {props.data.WeatherDataTempData}</p>
                <p>WeatherDataPresData: {props.data.WeatherDataPresData}</p>
                <p>WeatherDataDate: {props.data.WeatherDataDate}</p>
            </div>

    );
}

export default DisplayView;