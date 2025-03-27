import React from "react";

import ItemsTopMenu from "./Component/ItemsTopMenu";
import FixChartJewelPage from "./Component/FixChartJewelPage";

function MChartJewel({ request, setRequest }) {
  return (
    <div>
      <div className="mainMobileBody">
        <div className="mx-auto w-[50%] ">
          <ItemsTopMenu />
        </div>
        <div className="">
          <FixChartJewelPage request={request} setRequest={setRequest} />
        </div>
      </div>
    </div>
  );
}

export default MChartJewel;
