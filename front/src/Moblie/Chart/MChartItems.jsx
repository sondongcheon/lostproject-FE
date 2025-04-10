import React from "react";

import ItemsTopMenu from "./Component/ItemsTopMenu";
import FixChartItemsPage from "./Component/FixChartItemsPage";

import DisplayAds from "../../common/Component/DisplayAds";

function MChartItems(props) {
  return (
    <div>
      <div className="mainMobileBody">
        <div className="mx-auto w-[50%] ">
          <ItemsTopMenu />
        </div>
        <div className="">
          <FixChartItemsPage />
        </div>
        <DisplayAds />
      </div>
    </div>
  );
}

export default MChartItems;
