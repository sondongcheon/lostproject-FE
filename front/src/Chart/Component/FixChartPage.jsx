import React, { useEffect } from "react";

import LineChartComp from "./LineChartComp";
import SelectBox from "../../common/Component/SelectBox";

const FixChartPage = ({ category, grade, type, request, setRequest }) => {
  const SectionDivider = ({ title, color }) => {
    const colorMap = {
      orange: "bg-orange-100 text-orange-500",
      purple: "bg-purple-100 text-purple-500",
    };

    const colorClass = colorMap[color] || "bg-gray-100 text-gray-700 border-gray-300";
    return (
      <div className="flex items-center my-6">
        <div className="flex-1 border-t-4 border-gray-300" />
        <h2 className={`mx-4 px-4 py-1 text-lg font-bold ${colorClass} rounded`}>{title}</h2>
        <div className="flex-1 border-t-4 border-gray-300" />
      </div>
    );
  };

  const updateOption = (key, value) => {
    setRequest((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  useEffect(() => {
    updateOption("time", 8);
    updateOption("point", 15);
  }, []);

  const pointList = [
    {
      value: 10,
      content: "10개",
    },
    {
      value: 15,
      content: "15개",
    },
    {
      value: 20,
      content: "20개",
    },
  ];

  const timeList = [
    {
      value: 1,
      content: "1시간 간격",
    },
    {
      value: 2,
      content: "2시간 간격",
    },
    {
      value: 4,
      content: "4시간 간격",
    },
    {
      value: 8,
      content: "8시간 간격",
    },
    {
      value: 12,
      content: "12시간 간격",
    },
  ];

  return (
    <div>
      <div className="mb-10 space-y-10">
        <div className="grid grid-cols-2 font-bold">
          <div className="flex justify-center">
            <span>조회 시간 주기 -&nbsp;</span>
            <SelectBox
              options={timeList}
              value={request.time}
              name="time"
              onOptionsChange={updateOption}
              css="text-center rounded-xl border-gray-400 border-2 bg-[#F5F5F5]"
            />
          </div>
          <div className="flex justify-center">
            <span>검색 지점 갯수 -&nbsp;</span>
            <SelectBox
              options={pointList}
              value={request.point}
              name="point"
              onOptionsChange={updateOption}
              css="text-center rounded-xl border-gray-400 border-2 bg-[#F5F5F5]"
            />
          </div>
        </div>
        <SectionDivider title="상" color="orange" />
        <LineChartComp
          category={category}
          grade={grade}
          type={type}
          value="h"
          value2="h"
          request={request}
        />
        <LineChartComp
          category={category}
          grade={grade}
          type={type}
          value="h"
          value2="m"
          request={request}
        />
        <LineChartComp
          category={category}
          grade={grade}
          type={type}
          value="m"
          value2="h"
          request={request}
        />
        <LineChartComp
          category={category}
          grade={grade}
          type={type}
          value="h"
          value2="l"
          request={request}
        />
        <LineChartComp
          category={category}
          grade={grade}
          type={type}
          value="l"
          value2="h"
          request={request}
        />
        <LineChartComp
          category={category}
          grade={grade}
          type={type}
          value="h"
          value2="x"
          request={request}
        />
        <LineChartComp
          category={category}
          grade={grade}
          type={type}
          value="x"
          value2="h"
          request={request}
        />
        <SectionDivider title="중" color="purple" />
        <LineChartComp
          category={category}
          grade={grade}
          type={type}
          value="m"
          value2="m"
          request={request}
        />
        <LineChartComp
          category={category}
          grade={grade}
          type={type}
          value="m"
          value2="l"
          request={request}
        />
        <LineChartComp
          category={category}
          grade={grade}
          type={type}
          value="l"
          value2="m"
          request={request}
        />
        <LineChartComp
          category={category}
          grade={grade}
          type={type}
          value="m"
          value2="x"
          request={request}
        />
        <LineChartComp
          category={category}
          grade={grade}
          type={type}
          value="x"
          value2="m"
          request={request}
        />
      </div>
    </div>
  );
};

export default FixChartPage;
