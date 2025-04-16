import React, { useEffect } from "react";

import LineChartComp from "./LineChartComp";

const FixChartPage = ({ category, grade, type, visualState }) => {
  const SectionDivider = ({ title, color }) => {
    const colorMap = {
      orange: "bg-[#f97316] text-white",
      purple: "bg-[#7E1891] text-white",
    };

    const colorClass = colorMap[color] || "bg-gray-100 text-gray-700 border-gray-300";
    return (
      <div className="flex items-center my-6">
        <div className="flex-1 border-t-4 border-gray-300" />
        <h2 className={`mx-4 px-4 py-1 text-lg font-bold ${colorClass} rounded-full`}>{title}</h2>
        <div className="flex-1 border-t-4 border-gray-300" />
      </div>
    );
  };

  return (
    <div>
      <div className="mb-10 space-y-10">
        <SectionDivider title="상" color="orange" />
        {visualState[0] && (
          <LineChartComp category={category} grade={grade} type={type} value="h" value2="h" />
        )}
        {visualState[1] && (
          <LineChartComp category={category} grade={grade} type={type} value="h" value2="m" />
        )}
        {visualState[2] && (
          <LineChartComp category={category} grade={grade} type={type} value="m" value2="h" />
        )}
        {visualState[3] && (
          <LineChartComp category={category} grade={grade} type={type} value="h" value2="l" />
        )}
        {visualState[4] && (
          <LineChartComp category={category} grade={grade} type={type} value="l" value2="h" />
        )}
        {visualState[5] && (
          <LineChartComp category={category} grade={grade} type={type} value="h" value2="x" />
        )}
        {visualState[6] && (
          <LineChartComp category={category} grade={grade} type={type} value="x" value2="h" />
        )}
        <SectionDivider title="중" color="purple" />
        {visualState[7] && (
          <LineChartComp category={category} grade={grade} type={type} value="m" value2="m" />
        )}
        {visualState[8] && (
          <LineChartComp category={category} grade={grade} type={type} value="m" value2="l" />
        )}
        {visualState[9] && (
          <LineChartComp category={category} grade={grade} type={type} value="l" value2="m" />
        )}
        {visualState[10] && (
          <LineChartComp category={category} grade={grade} type={type} value="m" value2="x" />
        )}
        {visualState[11] && (
          <LineChartComp category={category} grade={grade} type={type} value="x" value2="m" />
        )}
      </div>
    </div>
  );
};

export default FixChartPage;
