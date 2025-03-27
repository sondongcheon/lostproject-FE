import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { BsFillQuestionCircleFill } from "react-icons/bs";

const LineChartJewelComp = ({ name, level, request, img }) => {
  const [hasMounted, setHasMounted] = useState(true);
  const loadData = () => {
    axios
      .get(`${process.env.REACT_APP_URL}/chart/jewel/info`, {
        params: {
          name,
          level,
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
    if (hasMounted) {
      setHasMounted(false);
    } else {
      loadData();
    }
  }, [name, level, request]);

  const [data, setData] = useState(null);

  return (
    <div>
      <div className="mt-10 border-b-2 border-red-200 bg-opacity-75 bg-white rounded-3xl">
        <div className="">
          <h2 className="flex items-center justify-center text-center">
            <img className="w-8" src={img} />
            {data?.name?.split(/(7|8|9|10)/g).map((part, index) =>
              ["10"].includes(part) ? (
                <span key={index} className="font-bold text-xl text-[#E38E49]">
                  {part}
                </span>
              ) : ["9"].includes(part) ? (
                <span key={index} className="font-bold text-xl text-[#7E1891]">
                  {part}
                </span>
              ) : ["8"].includes(part) ? (
                <span key={index} className="font-bold text-xl text-[#0A3981]">
                  {part}
                </span>
              ) : ["7"].includes(part) ? (
                <span key={index} className="font-bold text-xl text-[#000000]">
                  {part}
                </span>
              ) : (
                part
              )
            )}
          </h2>
          {/* <img className="" src={neckHH} alt="" /> */}
          <ResponsiveContainer width="100%" height={250}>
            <ComposedChart
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
              <YAxis yAxisId="left" tickFormatter={(value) => value.toLocaleString() + "G"} />
              <YAxis yAxisId="right" orientation="right" domain={[0, (dataMax) => dataMax * 2]} />

              <Tooltip
                content={({ payload, label }) => {
                  if (!payload || payload.length === 0) return null;
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white p-2 border rounded shadow-md">
                      <p>{label}</p> {/* X축 값 (예: 시간) */}
                      <p>{`${data.buyPrice.toLocaleString()} Gold`}</p>
                      <p>{`경매장 등록 수량: ${data.totalCount}`}</p>
                    </div>
                  );
                }}
              />
              <Legend />
              <Bar
                yAxisId="right"
                dataKey="totalCount"
                name="경매장 등록 수량"
                fill="#6497bc"
                stroke="sliver"
                strokeWidth={1}
                barSize={10}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="buyPrice"
                name="등록 가격"
                stroke="#8884d8"
                strokeWidth={2}
                dot={{ r: 5 }}
                activeDot={{ r: 8 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div className="items-center flex m-2 p-2 border-2 border-gray-500 rounded-xl size-font-xxs text-center">
          <div className="w-[45%]">
            <p>월간 평균가 : {data?.monthAvg?.toLocaleString()} G</p>
            <p> 변동 비율 : {data?.monthAvgP}%</p>
            <br />
            <p>월간 최저가 : {data?.monthMin?.toLocaleString()} G</p>
            <p> 변동 비율 : {data?.monthMinP}%</p>
          </div>
          <div className="w-[45%]">
            <p>주간 평균가 : {data?.weeklyAvg?.toLocaleString()} G</p>
            <p> 변동 비율 : {data?.weeklyAvgP}%</p>
            <br />
            <p>주간 최저가 : {data?.weeklyMin?.toLocaleString()} G</p>
            <p> 변동 비율 : {data?.weeklyMinP}%</p>
          </div>
          <div className="w-[10%]">
            <div className="flex group relative">
              <BsFillQuestionCircleFill className="w-1/3 h-full" />
              <div className="absolute top-full w-[550%] px-3 py-2 text-start bg-gray-800 text-white size-font-xxxs rounded shadow-lg opacity-0 visibility-hidden pointer-events-none group-hover:opacity-100 group-hover:visibility-visible group-hover:pointer-events-auto transition-opacity duration-300 right-0">
                평균, 최저 기준입니다. <br />
                7, 30일 전 부터 금일까지의 매물 데이터의 가격의 평균 → 주간, 월간 평균가 <br />
                7, 30일 전 부터 금일까지의 매물 데이터중 가장 낮은가격 → 주간,월간 최저가 <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LineChartJewelComp;
