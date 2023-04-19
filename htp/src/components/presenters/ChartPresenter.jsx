import ChartView from "./../views/ChartView";

//const labels = ["test1", "test2", "test3"];
const data = [
    {date: "2023-04-18 14:17", humidity: 16.6, temp: 25.3, pressure: 101.3},
    {date: "2024-04-18 14:17", humidity: 17.6, temp: 25.20, pressure: 100.3},
];



const ChartPresenter = () => {

    return (
        <ChartView 
           data = {data} 
        />
    )

}

export default ChartPresenter;
