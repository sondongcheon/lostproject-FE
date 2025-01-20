import React from "react";

import LineChartComp from "./LineChartComp";

const FixChartPage = ({ category, grade, type }) => {
  return (
    <div>
      <div className="mb-10">
        <LineChartComp category={category} grade={grade} type={type} value="h" value2="h" />
        <LineChartComp category={category} grade={grade} type={type} value="m" value2="m" />
        <LineChartComp category={category} grade={grade} type={type} value="l" value2="l" />
        <LineChartComp category={category} grade={grade} type={type} value="h" value2="x" />
        <LineChartComp category={category} grade={grade} type={type} value="x" value2="h" />
        <LineChartComp category={category} grade={grade} type={type} value="m" value2="x" />
        <LineChartComp category={category} grade={grade} type={type} value="x" value2="m" />
        <LineChartComp category={category} grade={grade} type={type} value="h" value2="m" />
        <LineChartComp category={category} grade={grade} type={type} value="m" value2="h" />
        <LineChartComp category={category} grade={grade} type={type} value="h" value2="l" />
        <LineChartComp category={category} grade={grade} type={type} value="l" value2="h" />
        <LineChartComp category={category} grade={grade} type={type} value="m" value2="l" />
        <LineChartComp category={category} grade={grade} type={type} value="l" value2="m" />
      </div>
    </div>
  );
};

export default FixChartPage;
