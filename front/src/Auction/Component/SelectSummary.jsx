import React from "react";

const SelectSummary = ({ search }) => {
  return (
    <div>
      <div className="h-40 border-black border-2">
        요약정보
        <div>
          <button className="normalBtm" onClick={search}>
            검색하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectSummary;
