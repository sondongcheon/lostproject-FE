import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const LineChartComp = ({ value, value2, name }) => {
  const loadData = () => {
    axios
      .get(`${process.env.REACT_APP_URL}/chart/info`, {
        params: { tier: 4, category: "neck", grade: "godae", value, value2 },
      })
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  const [data, setData] = useState([]);

  return (
    <div>
      <div className="border-b-2 border-red-200">
        <h2 className="text-center">{name}</h2>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 50,
              left: 40,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" className="text-xs" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="buyPrice"
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChartComp;
