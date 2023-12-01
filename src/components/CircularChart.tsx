import React from "react";
import "./CircularChart.css"; // Import CSS module

interface CircularChartProps {
  percentage: number;
}

const CircularChart: React.FC<CircularChartProps> = ({ percentage }) => {
  const color = percentage > 70 ? `rgb(13, 194, 13)` : `rgb(255,100,100)`;

  return (
    <svg viewBox="0 0 36 36" className="circular-chart orange">
      <path className="circle-bg"
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <path className="circle"
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
          style={{strokeDasharray: `${percentage}, 100`, stroke: color}}
      />
      <text x="18" y="20.35" className="percentage">{percentage}%</text>
    </svg>
  );
};

export default CircularChart;
