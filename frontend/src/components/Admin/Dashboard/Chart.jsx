import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

export default function Chart({ xAxis, series, colour }) {
  return (
    <LineChart
      xAxis={[
        {
          data: xAxis, 
          scaleType: "band", 
          labelFormatter: (value) => {
            const date = new Date(value);
            return date.toISOString().split('T')[0]; 
          },
        },
      ]}
      series={[
        {
          data: series,
          area: true,
          color: colour,
        },
      ]}
      width={500}
      height={300}
      sx={{
        backgroundColor: "#f0f0f0",
        borderRadius: "8px",
        padding: "10px",
      }}
    />
  );
}
