import Chart from "chart.js/auto";



export default function ChartView(props) {

    function mapToChart() {
        new Chart(
            document.getElementById("htp-chart"), 
            {
                type: 'line',
                data: {
                    labels: props.data.map(entry => entry.year),
                    datasets: [
                        {
                            label: "A.I. with the braids",
                            data: props.data.map(entry => entry.humidity)
                        }
                    ]
                }
            }
        )
    }

    return (
        <div>
            <head> 
                <title> Shart Chart </title>
            </head>
        <body>
            <div> 
                <canvas id="htp-chart"> {props.date} </canvas> 
                <script type="module" src={mapToChart()}></script>
            </div>
        </body>
        </div>
    )

}

