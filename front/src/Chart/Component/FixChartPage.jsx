import React, { useEffect } from "react";

import LineChartComp from "./LineChartComp";
import SelectBox from "../../common/Component/SelectBox";

const FixChartPage = ({ category, grade, type, request, setRequest }) => {
  const SectionDivider = ({ title, color }) => {
    const colorMap = {
      orange: "bg-[#f97316] text-white",
      purple: "bg-[#7E1891] text-white",
    };

    const colorClass = colorMap[color] || "bg-gray-100 text-gray-700 border-gray-300";
    return (
      <div className="flex items-center m-10 ">
        <div className="flex-1 border-t-4 border-gray-300" />
        <h2 className={`mx-4 px-4 py-1 text-lg font-bold ${colorClass} rounded-full`}>{title}</h2>
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

  return (
    <div>
      <div className="mb-10 space-y-10">
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
