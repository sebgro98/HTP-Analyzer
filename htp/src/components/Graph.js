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
        //date: d.timestamp.toDate().toLocaleString(),
        value: d[type],
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
    <Box>
      {graphData.length === 0 ? (
        <Box>
          <Skeleton variant="rectangular" height={400} />
          <Skeleton variant="text" height={50} />
        </Box>
      ) : (
        <ComposedChart
          width={500}
          height={400}
          data={graphData}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            // dataKey="date"
            // label={{ dy: 10, fontSize: 14 }}
            // padding={{ left: 20, right: 20 }}
            // tick={{ fontSize: 12 }}
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
            x={260}
            y={400}
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
