import React from "react";

import LineChartComp from "./LineChartComp";

const FixChartPage = ({ category, grade }) => {
  return (
    <div>
      <div className="mb-10">
        <LineChartComp category={category} grade={grade} value="h" value2="h" name="상 상" />
        <LineChartComp category={category} grade={grade} value="m" value2="m" name="중 중" />
        <LineChartComp category={category} grade={grade} value="l" value2="l" name="하 하" />
        <LineChartComp category={category} grade={grade} value="h" value2="x" name="상 X" />
        <LineChartComp category={category} grade={grade} value="x" value2="h" name="X 상" />
        <LineChartComp category={category} grade={grade} value="m" value2="x" name="중 X" />
        <LineChartComp category={category} grade={grade} value="x" value2="m" name="X 중" />
        <LineChartComp category={category} grade={grade} value="h" value2="m" name="상 중" />
        <LineChartComp category={category} grade={grade} value="x" value2="h" name="중 상" />
        <LineChartComp category={category} grade={grade} value="h" value2="l" name="상 하" />
        <LineChartComp category={category} grade={grade} value="l" value2="h" name="하 상" />
        <LineChartComp category={category} grade={grade} value="m" value2="l" name="중 하" />
        <LineChartComp category={category} grade={grade} value="l" value2="h" name="하 중" />
      </div>
    </div>
  );
};

export default FixChartPage;
