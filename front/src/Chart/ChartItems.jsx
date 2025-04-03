import React, { useState } from "react";

import HeadKeyBox from "../Auction/Component/HeadKeyBox";
import ItemsSideBar from "./Component/ItemsSideBar";

function ChartItems(props) {
  const [apiKey, setApiKey] = useState("");
  const [saveKey, setSaveKey] = useState(true);
  return (
    <div className="flex">
      <div className="mt-32 w-[15%]">{/* <DisplayAds /> */}</div>

      <div className="mainbody flex">
        <div className="w-[15%]">
          <ItemsSideBar />
        </div>
        <div className="w-[85%]">{/* <FixChartItemsPage /> */}</div>
      </div>
      <div className="mt-32 w-[15%]">{/* <DisplayAds /> */}</div>
    </div>
  );
}

export default ChartItems;
