import React from "react";

import ItemsTopMenu from "./Component/ItemsTopMenu";
import MainItemsComp from "./Component/MainItemsComp";

import DisplayAds from "../../common/Component/DisplayAds";

function TChartItemsMain(props) {
  return (
    <div>
      <div className="mainMobileBody">
        <div className="w-1/2 mx-auto">
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
