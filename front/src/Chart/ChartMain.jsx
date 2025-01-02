import React from "react";

import SelectSideBar from "./Component/SelectSideBar";
import FixChartPage from "./Component/FixChartPage";

function ChartMain() {
  return (
    <div>
      <div className="mainbody flex">
        <div className="w-[15%]">
          <SelectSideBar />
        </div>
        <div className="w-[85%]">
          <FixChartPage />
        </div>
      </div>
    </div>
  );
}

export default ChartMain;
