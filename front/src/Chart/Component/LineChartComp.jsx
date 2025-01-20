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

const LineChartComp = ({ category, grade, value, value2, type }) => {
  const loadData = () => {
    axios
      .get(`${process.env.REACT_APP_URL}/chart/info`, {
        params: { tier: 4, category, grade, value, value2, type },
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
  }, [category, grade]);

  const [data, setData] = useState(null);

  return (
    <div>
      <div className="flex border-b-2 border-red-200">
        <div className=" w-[80%]">
          <h2 className="text-center">{data?.name}</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart
              data={data?.chartInfoList}
              margin={{
                top: 5,
                right: 50,
                left: 40,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" className="text-xs" />
              <YAxis tickFormatter={(value) => value.toLocaleString() + "G"} />
              <Tooltip formatter={(name) => [`${name.toLocaleString()} Gold`]} />
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
        <div className="w-[20%] m-2 p-2 border-2 border-gray-500 rounded-xl h-[200px] text-xs">
          <p>월간 평균가 : {data?.monthAvg?.toLocaleString()} G</p>
          <p> 변동 비율 : {data?.monthAvgP}%</p>
          <br />
          <p>월간 최저가 : {data?.monthMin?.toLocaleString()} G</p>
          <p> 변동 비율 : {data?.monthMinP}%</p>
          <br />
          <p>주간 평균가 : {data?.weeklyAvg?.toLocaleString()} G</p>
          <p> 변동 비율 : {data?.weeklyAvgP}%</p>
          <br />
          <p>주간 최저가 : {data?.weeklyMin?.toLocaleString()} G</p>
          <p> 변동 비율 : {data?.weeklyMinP}%</p>
        </div>
      </div>
    </div>
  );
};

export default LineChartComp;
