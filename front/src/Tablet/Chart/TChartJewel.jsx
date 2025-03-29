import React from "react";

import ItemsTopMenu from "./Component/ItemsTopMenu";
import FixChartJewelPage from "./Component/FixChartJewelPage";

import DisplayAds from "../../common/Component/DisplayAds";

function TChartJewel({ request, setRequest }) {
  return (
    <div>
      <div className="mainMobileBody">
        <div className="mx-auto w-[50%] ">
          <ItemsTopMenu />
        </div>
        <div className="">
          <FixChartJewelPage request={request} setRequest={setRequest} />
        </div>
        <DisplayAds />
      </div>
    </div>
  );
}

export default TChartJewel;
