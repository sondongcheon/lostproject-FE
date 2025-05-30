import React from "react";

import { TbSwords } from "react-icons/tb";

const GateDetailDate = ({ data }) => {
  const addDaysToDate = (dateStr, daysToAdd) => {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + daysToAdd);
    return date.toISOString().split("T")[0]; // "YYYY-MM-DD"
  };

  return (
    <div className="border-double border-t-4">
      <div className="flex justify-center items-center text-sm">
        {data.startDay} ~ {addDaysToDate(data.startDay, 6)} {data.mvp && "MVP 달성 "} &nbsp;
        {Object.entries(data.resultKind).map(([key, value], index) => (
          <div key={index} className="flex items-center">
            <TbSwords /> {key} &nbsp;{data.mvp && value + "%"}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GateDetailDate;
