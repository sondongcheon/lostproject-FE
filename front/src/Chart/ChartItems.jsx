import React, { useState } from "react";

import FixChartItemsPage from "./Component/FixChartItemsPage";
import ItemsSideBar from "./Component/ItemsSideBar";

function ChartItems(props) {
  return (
    <div className="flex">
      <div className="mt-32 w-[15%]">{/* <DisplayAds /> */}</div>

      <div className="mainbody flex">
        <div className="w-[15%]">
          <ItemsSideBar />
        </div>
        <div className="w-[85%] ">
          <FixChartItemsPage />
        </div>
      </div>
      <div className="mt-32 w-[15%]">{/* <DisplayAds /> */}</div>
    </div>
  );
}

export default ChartItems;
