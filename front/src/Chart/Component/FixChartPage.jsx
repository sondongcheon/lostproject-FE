import React from "react";

import LineChartComp from "./LineChartComp";

const FixChartPage = () => {
  return (
    <div>
      <div className="">
        <LineChartComp value="h" value2="h" name="상 상" />
        <LineChartComp value="m" value2="m" name="중 중" />
        <LineChartComp value="l" value2="l" name="하 하" />
        <LineChartComp value="h" value2="x" name="상 X" />
        <LineChartComp value="x" value2="h" name="X 상" />
        <LineChartComp value="m" value2="x" name="중 X" />
        <LineChartComp value="x" value2="m" name="X 중" />
      </div>
    </div>
  );
};

export default FixChartPage;
