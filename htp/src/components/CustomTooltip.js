import React from "react";

const formatXAxis = (tickItem) => {
  const date = new Date(tickItem);
  const hours = date.getHours().toString().padStart(2, "0");
  return hours;
};

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

export {CustomTooltip, formatXAxis};
