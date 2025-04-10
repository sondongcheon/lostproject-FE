import React from "react";

import ItemsSideBar from "./Component/ItemsSideBar";
import MainItemsComp from "./Component/MainItemsComp";

import DisplayAds from "../common/Component/DisplayAds";

function ChartItemsMain(props) {
  return (
    <div>
      <div className="flex">
        <div className="mt-32 w-[15%]">
          <DisplayAds />
        </div>

        <div className="mainbody flex">
          <div className="w-[15%]">
            <ItemsSideBar />
          </div>
          <div className="w-[85%]">
            <MainItemsComp />
          </div>
        </div>
        <div className="mt-32 w-[15%]">
          <DisplayAds />
        </div>
      </div>
    </div>
  );
}

export default ChartItemsMain;
