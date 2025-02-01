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

const LineChartComp = ({ category, grade, value, value2, type, request }) => {
  const loadData = () => {
    axios
      .get(`${process.env.REACT_APP_URL}/chart/info`, {
        params: {
          tier: 4,
          category,
          grade,
          value,
          value2,
          type,
          time: request.time,
          point: request.point,
        },
      })
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    loadData();
  }, [category, grade, type, request]);

  const [data, setData] = useState(null);

  return (
    <div>
      <div className="mt-10 border-b-2 border-red-200 bg-opacity-75 bg-white rounded-3xl">
        <div className="">
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
              <Tooltip
                content={({ payload, label }) => {
                  if (!payload || payload.length === 0) return null;
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white p-2 border rounded dow-md">
                      <p>{label}</p> {/* X축 값 (예: 시간) */}
                      <p>{`${data.buyPrice.toLocaleString()} Gold`}</p>
                      <p>{`경매장 등록 수량: ${data.totalCount}`}</p>
                    </div>
                  );
                }}
              />
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
        <div className="items-center grid grid-cols-2 m-2 p-2 border-2 border-gray-500 rounded-xl text-xs text-center">
          <div className="">
            <p>월간 평균가 : {data?.monthAvg?.toLocaleString()} G</p>
            <p> 변동 비율 : {data?.monthAvgP}%</p>
            <br />
            <p>월간 최저가 : {data?.monthMin?.toLocaleString()} G</p>
            <p> 변동 비율 : {data?.monthMinP}%</p>
          </div>
          <div className="">
            <p>주간 평균가 : {data?.weeklyAvg?.toLocaleString()} G</p>
            <p> 변동 비율 : {data?.weeklyAvgP}%</p>
            <br />
            <p>주간 최저가 : {data?.weeklyMin?.toLocaleString()} G</p>
            <p> 변동 비율 : {data?.weeklyMinP}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LineChartComp;
