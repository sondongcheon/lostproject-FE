import React from "react";

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

const ItemsLineChartComp = ({ data }) => {
  return (
    <div className="flex m-10 border-b-2 border-red-200 bg-opacity-75 bg-white rounded-3xl">
      <div className="w-[80%] ">
        <h2 className="flex items-baseline justify-center text-center">
          {" "}
          <img
            className="w-8"
            src="https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_9_25.png"
          />{" "}
          {data.name}
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <ComposedChart
            data={data.stats}
            margin={{
              top: 5,
              right: 50,
              left: 40,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" className="text-xs" />
            <YAxis
              yAxisId="left"
              tickFormatter={(value) => value.toLocaleString() + "G"}
              domain={[
                0,
                (dataMax) => Math.max(Math.floor((dataMax * 1.2) / 10000) * 10000, 100000),
              ]}
            />
            <YAxis yAxisId="right" orientation="right" domain={[0, (dataMax) => dataMax * 1.5]} />

            <Tooltip
              content={({ payload, label }) => {
                if (!payload || payload.length === 0) return null;
                const data = payload[0].payload;
                return (
                  <div className="bg-white p-2 border rounded shadow-md">
                    <p>{label}</p> {/* X축 값 (예: 시간) */}
                    <p>{`${data.avgPrice.toLocaleString()} Gold`}</p>
                    <p>{`판매 수량: ${data.tradeCount}`}</p>
                  </div>
                );
              }}
            />
            <Legend />
            <Bar
              yAxisId="right"
              dataKey="tradeCount"
              name="판매 수량"
              fill="#6497bc"
              stroke="sliver"
              strokeWidth={1}
              barSize={10}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="avgPrice"
              name="전일 평균 거래가"
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div className="w-[20%] m-2 p-2 flex flex-col justify-center border-2 border-gray-500 rounded-xl h-[250px] text-sm">
        <p>실시간 현재 최저가 : {data?.currentMinPrice.toLocaleString()} G</p>
        <p>실시간 최근 거래가 : {data?.recentPrice.toLocaleString()} G</p>

        <br />
        <p>14일간 평균 거래가 : 구현중</p>
        <p>14일간 최저 거래가 : 구현중</p>
        <br />
      </div>
    </div>
  );
};

export default ItemsLineChartComp;
