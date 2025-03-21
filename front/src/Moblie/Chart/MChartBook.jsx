import React from "react";

import ItemsTopMenu from "./Component/ItemsTopMenu";
import FixChartItemsPage from "./Component/FixChartItemsPage";

function MChartBook(props) {
  return (
    <div>
      <div className="mainMobileBody">
        <div className="mx-auto w-[50%] ">
          <ItemsTopMenu />
        </div>
        <div className="">
          <FixChartItemsPage />
        </div>
      </div>
    </div>
  );
}

export default MChartBook;
