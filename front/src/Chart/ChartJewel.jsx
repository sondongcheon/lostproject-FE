import React from "react";

import ItemsSideBar from "./Component/ItemsSideBar";
import FixChartJewelPage from "./Component/FixChartJewelPage";
import DisplayAds from "../common/Component/DisplayAds";

function ChartJewel({ request, setRequest }) {
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
          <FixChartJewelPage request={request} setRequest={setRequest} />
        </div>
      </div>
      <div className="mt-32 w-[15%]">
        <DisplayAds />
      </div>
    </div>
  );
}

export default ChartJewel;
