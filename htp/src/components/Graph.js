import React, { useState, useEffect } from "react";
import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Box, Skeleton } from "@mui/material";
import { scaleOrdinal } from "d3-scale";
import { schemeSet2 } from "d3-scale-chromatic";

const Graph = ({ data, type, darkMode }) => {
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      const formattedData = data.map((d) => ({
        date: d.Time.toDate().toLocaleString(),
        value: d[type][0],
      }));
      setGraphData(formattedData);
    }
  }, [data, type]);

  const yAxisLabel =
    type === "humidity"
      ? "Humidity (%)"
      : type === "temperature"
      ? "Temperature (°C)"
      : "Pressure (hPa)";
  const xAxisLabel =
    type === "humidity"
      ? "Time (minutes)"
      : type === "temperature"
      ? "Time (hours)"
      : "Time (days)";

  const colorScale = scaleOrdinal().range(schemeSet2);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="custom-tooltip">
          <p className="value">{`${data.value} ${yAxisLabel}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <Box
      sx={{
        backgroundColor: darkMode ? "#1f1f1f" : "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", fontSize: "24px", margin: "0 0 20px" }}>
        {type === "humidity"
          ? "Humidity over Time"
          : type === "temperature"
          ? "Temperature over Time"
          : "Pressure over Time"}
      </h2>
      <h3 style={{ textAlign: "center", fontSize: "18px", margin: "0 0 10px" }}>
        {graphData.length > 0
          ? `Data from ${graphData[0].date} to ${
              graphData[graphData.length - 1].date
            }`
          : ""}
      </h3>
      {graphData.length === 0 ? (
        <Box>
          <Skeleton variant="rectangular" height={400} />
          <Skeleton variant="text" height={50} />
        </Box>
      ) : (
        <ComposedChart
          width={600}
          height={400}
          data={graphData}
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
          <Tooltip content={<CustomTooltip />} />
          <Legend fontSize={14} />
          <Line
            type="monotone"
            connectNulls
            data={graphData}
            name={type}
            dataKey="value"
            stroke={colorScale(0)}
            dot={false}
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
