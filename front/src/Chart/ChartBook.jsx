import React, { useState, useEffect } from "react";
import axios from "axios";

import ItemsSideBar from "./Component/ItemsSideBar";
import FixChartItemsPage from "./Component/FixChartItemsPage";

import DisplayAds from "../common/Component/DisplayAds";

function ChartBook({}) {
  return (
    <div className="flex">
      <div className="mt-32 w-[15%]">
        <DisplayAds />
      </div>

      <div className="mainbody flex">
        <div className="w-[15%]">
          <ItemsSideBar />
        </div>
        <div className="w-[85%]">
          <FixChartItemsPage />
        </div>
      </div>
      <div className="mt-32 w-[15%]">
        <DisplayAds />
      </div>
    </div>
  );
}

export default ChartBook;
