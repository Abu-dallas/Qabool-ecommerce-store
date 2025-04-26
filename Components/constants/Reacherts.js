"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
const data = [
  { name: "JANUARY", sales: 400, pv: 2400, amt: 2400 },
  { name: "APRIL", sales: 600, pv: 3400, amt: 3200 },
  { name: "MAY", sales: 200, pv: 1400, amt: 2200 },

  { name: "JULY", sales: 300, pv: 1800, amt: 2900 },

  { name: "SEPTEMBER", sales: 200, pv: 1400, amt: 2200 },

  { name: "DECEMBER", sales: 600, pv: 3400, amt: 3200 },
];

const RenderBarChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart width={600} height={100} data={data}>
        <XAxis dataKey="name" stroke="#8884d8" />
        <YAxis />
        <Tooltip wrapperStyle={{ width: 100, backgroundColor: "#ccc" }} />
        <Legend
          width={100}
          wrapperStyle={{
            top: 40,
            right: 20,
            backgroundColor: "#f5f5f5",
            border: "1px solid #d5d5d5",
            borderRadius: 3,
            lineHeight: "40px",
          }}
        />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Bar dataKey="sales" fill="#8884d8" barSize={30} />
      </BarChart>
      ;
    </ResponsiveContainer>
  );
};
export default RenderBarChart;
