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
    <div className=" border-b-2 border-red-200 bg-opacity-75 bg-white rounded-3xl">
      <div className="">
        <h2 className="flex items-center justify-center text-center">
          {" "}
          <img
            className="w-8"
            src="https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_9_25.png"
          />{" "}
          {data.name}
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <ComposedChart
            data={data.stats.slice(-5)}
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
                (dataMax) =>
                  Math.max(
                    Math.floor((dataMax * 1.2) / 10000) * 10000,
                    dataMax > 50000
                      ? 100000
                      : dataMax > 30000
                      ? 50000
                      : dataMax > 10000
                      ? 30000
                      : dataMax > 5000
                      ? 10000
                      : 5000
                  ),
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
      <div className="m-2 flex flex-col items-center justify-center border-2 border-gray-500 rounded-xl size-font-sm text-center">
        <p>
          실시간 현재 최저가 <br />
          <span className="font-bold size-font-2xl">
            {data?.currentMinPrice.toLocaleString()} G
          </span>
        </p>
        <p className="size-font-2xs">
          전일, 현재 차액
          {data?.stats?.length > 0
            ? (() => {
                const prev = data.stats.at(-1).avgPrice;
                const current = data.currentMinPrice;
                const diff = current - prev;
                const percent = (diff / prev) * 100;
                const isUp = diff > 0;

                return (
                  <span className={isUp ? "text-green-500" : "text-red-500"}>
                    {isUp ? "▲" : "▼"} {diff.toLocaleString()} G ({percent.toFixed(1)}%)
                  </span>
                );
              })()
            : "-?"}
        </p>
        <br />
        <p>
          실시간 최근 거래가 <br />
          <span className="font-bold size-font-2xl">{data?.recentPrice.toLocaleString()} G</span>
        </p>
        {/* <p>14일간 평균 거래가 : 구현중</p>
        <p>14일간 최저 거래가 : 구현중</p> */}
      </div>
    </div>
  );
};

export default ItemsLineChartComp;
