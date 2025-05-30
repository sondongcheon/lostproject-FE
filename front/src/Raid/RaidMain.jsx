import React from "react";

import SideBar from "./Components/SideBar";

function RaidMain(props) {
  return (
    <div>
      <div className="mainbody flex">
        <div className="w-[15%]">
          <SideBar />
        </div>
        <div className="w-[85%]">테스트</div>
      </div>
    </div>
  );
}

export default RaidMain;
