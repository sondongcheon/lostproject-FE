import React, { useState, useEffect } from "react";

const ResultBox = ({ number, result, option, onClick, className }) => {
  const [price, setPrice] = useState(0);

  useEffect(() => {
    setPrice(result?.auctionInfo?.buyPrice || "0");
  }, [result]);

  return (
    <div
      onClick={onClick}
      className={`pt-4 pb-4 shadow-lg border-2 rounded-3xl ${className}`}
    >
      <div className="grid grid-cols-10 mx-auto w-[95%] text-[8px]">
        <div
          className={`col-span-1 font-bold flex flex-col justify-center items-center  pr-4 ${
            number !== undefined ? "text-3xl" : "size-font-xxxs"
          }`}
        >
          <img className="" src={result?.icon || ""} />
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
            return (
              <span
                className={`${option.valueGrade === "" ? "" : "font-bold"}`}
              >
                {" "}
                {option.optionName === "세레나데, 신성, 조화 게이지 획득량 증가"
                  ? "서포터 아이덴티티 획득량 증가"
                  : option.optionName}{" "}
                - {option.value} <br />
              </span>
            );
          })}
        </div>
        <div className="col-span-2 ">
          <div className="grid grid-rows-4">
            <div>
              <span className="font-bold">
                가격 - {price.toLocaleString()} G
              </span>
            </div>
            <div>
              {result?.options[1]?.valueGrade && (
                <span
                  className={`rounded-full text-white pl-2 pr-2`}
                  style={{
                    backgroundColor: (() => {
                      if (result?.options[1]?.valueGrade.includes("상"))
                        return "#E38E49";
                      if (result?.options[1]?.valueGrade.includes("중"))
                        return "#7E1891";
                      if (result?.options[1]?.valueGrade.includes("하"))
                        return "#0A3981";
                      return "#ffffff"; // 기본값
                    })(),
                  }}
                >
                  {/* {getLevel(result?.options[1]?.optionName, result?.options[1]?.value)} -{" "} */}
                  {result?.options[1]?.valueGrade}
                </span>
              )}
            </div>
            <div>
              {result?.options[2]?.valueGrade && (
                <span
                  className={`rounded-full text-white pl-2 pr-2`}
                  style={{
                    backgroundColor: (() => {
                      if (result?.options[2]?.valueGrade.includes("상"))
                        return "#E38E49";
                      if (result?.options[2]?.valueGrade.includes("중"))
                        return "#7E1891";
                      if (result?.options[2]?.valueGrade.includes("하"))
                        return "#0A3981";
                      return "#ffffff"; // 기본값
                    })(),
                  }}
                >
                  {/* {getLevel(result?.options[2]?.optionName, result?.options[2]?.value)} */}
                  {result?.options[2]?.valueGrade}
                </span>
              )}
            </div>
            <div>
              {result?.options[3]?.valueGrade && (
                <span
                  className={`rounded-full text-white pl-2 pr-2`}
                  style={{
                    backgroundColor: (() => {
                      if (result?.options[3]?.valueGrade.includes("상"))
                        return "#E38E49";
                      if (result?.options[3]?.valueGrade.includes("중"))
                        return "#7E1891";
                      if (result?.options[3]?.valueGrade.includes("하"))
                        return "#0A3981";
                      return "#ffffff"; // 기본값
                    })(),
                  }}
                >
                  {/* {getLevel(result?.options[3]?.optionName, result?.options[3]?.value)} */}
                  {result?.options[3]?.valueGrade || null}
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
