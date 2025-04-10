import React from "react";

import ItemsTopMenu from "./Component/ItemsTopMenu";
import MainItemsComp from "./Component/MainItemsComp";

import DisplayAds from "../../common/Component/DisplayAds";

function TChartItemsMain(props) {
  return (
    <div>
      <div className="mainMobileBody">
        <div className="mx-auto w-[50%] ">
          <ItemsTopMenu />
        </div>
        <div className="">
          <MainItemsComp />
        </div>
        <DisplayAds />
      </div>
    </div>
  );
}

export default TChartItemsMain;
