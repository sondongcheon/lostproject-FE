import React, { useState, useEffect } from "react";

const ResultBox = ({ number, result, option, onClick, className }) => {
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

  return (
    <div onClick={onClick} className={`pt-4 pb-4 shadow-lg border-2 rounded-3xl ${className}`}>
      <div className="grid grid-cols-10 mx-auto w-[95%] size-font-xxxs">
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
          <br />
          {result?.options?.length > 5 && (
            <div className="group relative">
              {/* 마우스 오버 대상 */}
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                힘민지 범위 확인하기
              </button>

              {/* 툴팁 (CSS로 hover 시 노출) */}
              <div className="absolute top-full mt-2 px-3 py-2 bg-gray-800 text-white text-sm rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {valueRange}
              </div>
            </div>
          )}
        </div>
        <div className="col-span-4">
          {result?.options
            .filter((option) => !["체력", "힘", "민첩", "지능"].includes(option.optionName))
            .map((option, index) => {
              return (
                <span className={`${option.valueGrade === "" ? "" : "font-bold"}`}>
                  {" "}
                  {option.optionName === "세레나데, 신성, 조화 게이지 획득량 증가"
                    ? "서포터 아이덴티티 획득량 증가"
                    : option.optionName}{" "}
                  - {option.value} <br />
                </span>
              );
            })}
          {result?.options?.length > 2 && (
            <div className="font-bold">
              <br />
              {result?.options[1]?.optionName} - {result?.options[1]?.value} <br />
              힘민지 - {result?.options[2]?.value}
              <br />
              힘민지 최대치와의 차이 {parseFloat(result?.options[2]?.value || "0") - maxValue}
            </div>
          )}
        </div>
        <div className="col-span-2 ">
          <div className="grid grid-rows-4">
            <div>
              <span className="font-bold">가격 - {price.toLocaleString()} G</span>
            </div>
            <div>
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
                  {/* {getLevel(result?.options[1]?.optionName, result?.options[1]?.value)} -{" "} */}
                  {result?.options[5]?.valueGrade}
                </span>
              )}
            </div>
            <div>
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
                  {/* {getLevel(result?.options[2]?.optionName, result?.options[2]?.value)} */}
                  {result?.options[6]?.valueGrade}
                </span>
              )}
            </div>
            <div>
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
                  {/* {getLevel(result?.options[3]?.optionName, result?.options[3]?.value)} */}
                  {result?.options[7]?.valueGrade || null}
                </span>
              )}
            </div>
            {result?.options?.length > 2 && (
              <div className="group relative">
                {/* 마우스 오버 대상 */}
                힘민지 비율&nbsp; <br />
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
                <div className="absolute w-[300%] top-full mt-2 px-3 py-2 bg-gray-800 text-white text-sm rounded shadow-lg opacity-0 visibility-hidden pointer-events-none group-hover:opacity-100 group-hover:visibility-visible group-hover:pointer-events-auto transition-opacity duration-300 right-0">
                  현재 연마 단계에서 가질 수 있는 최대 스텟에 비해 <br /> 어느 정도 비율로 높은
                  수치를 가졌는지를 보여줍니다.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
//
export default ResultBox;
