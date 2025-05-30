import React from "react";

import ItemsLineChartComp from "./ItemsLineChartComp";

const FixChartItemsPage = ({ data, visualState }) => {
  return (
    <div>
      <div className="mb-10 space-y-10">
        {/* {data !== null && data[0].goldoEvent !== null && (
          <div className="flex m-4 border-b-2 border-red-200 justify-center items-center bg-opacity-75 bg-white rounded-2xl size-font-xl">
            <img className="w-6" src={data !== null && data[0].iconUrl} />
            &nbsp; 골두껍이 실시간 기댓값 : &nbsp;{" "}
            <p className="font-bold text-2xl">
              {data !== null && data[0].goldoEvent?.avgPrice.toLocaleString()} G
            </p>
          </div>
        )} */}
        {visualState &&
          data?.map((item, index) => (
            <div>{visualState[index] && <ItemsLineChartComp key={index} data={item} />}</div>
          ))}
      </div>
    </div>
  );
};

export default FixChartItemsPage;
