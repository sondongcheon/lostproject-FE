import React from "react";

const ResultBox = ({ result, option, onClick }) => {
  return (
    <div onClick={onClick} className="shadow-lg border-2 rounded-3xl">
      <div className="grid grid-cols-4 ">
        <div className="flex justify-center items-center">{option.accName}</div>
        <div>
          <p>등급 - {result?.grade || "결과 없음"}</p>
          <p>이름 - {result?.name || "결과 없음"}</p>
          <p>품질 - {result?.gradeQuality || "결과 없음"}</p>
          <p>
            거래가능횟수 -{" "}
            {result?.auctionInfo?.tradeAllowCount === 0
              ? "0"
              : result?.auctionInfo?.tradeAllowCount || "결과 없음"}
          </p>
        </div>
        <div>
          <p>
            {result?.options[1]?.optionName || "결과 없음"} -{" "}
            {result?.options[1]?.value || "결과 없음"}
          </p>
          <p>
            {result?.options[2]?.optionName || "결과 없음"} -{" "}
            {result?.options[2]?.value || "결과 없음"}
          </p>
          <p>
            {result?.options[3]?.optionName || "결과 없음"} -{" "}
            {result?.options[3]?.value || "결과 없음"}
          </p>
        </div>
        <div>가격 - {result?.auctionInfo?.buyPrice || "0"}</div>
      </div>
    </div>
  );
};

export default ResultBox;
