import React from "react";

const ResultBox = ({ result, option, onClick }) => {
  return (
    <div onClick={onClick} className="shadow-lg">
      <div className="grid grid-cols-4 border-2">
        <div className="flex justify-center items-center">{option.accName}</div>
        <div>
          <p>등급 - {result?.grade || "1212"}</p>
          <p>이름 - {result?.name || "2121"}</p>
          <p>품질 - {result?.gradeQuality || "3333"}</p>
          <p>거래가능횟수 - {result?.auctionInfo?.tradeAllowCount || "33"}</p>
        </div>
        <div>
          <p>
            {result?.options[1]?.optionName || "111"} - {result?.options[1]?.value || "111"}
          </p>
          <p>
            {result?.options[2]?.optionName || "111"} - {result?.options[2]?.value || "111"}
          </p>
          <p>
            {result?.options[3]?.optionName || "111"} - {result?.options[3]?.value || "111"}
          </p>
        </div>
        <div>가격 - {result?.auctionInfo?.buyPrice || "0"}</div>
      </div>
    </div>
  );
};

export default ResultBox;
