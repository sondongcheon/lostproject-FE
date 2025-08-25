import React, { useState, useEffect } from "react";

import SelectBox from "../../../common/Component/SelectBox";

import { BsFillQuestionCircleFill } from "react-icons/bs";

const SelectOptionComp = ({ options, onOptionsChange, staticNameList }) => {
  const [currentOption, setCurrentOption] = useState({});

  const [optionProps, setOptionProps] = useState([]);

  useEffect(() => {
    if (["54"].includes(staticNameList?.optVal.second)) {
      setOptionProps([
        { value: "53", content: "공격력+" },
        { value: "55", content: "최대생명력+" },
        { value: "56", content: "최대마나+" },
      ]);
    } else {
      setOptionProps([
        { value: "53", content: "공격력+" },
        { value: "54", content: "무기공격력+" },
        { value: "55", content: "최대생명력+" },
        { value: "56", content: "최대마나+" },
      ]);
    }
  }, [staticNameList?.optVal.second]);

  const updateOption = (key, value) => {
    setCurrentOption((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleCategoryCode = () => {
    if (options.categoryCode === 200000) {
      if (staticNameList.accName === "목걸이") {
        onOptionsChange("categoryCode", 200010);
      } else if (staticNameList.accName === "귀걸이") {
        onOptionsChange("categoryCode", 200020);
      } else {
        onOptionsChange("categoryCode", 200030);
      }
      onOptionsChange("selOpt1", currentOption.selOpt1);
      onOptionsChange("selOpt2", currentOption.selOpt2);
      onOptionsChange("selOpt3", currentOption.selOpt3);
    } else {
      onOptionsChange("categoryCode", 200000);
      updateOption("selOpt1", options.selOpt1);
      updateOption("selOpt2", options.selOpt2);
      updateOption("selOpt3", options.selOpt3);
      onOptionsChange("selOpt1", null);
      onOptionsChange("selOpt2", null);
      onOptionsChange("selOpt3", null);
    }
  };

  return (
    <div>
      <div
        className={`pt-2 pb-2 h-auto shadow-lg bg-[#F5F5F5] border-2 rounded-2xl ${
          options.categoryCode === 200000 ? "border-red-500" : null
        }`}
      >
        <div className="flex">
          <div className="flex flex-1">
            {/* 3 영역: 세로로 4칸, 각 칸을 3:7로 나누기 */}
            <div className="flex-[7] grid grid-rows-3">
              <div className="px-1 flex justify-center items-center border-b-2 border-gray-300 gap-x-2">
                <p className="font-bold size-font-xxs ">
                  {options.categoryCode === 200000
                    ? ""
                    : staticNameList.accName}
                </p>
                <button
                  className={`size-font-xxxs font-bold ${
                    options.categoryCode === 200000
                      ? "normalSelBtm"
                      : "normalBtm color-tomato"
                  } ${
                    ["54"].includes(staticNameList?.optVal?.second)
                      ? "hidden"
                      : ""
                  }`}
                  onClick={handleCategoryCode}
                >
                  특수추적
                  {options.categoryCode === 200000 ? " 제거" : " 추가"}
                </button>
                <div
                  className={` flex items-center group relative mx-1 ${
                    ["54"].includes(staticNameList?.optVal?.second)
                      ? "hidden"
                      : ""
                  }`}
                >
                  <BsFillQuestionCircleFill className="w-full" />
                  <div className="absolute w-[1500%] z-20 bottom-8 px-3 py-2 bg-gray-800 text-white size-font-xxxs rounded shadow-lg opacity-0 visibility-hidden pointer-events-none group-hover:opacity-100 group-hover:visibility-visible group-hover:pointer-events-auto transition-opacity duration-300">
                    특수추적 이란? 연마 등급만 정하고(ex. 상단일 1개 중중 2개){" "}
                    <br />
                    그 등급을 어느 악세서리와 매칭하는게 가장 저렴한지
                    검색합니다.
                    <br />
                    연마 옵션을 선택 하지 않고, 등급만 선택한 후 모든 경우의수를
                    비교합니다. <br />
                    대신, 스텟 필터 기능이 동작하지 않습니다. <br /> <br />
                    예시처럼 고른다면? 아래 조합을 다 검색돌리고 제일 싼 결과를
                    알려줍니다.
                    <br />
                    목걸이 추피 상, 귀걸이 중중, 반지 중중 <br />
                    목걸이 적추피 상, 귀걸이 중중, 반지 중중 <br />
                    목걸이 중중, 귀걸이 공상, 반지 중중 <br />
                    목걸이 중중, 귀걸이 무공상, 반지 중중 <br />
                    목걸이 중중, 귀걸이 중중, 반지 치적상 <br />
                    목걸이 중중, 귀걸이 중중, 반지 치피상 <br />
                  </div>
                </div>
              </div>
              <div className="p-2 grid grid-cols-4 border-b-2 border-gray-300">
                <div
                  className="font-bold col-span-1 flex items-center justify-center text-center text-[8px]"
                  // onClick={() => {
                  //   onOptionsChange("tier", `${options.tier}` === "3" ? "4" : "3");
                  //   if (options.itemGrade === "전설") {
                  //     onOptionsChange("itemGrade", "");
                  //   }
                  // }}
                >
                  {/* {options.tier}T
                  <br />
                  (click!) */}
                  등급
                </div>
                <div className="col-span-3 flex items-center justify-center ">
                  <form
                    className={`grid ${
                      options.tier === "3"
                        ? "grid-cols-3 gap-2 text-[7px]"
                        : "grid-cols-2 gap-2 text-xs"
                    }`}
                  >
                    <label
                      className={`${options.tier === "4" ? "hidden" : ""}`}
                    >
                      <input
                        type="radio"
                        name={`${staticNameList.id}_itemGrade`}
                        value="전설"
                        checked={options.itemGrade === "전설"}
                        className="mr-1"
                        onChange={(e) =>
                          onOptionsChange("itemGrade", e.target.value)
                        }
                      />
                      전설
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={`${staticNameList.id}_itemGrade`}
                        value="유물"
                        checked={options.itemGrade === "유물"}
                        className="mr-1"
                        onChange={(e) =>
                          onOptionsChange("itemGrade", e.target.value)
                        }
                      />
                      유물
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={`${staticNameList.id}_itemGrade`}
                        value="고대"
                        checked={options.itemGrade === "고대"}
                        className="mr-1"
                        onChange={(e) =>
                          onOptionsChange("itemGrade", e.target.value)
                        }
                      />
                      고대
                    </label>
                  </form>
                </div>
              </div>
              <div className="p-2 grid grid-cols-4">
                <div className="text-xs font-bold col-span-1  flex items-center justify-center">
                  품질
                </div>
                <div className="col-span-3 flex items-center justify-center">
                  <div className="w-3/4 pl-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={options.quality || 0}
                      onChange={(e) =>
                        onOptionsChange(
                          "quality",
                          parseInt(e.target.value, 10) || null
                        )
                      }
                      className="slider w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>
                  <div className="w-1/4 text-center text-xs text-gray-500">
                    <input
                      className="w-full text-center rounded-2xl border border-gray-300"
                      placeholder="0"
                      type="number"
                      min="0"
                      max="100"
                      value={options.quality || 0}
                      onChange={(e) => {
                        const value = parseInt(e.target.value, 10);
                        onOptionsChange(
                          "quality",
                          isNaN(value)
                            ? null
                            : Math.min(100, Math.max(0, value))
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 6:4 비율로 나누기 */}
            <div className="flex-[13] grid grid-rows-3">
              <div className="grid grid-cols-2 border-b-2 border-gray-300">
                <div className="flex items-center">
                  {/* 그룹명 "연마효과"가 25% 영역에 정중앙 배치 */}
                  <div className="w-[25%] flex justify-center">
                    <p className="size-font-xs font-bold pl-2">특옵</p>
                  </div>

                  {/* 나머지 75% 영역에 라디오 버튼들 배치 */}
                  <div className="w-[75%] justify-center items-center relative">
                    {/* 옵션이 200000일 경우만 덮기 */}
                    {options.categoryCode === 200000 && (
                      <div className="absolute inset-0 bg-gray-200 z-10 flex justify-center items-center m-1">
                        <p className="text-xs text-red-500 font-bold">
                          등급만 선택 합니다
                        </p>
                      </div>
                    )}
                    <form className="grid mobile-grid-3 justify-items-center pr-2">
                      <label>
                        <input
                          type="radio"
                          name={`${staticNameList.id}selOpt1`}
                          value={staticNameList.optVal.first}
                          checked={
                            options.selOpt1 === staticNameList.optVal.first
                          }
                          disabled={
                            options.selOpt2 === staticNameList.optVal.first
                          }
                          onChange={(e) =>
                            onOptionsChange("selOpt1", e.target.value)
                          }
                        />
                        <span className="text-[8px]">
                          {staticNameList.optName.first}
                        </span>
                      </label>

                      <label>
                        <input
                          type="radio"
                          name={`${staticNameList.id}selOpt1`}
                          value={staticNameList.optVal.second}
                          checked={
                            options.selOpt1 === staticNameList.optVal.second
                          }
                          disabled={
                            options.selOpt2 === staticNameList.optVal.second
                          }
                          onChange={(e) =>
                            onOptionsChange("selOpt1", e.target.value)
                          }
                        />
                        <span className="text-[8px]">
                          {staticNameList.optName.second}
                        </span>
                      </label>

                      {/* <label>
                      <input
                        type="radio"
                        name={`${staticNameList.id}selOpt1`}
                        value={staticNameList.optVal.third}
                        checked={options.selOpt1 === staticNameList.optVal.third}
                        onChange={(e) => onOptionsChange("selOpt1", e.target.value)}
                      />
                      {options. optName.third}
                    </label> */}

                      <label>
                        <input
                          type="radio"
                          name={`${staticNameList.id}selOpt1`}
                          value={null}
                          checked={options.selOpt1 === null}
                          onChange={() => onOptionsChange("selOpt1", null)}
                        />
                        <span className="text-[8px]">미선택</span>
                      </label>
                    </form>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-[80%] flex gap-2 justify-center items-center">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name={`${staticNameList.id}selVal1`}
                        value="3"
                        checked={options.selVal1 === "3"}
                        className="mr-1"
                        onChange={(e) =>
                          onOptionsChange("selVal1", e.target.value)
                        }
                      />
                      <span className="text-xs">상</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name={`${staticNameList.id}selVal1`}
                        value="2"
                        checked={options.selVal1 === "2"}
                        className="mr-1"
                        onChange={(e) =>
                          onOptionsChange("selVal1", e.target.value)
                        }
                      />
                      <span className="text-xs">중</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name={`${staticNameList.id}selVal1`}
                        value="1"
                        checked={options.selVal1 === "1"}
                        className="mr-1"
                        onChange={(e) =>
                          onOptionsChange("selVal1", e.target.value)
                        }
                      />
                      <span className="text-xs">하</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name={`${staticNameList.id}selVal1`}
                        checked={options.selVal1 === null}
                        value={null}
                        className="mr-1"
                        onChange={() => onOptionsChange("selVal1", null)}
                      />
                      <span className="text-xs">X</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 border-b-2 border-gray-300">
                <div className="flex items-center justify-center  ">
                  {/* 그룹명 "연마효과"가 25% 영역에 정중앙 배치 */}
                  <div className="w-[25%] flex justify-center">
                    <p className="size-font-xs font-bold pl-2">특옵</p>
                  </div>

                  {/* 나머지 75% 영역에 라디오 버튼들 배치 */}
                  <div className="w-[75%]  justify-center items-center relative">
                    {/* 옵션이 200000일 경우만 덮기 */}
                    {options.categoryCode === 200000 && (
                      <div className="absolute inset-0 bg-gray-200 z-10 flex justify-center items-center  m-1">
                        <p className="text-xs text-red-500 font-bold">
                          등급만 선택 합니다
                        </p>
                      </div>
                    )}
                    <form className="grid mobile-grid-3 justify-items-center pr-2">
                      <label>
                        <input
                          type="radio"
                          name={`${staticNameList.id}selOpt2`}
                          value={staticNameList.optVal.first}
                          checked={
                            options.selOpt2 === staticNameList.optVal.first
                          }
                          disabled={
                            options.selOpt1 === staticNameList.optVal.first
                          }
                          onChange={(e) =>
                            onOptionsChange("selOpt2", e.target.value)
                          }
                        />
                        <span className="text-[8px]">
                          {staticNameList.optName.first}
                        </span>
                      </label>
                      <label>
                        <input
                          type="radio"
                          name={`${staticNameList.id}selOpt2`}
                          value={staticNameList.optVal.second}
                          checked={
                            options.selOpt2 === staticNameList.optVal.second
                          }
                          disabled={
                            options.selOpt1 === staticNameList.optVal.second
                          }
                          onChange={(e) =>
                            onOptionsChange("selOpt2", e.target.value)
                          }
                        />
                        <span className="text-[8px]">
                          {staticNameList.optName.second}
                        </span>
                      </label>
                      {/* <label>
                      <input
                        type="radio"
                        name={`${staticNameList.id}selOpt2`}
                        value={staticNameList.optVal.third}
                        checked={options.selOpt2 === staticNameList.optVal.third}
                        onChange={(e) => onOptionsChange("selOpt2", e.target.value)}
                      />
                      {options. optName.third}
                    </label> */}
                      <label>
                        <input
                          type="radio"
                          name={`${staticNameList.id}selOpt2`}
                          value={null}
                          checked={options.selOpt2 === null}
                          onChange={() => onOptionsChange("selOpt2", null)}
                        />
                        <span className="text-[8px]">미선택</span>
                      </label>
                    </form>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="flex gap-2 justify-center items-center">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name={`${staticNameList.id}selVal2`}
                        value="3"
                        checked={options.selVal2 === "3"}
                        className="mr-1"
                        onChange={(e) =>
                          onOptionsChange("selVal2", e.target.value)
                        }
                      />
                      <span className="text-xs">상</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name={`${staticNameList.id}selVal2`}
                        value="2"
                        checked={options.selVal2 === "2"}
                        className="mr-1"
                        onChange={(e) =>
                          onOptionsChange("selVal2", e.target.value)
                        }
                      />
                      <span className="text-xs">중</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name={`${staticNameList.id}selVal2`}
                        value="1"
                        checked={options.selVal2 === "1"}
                        className="mr-1"
                        onChange={(e) =>
                          onOptionsChange("selVal2", e.target.value)
                        }
                      />
                      <span className="text-xs">하</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name={`${staticNameList.id}selVal2`}
                        value={null}
                        checked={options.selVal2 === null}
                        className="mr-1"
                        onChange={() => onOptionsChange("selVal2", null)}
                      />
                      <span className="text-xs">X</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 relative">
                {/* 전체를 덮는 미구현 메시지
              <div className="absolute inset-0 bg-gray-200 bg-opacity-90 text-gray-500 text-xs flex justify-center items-center z-10 rounded-2xl">
                현재 미구현, 특수 옵션 2개만 활용합니다. 공용 옵션 선택 추가 예정
              </div> */}

                {/* 옵션이 200000일 경우만 덮기 */}
                {/* {options.categoryCode === 200000 && (
                <div className="absolute inset-0 bg-gray-200 z-10 flex justify-center items-center rounded-2xl m-1">
                  <p className="text-xs text-red-500 font-bold">특옵만 선택합니다</p>
                </div>
              )} */}

                {/* 왼쪽 "연마효과" 그룹 */}
                <div className="grid grid-cols-4 flex items-center justify-center ">
                  <div className="col-span-1 flex justify-center">
                    <p className="size-font-xs pl-2 font-bold">공용</p>
                  </div>
                  <div className="col-span-3 justify-center items-center">
                    <div className="flex justify-center items-center">
                      <SelectBox
                        options={optionProps}
                        value={options.selOpt3}
                        name="selOpt3"
                        onOptionsChange={onOptionsChange}
                        css="size-font-xxs text-center rounded-xl border-gray-400 border-2 bg-[#F5F5F5]"
                      />
                    </div>
                  </div>
                </div>

                {/* 오른쪽 "등급" 그룹 */}
                <div className="border-gray-200 flex items-center justify-center">
                  <div className="flex gap-2 justify-center items-center">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name={`${staticNameList.id}selVal3`}
                        value="3"
                        checked={options.selVal3 === "3"}
                        className="mr-1"
                        onChange={(e) =>
                          onOptionsChange("selVal3", e.target.value)
                        }
                      />
                      <span className="text-xs">상</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name={`${staticNameList.id}selVal3`}
                        value="2"
                        checked={options.selVal3 === "2"}
                        className="mr-1"
                        onChange={(e) =>
                          onOptionsChange("selVal3", e.target.value)
                        }
                      />
                      <span className="text-xs">중</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name={`${staticNameList.id}selVal3`}
                        checked={options.selVal3 === "1"}
                        value="1"
                        className="mr-1"
                        onChange={(e) =>
                          onOptionsChange("selVal3", e.target.value)
                        }
                      />
                      <span className="text-xs">하</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name={`${staticNameList.id}selVal3`}
                        checked={options.selVal3 === null}
                        value={null}
                        className="mr-1"
                        onChange={() => onOptionsChange("selVal3", null)}
                      />
                      <span className="text-xs">X</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-2 px-2 grid grid-cols-2 border-t-2 border-gray-300 flex gap-x-6 items-center justify-center">
          <div className="grid grid-cols-4">
            <div className="font-bold col-span-1  border-gray-200 border-gray-300 flex items-center justify-center size-font-xs">
              힘민지%
            </div>
            <div className="col-span-3 flex items-center justify-center">
              <div className="w-3/4 pl-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={options.statPer || 0}
                  onChange={(e) =>
                    onOptionsChange(
                      "statPer",
                      parseInt(e.target.value, 10) || null
                    )
                  }
                  className="slider w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>
              <div className="w-1/4 text-center text-xs text-gray-500">
                <input
                  className="w-full text-center rounded-2xl border border-gray-300"
                  placeholder="0"
                  type="number"
                  min="0"
                  max="100"
                  value={options.statPer || 0}
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    onOptionsChange(
                      "statPer",
                      isNaN(value) ? null : Math.min(100, Math.max(0, value))
                    );
                  }}
                />
              </div>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-4">
              <div className="font-bold col-span-1 flex items-center justify-center text-[8px]">
                연마 단계
              </div>
              <div className="col-span-3 flex items-center justify-center">
                <form className="grid grid-cols-4 gap-2 justify-items-center">
                  <label>
                    <input
                      type="radio"
                      name={`${staticNameList.id}_upgradeLevel`}
                      value={null}
                      className="mr-1"
                      checked={options.upgradeLevel === null}
                      onChange={() => onOptionsChange("upgradeLevel", null)}
                    />
                    <span className="text-[8px]">All</span>
                  </label>

                  <label>
                    <input
                      type="radio"
                      name={`${staticNameList.id}_upgradeLevel`}
                      value="1"
                      className="mr-1"
                      checked={options.upgradeLevel === "1"}
                      onChange={(e) =>
                        onOptionsChange("upgradeLevel", e.target.value)
                      }
                    />
                    <span className="text-xs">1</span>
                  </label>

                  <label>
                    <input
                      type="radio"
                      name={`${staticNameList.id}_upgradeLevel`}
                      value="2"
                      className="mr-1"
                      checked={options.upgradeLevel === "2"}
                      onChange={(e) =>
                        onOptionsChange("upgradeLevel", e.target.value)
                      }
                    />
                    <span className="text-xs">2</span>
                  </label>

                  <label>
                    <input
                      type="radio"
                      name={`${staticNameList.id}_upgradeLevel`}
                      value="3"
                      className="mr-1"
                      checked={options.upgradeLevel === "3"}
                      onChange={(e) =>
                        onOptionsChange("upgradeLevel", e.target.value)
                      }
                    />
                    <span className="text-xs">3</span>
                  </label>
                </form>
              </div>
            </div>
            <div className="grid grid-cols-4">
              <div className="col-span-1 flex items-center justify-center font-bold text-[8px]">
                거래 횟수
              </div>
              <div className="col-span-3 flex items-center justify-center">
                <form className="grid grid-cols-4 gap-2 justify-items-center">
                  <label>
                    <input
                      type="radio"
                      name={`${staticNameList.id}tradeCount`}
                      value={null}
                      className="mr-1"
                      checked={options.trdCnt === null}
                      onChange={() => onOptionsChange("trdCnt", null)}
                    />
                    <span className="text-[8px]">All</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={`${staticNameList.id}tradeCount`}
                      value="0"
                      className="mr-1"
                      checked={options.trdCnt === "0"}
                      onChange={(e) =>
                        onOptionsChange("trdCnt", e.target.value)
                      }
                    />
                    <span className="text-xs">0</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={`${staticNameList.id}tradeCount`}
                      value="1"
                      className="mr-1"
                      checked={options.trdCnt === "1"}
                      onChange={(e) =>
                        onOptionsChange("trdCnt", e.target.value)
                      }
                    />
                    <span className="text-xs">1</span>
                  </label>

                  <label>
                    <input
                      type="radio"
                      name={`${staticNameList.id}tradeCount`}
                      value="2"
                      className="mr-1"
                      checked={options.trdCnt === "2"}
                      onChange={(e) =>
                        onOptionsChange("trdCnt", e.target.value)
                      }
                    />
                    <span className="text-xs">2</span>
                  </label>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectOptionComp;
