import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Chart({ data }) {
  let min = Infinity;
  let max = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i]["low"] < min) min = data[i]["low"];
    if (data[i]["high"] > max) max = data[i]["high"];
  }
  let pad = (max - min) * 0.2;
  let domain = [];
  if (pad > 1) domain = [Math.round(min - pad), Math.round(max + pad)];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis dataKey="time" />
        <YAxis domain={domain} />
        <Tooltip
          animationEasing="ease-in-out"
          contentStyle={{ backgroundColor: "var(--background-color1)" }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="open"
          stroke="white"
          activeDot={{ r: 4 }}
        />
        <Line
          type="monotone"
          dataKey="close"
          stroke="lightblue"
          activeDot={{ r: 4 }}
        />
        <Line
          type="monotone"
          dataKey="high"
          stroke="green"
          activeDot={{ r: 4 }}
        />
        <Line type="monotone" dataKey="low" stroke="red" activeDot={{ r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
