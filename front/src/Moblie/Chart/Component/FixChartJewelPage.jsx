import React, { useEffect } from "react";

import LineChartJewelComp from "./LineChartJewelComp";

const FixChartJewelPage = ({ request, setRequest }) => {
  const SectionDivider = ({ title, color }) => {
    const colorMap = {
      orange: "bg-[#f97316] text-white",
      purple: "bg-[#7E1891] text-white",
      deepblue: "bg-[#0A3981] text-white",
      black: "bg-[#000000] text-white",
    };

    const colorClass = colorMap[color] || "bg-gray-100 text-gray-700 border-gray-300";
    return (
      <div className="flex items-center m-10 ">
        <div className="flex-1 border-t-4 border-gray-300" />
        <h2 className={`mx-4 px-4 py-1 text-lg font-bold ${colorClass} rounded-full`}>{title}</h2>
        <div className="flex-1 border-t-4 border-gray-300" />
      </div>
    );
  };

  const updateOption = (key, value) => {
    setRequest((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  useEffect(() => {
    updateOption("time", 1);
    updateOption("point", 15);
  }, []);

  return (
    <div>
      <div className="mb-10 space-y-10">
        <SectionDivider title="10" color="orange" />
        <LineChartJewelComp
          name={"geop"}
          level={10}
          request={request}
          img={"https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_12_105.png"}
        />
        <LineChartJewelComp
          name={"jack"}
          level={10}
          request={request}
          img={"https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_12_115.png"}
        />

        <SectionDivider title="9" color="purple" />

        <LineChartJewelComp
          name={"geop"}
          level={9}
          request={request}
          img={"https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_12_104.png"}
        />
        <LineChartJewelComp
          name={"jack"}
          level={9}
          request={request}
          img={"https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_12_114.png"}
        />

        <SectionDivider title="8" color="deepblue" />

        <LineChartJewelComp
          name={"geop"}
          level={8}
          request={request}
          img={"https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_12_103.png"}
        />
        <LineChartJewelComp
          name={"jack"}
          level={8}
          request={request}
          img={"https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_12_113.png"}
        />

        <SectionDivider title="7" color="black" />

        <LineChartJewelComp
          name={"geop"}
          level={7}
          request={request}
          img={"https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_12_102.png"}
        />
        <LineChartJewelComp
          name={"jack"}
          level={7}
          request={request}
          img={"https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_12_112.png"}
        />
      </div>
    </div>
  );
};

export default FixChartJewelPage;
