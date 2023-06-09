import React from "react";
import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Box } from "@mui/material";
import { scaleOrdinal } from "d3-scale";
import { schemeSet2 } from "d3-scale-chromatic";
import { CustomTooltip, formatXAxis, } from "./CustomTooltip";

const Graph = ({ data, type, darkMode }) => {
  console.log("Checking:");
  console.log("Graph Data:", data);
  console.log("Done Checking:");

  let yAxisLabel;
  let xAxisLabel;

  if (type === "Hum") {
    yAxisLabel = "Humidity (%)";
    xAxisLabel = "Time (hours)";
  } else if (type === "Temp") {
    yAxisLabel = "Temperature (°C)";
    xAxisLabel = "Time (hours)";
  } else {
    yAxisLabel = "Pressure (hPa)";
    xAxisLabel = "Time (hours)";
  }
  const colorScale = scaleOrdinal().range(schemeSet2);

  let graphTitle;
  if (type === "Hum") {
    graphTitle = "";
  } else if (type === "Temp") {
    graphTitle = "";
  } else {
    graphTitle = "";
  }

  return (
    <Box
      sx={{
        backgroundColor: darkMode ? "#1f1f1f" : "#fff",
        padding: "5px",
        borderRadius: "5px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", fontSize: "20px", margin: "0 0 20px" }}>
        {graphTitle}
      </h2>

      {!data.length ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 200,
          }}
        >
          <img
            src="https://tenor.com/view/minecraft-pink-spin-gif-14444226"
            alt="Loading data..."
            style={{ maxWidth: "30%", maxHeight: "30%" }}
          />
        </Box>
      ) : (
        <ComposedChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid opacity={0.3} />
          <XAxis
            dataKey="date"
            label={{ dy: 10, fontSize: 14 }}
            padding={{ left: 20, right: 20 }}
            tick={{ fontSize: 12 }}
            tickFormatter={formatXAxis}
          />
          <YAxis
            label={{
              value: yAxisLabel,
              angle: -90,
              position: "insideLeft",
              fontSize: 14,
            }}
            padding={{ top: 20, bottom: 20 }}
            domain={["auto", "auto"]}
            tick={{ fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip yAxisLabel={yAxisLabel} />} />
          <Legend fontSize={14} />
          <Line
            type="monotone"
            connectNulls
            data={data}
            name={type}
            dataKey="value"
            stroke={colorScale(0)}
            dot={true}
          />
          <text
            x={300}
            y={420}
            textAnchor="middle"
            fontSize={14}
            fontWeight="bold"
          >
            {xAxisLabel}
          </text>
        </ComposedChart>
      )}
    </Box>
  );
};

export default Graph;
