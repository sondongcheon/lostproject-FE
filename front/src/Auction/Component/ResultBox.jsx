import React from "react";

const ResultBox = ({ number, result, option, onClick, className }) => {
  // 특정 이름 목록
  const percentageOptions = [
    "추가 피해",
    "적에게 주는 피해 증가",
    "공격력 ",
    "무기 공격력 ",
    "치명타 적중률",
    "치명타 피해",
  ];

  // 상중하 판단 함수
  const getLevel = (optionName, value) => {
    if (optionName === "추가 피해") {
      if (value === 0.7) return "하";
      if (value === 1.6) return "중";
      return "상";
    }
    if (optionName === "적에게 주는 피해 증가") {
      if (value === 0.55) return "하";
      if (value === 1.2) return "중";
      return "상";
    }
    if (optionName === "공격력 ") {
      if (value === 0.4) return "하";
      if (value === 0.95) return "중";
      if (value === 1.55) return "상";
      return "";
    }
    if (optionName === "무기 공격력 ") {
      if (value === 0.8) return "하";
      if (value === 1.8) return "중";
      if (value === 3) return "상";
      return "";
    }
    if (optionName === "치명타 적중률") {
      if (value === 0.4) return "하";
      if (value === 0.95) return "중";
      return "상";
    }
    if (optionName === "치명타 피해") {
      if (value === 1.1) return "하";
      if (value === 2.4) return "중";
      return "상";
    }
    // 기타 옵션은 기본적으로 ""로 처리
    return "";
  };

  return (
    <div
      onClick={onClick}
      className={`pt-4 pb-4 bg-[#F5F5F5] shadow-lg border-2 rounded-3xl ${className}`}
    >
      <div className="grid grid-cols-10 mx-auto w-[95%] text-sm">
        <div
          className={`col-span-1 font-bold flex justify-center items-center  pr-4 ${
            number !== undefined ? "text-3xl" : null
          }`}
        >
          {number !== undefined ? `${number + 1}` : option.accName}
        </div>
        <div className="col-span-3">
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
        <div className="col-span-4">
          {result?.options.map((option, index) => {
            console.log(option.optionName);
            const valueWithPercentage =
              percentageOptions.includes(option.optionName) && option.value < 10
                ? `${option.value}%`
                : option.value;

            return (
              <p
                key={index}
                className={
                  percentageOptions.includes(option.optionName) && option.value < 10
                    ? "font-bold"
                    : ""
                }
              >
                {option.optionName || "결과 없음"} - {valueWithPercentage}
                {/* {getLevel(option.optionName, option.value)} */}
              </p>
            );
          })}
        </div>
        <div className="col-span-2 ">
          <div className="grid grid-rows-4">
            <div>
              <span className="font-bold">가격 - {result?.auctionInfo?.buyPrice || "0"} G</span>
            </div>
            <div>
              {result?.options[1] && (
                <span
                  className={`rounded-full text-white`}
                  style={{
                    backgroundColor: (() => {
                      const level = getLevel(
                        result?.options[1]?.optionName,
                        result?.options[1]?.value
                      );
                      if (level === "상") return "#E38E49";
                      if (level === "중") return "#7E1891";
                      if (level === "하") return "#0A3981";
                      return "#ffffff"; // 기본값
                    })(),
                  }}
                >
                  {getLevel(result?.options[1]?.optionName, result?.options[1]?.value)}
                </span>
              )}
            </div>
            <div>
              {result?.options[2] && (
                <span
                  className={`rounded-full text-white`}
                  style={{
                    backgroundColor: (() => {
                      const level = getLevel(
                        result?.options[2]?.optionName,
                        result?.options[2]?.value
                      );
                      if (level === "상") return "#E38E49";
                      if (level === "중") return "#7E1891";
                      if (level === "하") return "#0A3981";
                      return "#ffffff"; // 기본값
                    })(),
                  }}
                >
                  {getLevel(result?.options[2]?.optionName, result?.options[2]?.value)}
                </span>
              )}
            </div>
            <div>
              {result?.options[3] && (
                <span
                  className={`rounded-full text-white `}
                  style={{
                    backgroundColor: (() => {
                      const level = getLevel(
                        result?.options[3]?.optionName,
                        result?.options[3]?.value
                      );
                      if (level === "상") return "#E38E49";
                      if (level === "중") return "#7E1891";
                      if (level === "하") return "#0A3981";
                      return "#ffffff"; // 기본값
                    })(),
                  }}
                >
                  {getLevel(result?.options[3]?.optionName, result?.options[3]?.value)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
//
export default ResultBox;
