import React from "react";

import ItemsLineChartComp from "./ItemsLineChartComp";

const FixChartItemsPage = ({ data, visualState }) => {
  return (
    <div>
      <div className="mb-10 space-y-10">
        {visualState &&
          data?.map((item, index) => (
            <div>{visualState[index] && <ItemsLineChartComp key={index} data={item} />}</div>
          ))}
      </div>
    </div>
  );
};

export default FixChartItemsPage;
