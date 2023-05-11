import React from "react";

const formatXAxis = (tickItem) => {
  const date = new Date(tickItem);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

const formatTime = (date) =>
date.toLocaleString(undefined, {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
});

const CustomTooltip = ({ active, payload, yAxisLabel }) => {
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

export {CustomTooltip, formatXAxis, formatTime};
