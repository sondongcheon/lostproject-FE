import React, { useState, useEffect } from "react";

import ItemsTopMenu from "./Component/ItemsTopMenu";
import FixChartJewelPage from "./Component/FixChartJewelPage";

import DisplayAds from "../../common/Component/DisplayAds";

function MChartJewel({ request, setRequest }) {
  const [visualState, setVisualState] = useState(Array(8).fill(true));

  const updateOption = (key, value) => {
    setRequest((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const pointList = [
    {
      value: 8,
      content: "8개",
    },
    {
      value: 10,
      content: "15개",
    },
    {
      value: 15,
      content: "15개",
    },
  ];

  const timeList = [
    {
      value: 1,
      content: "1일 간격",
    },
    {
      value: 2,
      content: "2일 간격",
    },
    {
      value: 3,
      content: "3일 간격",
    },
    {
      value: 4,
      content: "4일 간격",
    },
    {
      value: 5,
      content: "5일 간격",
    },
    {
      value: 7,
      content: "7일 간격",
    },
  ];

  const grapeControll = (index) => {
    setVisualState((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      localStorage.setItem("ItemsJewelSetting", JSON.stringify(newState));
      return newState;
    });
  };

  const setAll = (bool) => {
    const newState = Array(8).fill(bool);
    setVisualState(newState);
    localStorage.setItem("ItemsJewelSetting", JSON.stringify(newState));
  };

  useEffect(() => {
    const savedState = localStorage.getItem("ItemsJewelSetting");
    if (savedState) {
      setVisualState(JSON.parse(savedState));
    }
  }, []);

  return (
    <div>
      <div className="mainMobileBody">
        <div className="flex ">
          <div className="mx-auto w-[30%] ">
            <ItemsTopMenu />
          </div>
          <div className="p-4 w-[65%] flex max-h-44 mx-auto bg-[#e0dedf] rounded-xl inset-shadow-sm shadow-inset-indigo overflow-scroll">
            <div className="w-[35%]">
              <h1 className="font-bold size-font-xs my-auto">
                | 이 보석만 볼래요
              </h1>
              <div className="grid grid-rows-4 size-font-xs">
                <button
                  className="presetBtm m-1 p-1 rounded-lg bg-[#b2ddad]"
                  onClick={() => {
                    setAll(true);
                  }}
                >
                  ✅ 전체 선택
                </button>
                <button
                  className="presetBtm m-1 p-1 rounded-lg bg-[#b2ddad]"
                  onClick={() => {
                    setAll(false);
                  }}
                >
                  🗑️ 전체 해제
                </button>
                <div className="flex flex-col items-center justify-center">
                  <span className="">조회 시간 주기&nbsp;</span>
                  <select
                    value={request.time || ""}
                    onChange={(e) => updateOption("time", e.target.value)}
                    className="text-center size-font-xs rounded-xl border-gray-400 border-2 w-16 bg-[#F5F5F5]"
                  >
                    <option value="" disabled>
                      옵션선택
                    </option>
                    {timeList.map((time) => (
                      <option value={time.value}>{time.content}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <span className="">조회 지점 갯수&nbsp;</span>
                  <select
                    value={request.point || ""}
                    onChange={(e) => updateOption("point", e.target.value)}
                    className="text-center size-font-xs rounded-xl border-gray-400 border-2 w-16 bg-[#F5F5F5]"
                  >
                    <option value="" disabled>
                      옵션선택
                    </option>
                    {pointList.map((pointList) => (
                      <option value={pointList.value}>
                        {pointList.content}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="w-[65%] overflow-scroll size-font-xs space-y-4">
              <button
                className={`w-[90%] m-auto justify-center presetBtm rounded-lg flex items-baseline text-center bg-white text-gray-500 font-bold ${
                  visualState[0] ? "inset-shadow-sm shadow-inset-indigo" : ""
                }`}
                onClick={() => grapeControll(0)}
              >
                <span className=" text-xl text-[#E38E49]">10</span> 레벨 겁화
              </button>
              <button
                className={`w-[90%] m-auto justify-center presetBtm rounded-lg flex items-baseline text-center bg-white text-gray-500 font-bold ${
                  visualState[1] ? "inset-shadow-sm shadow-inset-indigo" : ""
                }`}
                onClick={() => grapeControll(1)}
              >
                <span className=" text-xl text-[#E38E49]">10</span> 레벨 작열
              </button>
              <button
                className={`w-[90%] m-auto justify-center presetBtm rounded-lg flex items-baseline text-center bg-white text-gray-500 font-bold ${
                  visualState[2] ? "inset-shadow-sm shadow-inset-indigo" : ""
                }`}
                onClick={() => grapeControll(2)}
              >
                <span className=" text-xl text-[#7E1891]">9</span> 레벨 겁화
              </button>
              <button
                className={`w-[90%] m-auto justify-center presetBtm rounded-lg flex items-baseline text-center bg-white text-gray-500 font-bold ${
                  visualState[3] ? "inset-shadow-sm shadow-inset-indigo" : ""
                }`}
                onClick={() => grapeControll(3)}
              >
                <span className=" text-xl text-[#7E1891]">9</span> 레벨 작열
              </button>
              <button
                className={`w-[90%] m-auto justify-center presetBtm rounded-lg flex items-baseline text-center bg-white text-gray-500 font-bold ${
                  visualState[4] ? "inset-shadow-sm shadow-inset-indigo" : ""
                }`}
                onClick={() => grapeControll(4)}
              >
                <span className=" text-xl text-[#0A3981]">8</span> 레벨 겁화
              </button>
              <button
                className={`w-[90%] m-auto justify-center presetBtm rounded-lg flex items-baseline text-center bg-white text-gray-500 font-bold ${
                  visualState[5] ? "inset-shadow-sm shadow-inset-indigo" : ""
                }`}
                onClick={() => grapeControll(5)}
              >
                <span className=" text-xl text-[#0A3981]">8</span> 레벨 작열
              </button>
              <button
                className={`w-[90%] m-auto justify-center presetBtm rounded-lg flex items-baseline text-center bg-white text-gray-500 font-bold ${
                  visualState[6] ? "inset-shadow-sm shadow-inset-indigo" : ""
                }`}
                onClick={() => grapeControll(6)}
              >
                <span className=" text-xl ">7</span>레벨 겁화
              </button>

              <button
                className={`w-[90%] m-auto justify-center presetBtm rounded-lg flex items-baseline text-center bg-white text-gray-500 font-bold ${
                  visualState[7] ? "inset-shadow-sm shadow-inset-indigo" : ""
                }`}
                onClick={() => grapeControll(7)}
              >
                <span className=" text-xl ">7</span>레벨 작열
              </button>
            </div>
          </div>
        </div>
        <div className="">
          <FixChartJewelPage
            request={request}
            updateOption={updateOption}
            visualState={visualState}
            setVisualState={setVisualState}
          />
        </div>
        <DisplayAds />
      </div>
    </div>
  );
}

export default MChartJewel;
