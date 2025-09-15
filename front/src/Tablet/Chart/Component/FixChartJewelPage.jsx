import React, { useState, useEffect } from "react";

import LineChartJewelComp from "./LineChartJewelComp";

const FixChartJewelPage = ({
  request,
  updateOption,
  visualState,
  setVisualState,
}) => {
  const SectionDivider = ({ title, color }) => {
    const colorMap = {
      orange: "bg-[#f97316] text-white",
      purple: "bg-[#7E1891] text-white",
      deepblue: "bg-[#0A3981] text-white",
      black: "bg-[#000000] text-white",
    };

    const colorClass =
      colorMap[color] || "bg-gray-100 text-gray-700 border-gray-300";
    return (
      <div className="flex items-center m-10 ">
        <div className="flex-1 border-t-4 border-gray-300" />
        <h2
          className={`mx-4 px-4 py-1 text-lg font-bold ${colorClass} rounded-full`}
        >
          {title}
        </h2>
        <div className="flex-1 border-t-4 border-gray-300" />
      </div>
    );
  };

  useEffect(() => {
    const savedState = localStorage.getItem("ItemsJewelSetting");
    if (savedState) {
      setVisualState(JSON.parse(savedState));
    }
    updateOption("time", 1);
    updateOption("point", 10);
  }, []);

  return (
    <div>
      <div className="mb-10 space-y-10">
        <div className={visualState[0] || visualState[1] ? "" : "hidden"}>
          <SectionDivider title="10" color="orange" />
        </div>
        <div className={visualState[0] ? "" : "hidden"}>
          <LineChartJewelComp
            name={"geop"}
            level={10}
            request={request}
            img={
              "https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_12_105.png"
            }
          />
        </div>

        <div className={visualState[1] ? "" : "hidden"}>
          <LineChartJewelComp
            name={"jack"}
            level={10}
            request={request}
            img={
              "https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_12_115.png"
            }
          />
        </div>

        <div className={visualState[2] || visualState[3] ? "" : "hidden"}>
          <SectionDivider title="9" color="purple" />
        </div>
        <div className={visualState[2] ? "" : "hidden"}>
          <LineChartJewelComp
            name={"geop"}
            level={9}
            request={request}
            img={
              "https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_12_104.png"
            }
          />
        </div>
        <div className={visualState[3] ? "" : "hidden"}>
          <LineChartJewelComp
            name={"jack"}
            level={9}
            request={request}
            img={
              "https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_12_114.png"
            }
          />
        </div>

        <div className={visualState[4] || visualState[5] ? "" : "hidden"}>
          <SectionDivider title="8" color="deepblue" />
        </div>

        <div className={visualState[4] ? "" : "hidden"}>
          <LineChartJewelComp
            name={"geop"}
            level={8}
            request={request}
            img={
              "https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_12_103.png"
            }
          />
        </div>
        <div className={visualState[5] ? "" : "hidden"}>
          <LineChartJewelComp
            name={"jack"}
            level={8}
            request={request}
            img={
              "https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_12_113.png"
            }
          />
        </div>

        <div className={visualState[6] || visualState[7] ? "" : "hidden"}>
          <SectionDivider title="7" color="black" />
        </div>

        <div className={visualState[6] ? "" : "hidden"}>
          <LineChartJewelComp
            name={"geop"}
            level={7}
            request={request}
            img={
              "https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_12_102.png"
            }
          />
        </div>
        <div className={visualState[7] ? "" : "hidden"}>
          <LineChartJewelComp
            name={"jack"}
            level={7}
            request={request}
            img={
              "https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_12_112.png"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default FixChartJewelPage;
