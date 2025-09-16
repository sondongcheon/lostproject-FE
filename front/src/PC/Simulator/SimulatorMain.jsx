import React from "react";

import SelectSideBar from "./Components/SelectSideBar";

import DisplayAds from "@/common/Component/DisplayAds";

function ChartItemsMain(props) {
  return (
    <div>
      <div className="flex">
        <div className="mt-32 w-[15%]">
          <DisplayAds />
        </div>

        <div className="mainbody flex">
          <div className="w-[15%]">
            <SelectSideBar />
          </div>
          <div className="w-[85%]">test</div>
        </div>
        <div className="mt-32 w-[15%]">
          <DisplayAds />
        </div>
      </div>
    </div>
  );
}

export default ChartItemsMain;
