import React, { useState, useEffect } from "react";

const ResultBox = ({ number, result, onClick, className, staticNameList }) => {
  const [price, setPrice] = useState(0);
  const [valueRange, setValueRange] = useState("");
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(1);

  useEffect(() => {
    setPrice(result?.auctionInfo?.buyPrice || "0");
    if (result?.name?.includes("목걸이")) {
      if (result?.options?.length === 6) {
        setValueRange("13035~15714");
        setMinValue(13035);
        setMaxValue(15714);
      }
      if (result?.options?.length === 7) {
        setValueRange("13749~16428");
        setMinValue(13749);
        setMaxValue(16428);
      }
      if (result?.options?.length === 8) {
        setValueRange("15178~17857");
        setMinValue(15178);
        setMaxValue(17857);
      }
    } else if (result?.name?.includes("귀걸이")) {
      if (result?.options?.length === 6) {
        setValueRange("10139~12222");
        setMinValue(10139);
        setMaxValue(12222);
      }
      if (result?.options?.length === 7) {
        setValueRange("10695~12778");
        setMinValue(10695);
        setMaxValue(12778);
      }
      if (result?.options?.length === 8) {
        setValueRange("11806~13889");
        setMinValue(11806);
        setMaxValue(13889);
      }
    } else if (result?.name?.includes("반지")) {
      if (result?.options?.length === 6) {
        setValueRange("9414~11349");
        setMinValue(9414);
        setMaxValue(11349);
      }
      if (result?.options?.length === 7) {
        setValueRange("9930~11865");
        setMinValue(9930);
        setMaxValue(11865);
      }
      if (result?.options?.length === 8) {
        setValueRange("10962~12897");
        setMinValue(10962);
        setMaxValue(12897);
      }
    }
  }, [result]);

  function truncateString(str, maxLength) {
    if (!str) return ""; // 문자열이 null 또는 undefined인 경우 처리
    return str.length > maxLength ? str.substring(0, maxLength) + "..." : str;
  }

  return (
    <div onClick={onClick} className={`py-2 shadow-lg border-2 rounded-2xl ${className}`}>
      <div className="grid grid-cols-10 mx-auto size-font-xxxs">
        <div
          className={`col-span-1 font-bold flex flex-col justify-center items-center ${
            number !== undefined ? "text-3xl" : "size-font-xs"
          }`}
        >
          <img className="w-2/3 border-dotted border-black bg-[#9c8c6a]" src={result?.icon || ""} />
          {number !== undefined ? `${number + 1}` : staticNameList?.accName}

          {result?.options?.length > 5 && number === undefined && (
            <div className="group relative">
              <button className="mt-4 p-1 bg-gray-500 size-font-5xs text-white rounded-lg">
                스텟 범위?
              </button>
              <div className="absolute top-full mt-2 px-3 py-2 bg-gray-800 text-white text-sm rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {valueRange}
              </div>
            </div>
          )}
        </div>
        <div className="col-span-9">
          <div className="grid grid-cols-8 mx-4 ">
            <div className="col-span-8 mb-2">
              <div className="grid grid-cols-2">
                <p className="font-bold size-font-xl">{result?.name || "결과 없음"}</p>
                <div className="flex items-end justify-end">
                  <span className="mt-auto font-black size-font-2xl">
                    {price.toLocaleString()} <span className="size-font-xl">G</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-span-3 size-font-xs">
              {/* <p>등급 - {result?.grade || "결과 없음"}</p>
              <p>{result?.name || "결과 없음"}</p> */}
              <p>품질 {result?.gradeQuality || "결과 없음"}</p>
              <p>
                {result?.auctionInfo?.tradeAllowCount === undefined
                  ? "검색 결과 없음"
                  : "[구매 시 거래 " + result?.auctionInfo?.tradeAllowCount + "회 가능]" ||
                    "검색 결과 없음"}
              </p>

              <br />
              <div className="">
                {result?.options?.length > 2 && (
                  <div className="font-bold">
                    {result?.options[1]?.optionName} {parseInt(result?.options[1]?.value) || "0"}{" "}
                    <br />
                    {result?.options?.length > 2 && (
                      <div className="group relative flex items-center">
                        힘민지 {parseInt(result?.options[2]?.value) || "0"} &nbsp;
                        <span
                          className={`rounded-full text-white px-1`}
                          style={{
                            backgroundColor: (() => {
                              if (
                                (
                                  ((parseFloat(result?.options[2]?.value || "0") - minValue) /
                                    (maxValue - minValue)) *
                                  100
                                ).toFixed(2) > 75
                              )
                                return "#E38E49";
                              if (
                                (
                                  ((parseFloat(result?.options[2]?.value || "0") - minValue) /
                                    (maxValue - minValue)) *
                                  100
                                ).toFixed(2) > 50
                              )
                                return "#7E1891";
                              if (
                                (
                                  ((parseFloat(result?.options[2]?.value || "0") - minValue) /
                                    (maxValue - minValue)) *
                                  100
                                ).toFixed(2) > 25
                              )
                                return "#0A3981";
                              return "#000000"; // 기본값
                            })(),
                          }}
                        >
                          {(
                            ((parseFloat(result?.options[2]?.value || "0") - minValue) /
                              (maxValue - minValue)) *
                            100
                          ).toFixed(2)}
                          %{" "}
                        </span>
                        <div className="absolute w-[150%] top-full mt-2 px-3 py-2 bg-gray-800 text-white text-sm rounded shadow-lg opacity-0 visibility-hidden pointer-events-none group-hover:opacity-100 group-hover:visibility-visible group-hover:pointer-events-auto transition-opacity duration-300">
                          현재 연마 단계에서 가질 수 있는 최대 스텟에 비해 <br /> 어느 정도 비율로
                          높은 수치를 가졌는지를 보여줍니다. <br />
                          (현재값-최소값) /(최대값-최소값) * 100
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="col-span-5 size-font-xs">
              <div className="grid grid-cols-5">
                <div className="col-span-3">
                  {[5, 6, 7]
                    .map((i) => result?.options[i])
                    .filter(Boolean) // 이건 optional, 옵션이 null/undefined일 경우만 제거
                    .map((option, index) => {
                      return (
                        <div
                          key={index}
                          className={` ${option.valueGrade === "" ? "" : "font-bold"}`}
                        >
                          {" "}
                          {option.optionName === "세레나데, 신성, 조화 게이지 획득량 증가"
                            ? "서폿 아덴 획득 증가"
                            : truncateString(option.optionName, 7)}{" "}
                          {option.value} <br />
                        </div>
                      );
                    })}
                </div>
                <div className=" col-span-2 flex flex-col ">
                  <div className="grid grid-rows-3">
                    <div className="text-end">
                      {result?.options[5]?.valueGrade && (
                        <span
                          className={`rounded-full text-white pl-2 pr-2`}
                          style={{
                            backgroundColor: (() => {
                              if (result?.options[5]?.valueGrade.includes("상")) return "#E38E49";
                              if (result?.options[5]?.valueGrade.includes("중")) return "#7E1891";
                              if (result?.options[5]?.valueGrade.includes("하")) return "#0A3981";
                              return "#ffffff"; // 기본값
                            })(),
                          }}
                        >
                          {/* {getLevel(result?.options[1]?. optName, result?.options[1]?.value)} -{" "} */}
                          {result?.options[5]?.valueGrade}
                        </span>
                      )}
                    </div>
                    <div className="text-end">
                      {result?.options[6]?.valueGrade && (
                        <span
                          className={`rounded-full text-white pl-2 pr-2`}
                          style={{
                            backgroundColor: (() => {
                              if (result?.options[6]?.valueGrade.includes("상")) return "#E38E49";
                              if (result?.options[6]?.valueGrade.includes("중")) return "#7E1891";
                              if (result?.options[6]?.valueGrade.includes("하")) return "#0A3981";
                              return "#ffffff"; // 기본값
                            })(),
                          }}
                        >
                          {/* {getLevel(result?.options[2]?. optName, result?.options[2]?.value)} */}
                          {result?.options[6]?.valueGrade}
                        </span>
                      )}
                    </div>
                    <div className="text-end">
                      {result?.options[7]?.valueGrade && (
                        <span
                          className={`rounded-full text-white pl-2 pr-2`}
                          style={{
                            backgroundColor: (() => {
                              if (result?.options[7]?.valueGrade.includes("상")) return "#E38E49";
                              if (result?.options[7]?.valueGrade.includes("중")) return "#7E1891";
                              if (result?.options[7]?.valueGrade.includes("하")) return "#0A3981";
                              return "#ffffff"; // 기본값
                            })(),
                          }}
                        >
                          {/* {getLevel(result?.options[3]?. optName, result?.options[3]?.value)} */}
                          {result?.options[7]?.valueGrade || <br />}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
//
export default ResultBox;
