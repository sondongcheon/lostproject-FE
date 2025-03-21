import React, { useState, useEffect } from "react";
import axios from "axios";

import ItemsSideBar from "./Component/ItemsSideBar";
import FixChartItemsPage from "./Component/FixChartItemsPage";

function ChartBook({}) {
  return (
    <div>
      <div className="w-[1900px] mainbody flex">
        <div className="w-[15%]">
          <ItemsSideBar />
        </div>
        <div className="w-[85%]">
          <FixChartItemsPage />
        </div>
      </div>
    </div>
  );
}

export default ChartBook;
