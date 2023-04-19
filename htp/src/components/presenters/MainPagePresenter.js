import React from "react";
import MainPageView from "./../views/MainPageView";
import ChartView from "./../views/ChartView";
import Chart from "chart.js/auto";

const data = [
    {date: "2023-04-18 14:17", humidity: 16.6, temp: 25.3, pressure: 101.3},
    {date: "2024-04-18 14:17", humidity: 17.6, temp: 25.20, pressure: 100.3},
];


const MainPage = () => {
    return (
        <MainPageView />
    );
}

export default MainPage;