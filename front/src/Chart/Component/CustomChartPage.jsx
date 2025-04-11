import React, { useState, useEffect } from "react";
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

import SelectBox from "../../common/Component/SelectBox";

const CustomChartPage = () => {
  const neck = [
    {
      value: 1,
      content: "고대 - 상상",
    },
    {
      value: 2,
      content: "고대 - 중중",
    },
    {
      value: 3,
      content: "고대 - 하하",
    },
    {
      value: 4,
      content: "고대 - 추피 상/ 적주피 중",
    },
    {
      value: 5,
      content: "고대 - 추피 중/ 적주피 상",
    },
    {
      value: 6,
      content: "고대 - 추피 상/ 적주피 하",
    },
    {
      value: 7,
      content: "고대 - 추피 하/ 적주피 상",
    },
    {
      value: 8,
      content: "고대 - 추피 중/ 적주피 하",
    },
    {
      value: 9,
      content: "고대 - 추피 하/ 적주피 중",
    },
    {
      value: 10,
      content: "고대 - 추피 상",
    },
    {
      value: 11,
      content: "고대 - 적주피 상",
    },
    {
      value: 12,
      content: "고대 - 추피 중",
    },
    {
      value: 13,
      content: "고대 - 적주피 중",
    },
    {
      value: 14,
      content: "유물 - 상상",
    },
    {
      value: 15,
      content: "유물 - 중중",
    },
    {
      value: 16,
      content: "유물 - 하하",
    },
    {
      value: 17,
      content: "유물 - 추피 상/ 적주피 중",
    },
    {
      value: 18,
      content: "유물 - 추피 중/ 적주피 상",
    },
    {
      value: 19,
      content: "유물 - 추피 상/ 적주피 하",
    },
    {
      value: 20,
      content: "유물 - 추피 하/ 적주피 상",
    },
    {
      value: 21,
      content: "유물 - 추피 중/ 적주피 하",
    },
    {
      value: 22,
      content: "유물 - 추피 하/ 적주피 중",
    },
    {
      value: 23,
      content: "유물 - 추피 상",
    },
    {
      value: 24,
      content: "유물 - 적주피 상",
    },
    {
      value: 25,
      content: "유물 - 추피 중",
    },
    {
      value: 26,
      content: "유물 - 적주피 중",
    },
  ];
  const earing = [
    {
      value: 101,
      content: "고대 - 상상",
    },
    {
      value: 102,
      content: "고대 - 중중",
    },
    {
      value: 103,
      content: "고대 - 하하",
    },
    {
      value: 104,
      content: "고대 - 공% 상/ 무공% 중",
    },
    {
      value: 105,
      content: "고대 - 공% 중/ 무공% 상",
    },
    {
      value: 106,
      content: "고대 - 공% 상/ 무공% 하",
    },
    {
      value: 107,
      content: "고대 - 공% 하/ 무공% 상",
    },
    {
      value: 108,
      content: "고대 - 공% 중/ 무공% 하",
    },
    {
      value: 109,
      content: "고대 - 공% 하/ 무공% 중",
    },
    {
      value: 110,
      content: "고대 - 공% 상",
    },
    {
      value: 111,
      content: "고대 - 무공% 상",
    },
    {
      value: 112,
      content: "고대 - 공% 중",
    },
    {
      value: 113,
      content: "고대 - 무공% 중",
    },
    {
      value: 114,
      content: "유물 - 상상",
    },
    {
      value: 115,
      content: "유물 - 중중",
    },
    {
      value: 116,
      content: "유물 - 하하",
    },
    {
      value: 117,
      content: "유물 - 공% 상/ 무공% 중",
    },
    {
      value: 118,
      content: "유물 - 공% 중/ 무공% 상",
    },
    {
      value: 119,
      content: "유물 - 공% 상/ 무공% 하",
    },
    {
      value: 120,
      content: "유물 - 공% 하/ 무공% 상",
    },
    {
      value: 121,
      content: "유물 - 공% 중/ 무공% 하",
    },
    {
      value: 122,
      content: "유물 - 공% 하/ 무공% 중",
    },
    {
      value: 123,
      content: "유물 - 공% 상",
    },
    {
      value: 124,
      content: "유물 - 무공% 상",
    },
    {
      value: 125,
      content: "유물 - 공% 중",
    },
    {
      value: 126,
      content: "유물 - 무공% 중",
    },
  ];
  const ring = [
    {
      value: 201,
      content: "고대 - 상상",
    },
    {
      value: 202,
      content: "고대 - 중중",
    },
    {
      value: 203,
      content: "고대 - 하하",
    },
    {
      value: 204,
      content: "고대 - 치적% 상/ 치피% 중",
    },
    {
      value: 205,
      content: "고대 - 치적% 중/ 치피% 상",
    },
    {
      value: 206,
      content: "고대 - 치적% 상/ 치피% 하",
    },
    {
      value: 207,
      content: "고대 - 치적% 하/ 치피% 상",
    },
    {
      value: 208,
      content: "고대 - 치적% 중/ 치피% 하",
    },
    {
      value: 209,
      content: "고대 - 치적% 하/ 치피% 중",
    },
    {
      value: 210,
      content: "고대 - 치명타 적중 상",
    },
    {
      value: 211,
      content: "고대 - 치명타 피해 상",
    },
    {
      value: 212,
      content: "고대 - 치명타 적중 중",
    },
    {
      value: 213,
      content: "고대 - 치명타 피해 중",
    },
    {
      value: 214,
      content: "유물 - 상상",
    },
    {
      value: 215,
      content: "유물 - 중중",
    },
    {
      value: 216,
      content: "유물 - 하하",
    },
    {
      value: 217,
      content: "유물 - 치적% 상/ 치피% 중",
    },
    {
      value: 218,
      content: "유물 - 치적% 중/ 치피% 상",
    },
    {
      value: 219,
      content: "유물 - 치적% 상/ 치피% 하",
    },
    {
      value: 220,
      content: "유물 - 치적% 하/ 치피% 상",
    },
    {
      value: 221,
      content: "유물 - 치적% 중/ 치피% 하",
    },
    {
      value: 222,
      content: "유물 - 치적% 하/ 치피% 중",
    },
    {
      value: 223,
      content: "유물 - 치명타 적중 상",
    },
    {
      value: 224,
      content: "유물 - 치명타 피해 상",
    },
    {
      value: 225,
      content: "유물 - 치명타 적중 중",
    },
    {
      value: 226,
      content: "유물 - 치명타 피해 중",
    },
  ];

  const [request, setRequest] = useState({});
  const [data, setData] = useState("");

  const updateOption = (key, value) => {
    setRequest((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const search = () => {
    axios
      .post(`${process.env.REACT_APP_URL}/chart/custom`, request)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div>
      <div>
        <div className="flex justify-center gap-10 text-xs">
          <div>
            <p className="text-center">목걸이</p>
            <SelectBox
              options={neck}
              value={request.box1}
              name="box1"
              onOptionsChange={updateOption}
              css="text-center rounded-xl border-gray-400 border-2 bg-[#F5F5F5]"
            />
          </div>
          <div>
            <p className="text-center">귀걸이1</p>
            <SelectBox
              options={earing}
              value={request.box2}
              name="box2"
              onOptionsChange={updateOption}
              css="text-center rounded-xl border-gray-400 border-2 bg-[#F5F5F5]"
            />
          </div>
          <div>
            <p className="text-center">귀걸이2</p>
            <SelectBox
              options={earing}
              value={request.box3}
              name="box3"
              onOptionsChange={updateOption}
              css="text-center rounded-xl border-gray-400 border-2 bg-[#F5F5F5]"
            />
          </div>
          <div>
            <p className="text-center">반지1</p>
            <SelectBox
              options={ring}
              value={request.box4}
              name="box4"
              onOptionsChange={updateOption}
              css="text-center rounded-xl border-gray-400 border-2 bg-[#F5F5F5]"
            />
          </div>
          <div>
            <p className="text-center">반지2</p>
            <SelectBox
              options={ring}
              value={request.box5}
              name="box5"
              onOptionsChange={updateOption}
              css="text-center rounded-xl border-gray-400 border-2 bg-[#F5F5F5]"
            />
          </div>
          <button className="normalBtm" onClick={search}>
            {""}
            검색하기{""}
          </button>
        </div>
        <div className="flex m-10 border-b-2 border-red-200 bg-opacity-75 bg-white rounded-2xl">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={data.chartInfoList}
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
      </div>
      <div className="items-center grid grid-cols-2 m-2 p-2 border-2 border-gray-500 rounded-xl text-center bg-opacity-50 bg-white">
        <div className="">
          <p>주간 평균가 : {data?.weeklyAvg?.toLocaleString()} G</p>
          <p> 변동 비율 : {data?.weeklyAvgP}%</p>
        </div>
        <div className="">
          <p>주간 최저가 : {data?.weeklyMin?.toLocaleString()} G</p>
          <p> 변동 비율 : {data?.weeklyMinP}%</p>
        </div>
      </div>
    </div>
  );
};

export default CustomChartPage;
