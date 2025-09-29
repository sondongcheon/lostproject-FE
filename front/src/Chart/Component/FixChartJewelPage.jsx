import React, { useState, useEffect } from "react";

import LineChartJewelComp from "./LineChartJewelComp";
import SelectBox from "../../common/Component/SelectBox";

const FixChartJewelPage = ({ request, setRequest }) => {
  const SectionDivider = ({ title, color }) => {
    const colorMap = {
      orange: "bg-[#f97316] text-white",
      purple: "bg-[#7E1891] text-white",
      deepblue: "bg-[#0A3981] text-white",
      black: "bg-[#000000] text-white",
    };

    const colorClass =
      colorMap[color] || "bg-gray-100 text-gray-700 border-gray-300";
    return (
      <div className="flex items-center m-10 ">
        <div className="flex-1 border-t-4 border-gray-300" />
        <h2
          className={`mx-4 px-4 py-1 text-lg font-bold ${colorClass} rounded-full`}
        >
          {title}
        </h2>
        <div className="flex-1 border-t-4 border-gray-300" />
      </div>
    );
  };

  const pointList = [
    {
      value: 10,
      content: "10개",
    },
    {
      value: 15,
      content: "15개",
    },
    {
      value: 20,
      content: "20개",
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

  const updateOption = (key, value) => {
    setRequest((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const [visualState, setVisualState] = useState(Array(8).fill(true));

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
    updateOption("time", 1);
    updateOption("point", 15);
  }, []);

  return (
    <div>
      <div className="mx-auto w-[95%] flex h-28 px-6 py-2 bg-[#e0dedf] dark:bg-[#1e1d1f] rounded-2xl inset-shadow-sm shadow-inset-indigo">
        <div className="w-[15%] my-auto">
          <h1 className="font-bold text-xl">| 이 보석만 볼래요</h1>
          <div className="grid grid-rows-2 text-sm">
            <button
              className="scaleBtm m-1 mx-4 rounded-lg bg-[#b2ddad] dark:bg-[#2d4f29]"
              onClick={() => {
                setAll(true);
              }}
            >
              ✅ 전체 선택
            </button>
            <button
              className="scaleBtm m-1 mx-4 rounded-lg bg-[#b2ddad] dark:bg-[#2d4f29]"
              onClick={() => {
                setAll(false);
              }}
            >
              🗑️ 전체 해제
            </button>
          </div>
        </div>
        <div className="w-[25%] grid grid-cols-2">
          <div className="flex flex-col items-center justify-center">
            <span className="">조회 시간 주기&nbsp;</span>
            <select
              value={request.time || ""}
              onChange={(e) => updateOption("time", e.target.value)}
              className="text-center rounded-xl border-gray-400 border-2 w-24 bg-[#F5F5F5] dark:bg-[#2A2A2A] "
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
              className="text-center rounded-xl border-gray-400 border-2 w-24 bg-[#F5F5F5] dark:bg-[#2A2A2A]"
            >
              <option value="" disabled>
                옵션선택
              </option>
              {pointList.map((pointList) => (
                <option value={pointList.value}>{pointList.content}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="w-[60%] grid grid-cols-4 grid-rows-2 text-sm">
          <button
            className={`m-2 p-1 w-[90%] justify-center scaleBtm rounded-lg flex m-auto items-baseline text-center bgWtoB text-gray-500 dark:text-gray-300 font-bold ${
              visualState[0] ? "inset-shadow-sm shadow-inset-indigo" : ""
            }`}
            onClick={() => grapeControll(0)}
          >
            <span className=" text-xl text-[#E38E49]">10</span> 레벨 겁화
          </button>
          <button
            className={`m-2 p-1 w-[90%] justify-center scaleBtm rounded-lg flex m-auto items-baseline text-center bgWtoB text-gray-500 dark:text-gray-300 font-bold ${
              visualState[1] ? "inset-shadow-sm shadow-inset-indigo" : ""
            }`}
            onClick={() => grapeControll(1)}
          >
            <span className=" text-xl text-[#E38E49]">10</span> 레벨 작열
          </button>
          <button
            className={`m-2 p-1 w-[90%] justify-center scaleBtm rounded-lg flex m-auto items-baseline text-center bgWtoB text-gray-500 dark:text-gray-300 font-bold ${
              visualState[2] ? "inset-shadow-sm shadow-inset-indigo" : ""
            }`}
            onClick={() => grapeControll(2)}
          >
            <span className=" text-xl text-[#7E1891]">9</span> 레벨 겁화
          </button>
          <button
            className={`m-2 p-1 w-[90%] justify-center scaleBtm rounded-lg flex m-auto items-baseline text-center bgWtoB text-gray-500 dark:text-gray-300 font-bold ${
              visualState[3] ? "inset-shadow-sm shadow-inset-indigo" : ""
            }`}
            onClick={() => grapeControll(3)}
          >
            <span className=" text-xl text-[#7E1891]">9</span> 레벨 작열
          </button>
          <button
            className={`m-2 p-1 w-[90%] justify-center scaleBtm rounded-lg flex m-auto items-baseline text-center bgWtoB text-gray-500 dark:text-gray-300 font-bold ${
              visualState[4] ? "inset-shadow-sm shadow-inset-indigo" : ""
            }`}
            onClick={() => grapeControll(4)}
          >
            <span className=" text-xl text-[#0A3981]">8</span> 레벨 겁화
          </button>
          <button
            className={`m-2 p-1 w-[90%] justify-center scaleBtm rounded-lg flex m-auto items-baseline text-center bgWtoB text-gray-500 dark:text-gray-300 font-bold ${
              visualState[5] ? "inset-shadow-sm shadow-inset-indigo" : ""
            }`}
            onClick={() => grapeControll(5)}
          >
            <span className=" text-xl text-[#0A3981]">8</span> 레벨 작열
          </button>
          <button
            className={`m-2 p-1 w-[90%] justify-center scaleBtm rounded-lg flex m-auto items-baseline text-center bgWtoB text-gray-500 dark:text-gray-300 font-bold ${
              visualState[6] ? "inset-shadow-sm shadow-inset-indigo" : ""
            }`}
            onClick={() => grapeControll(6)}
          >
            <span className=" text-xl ">7</span>레벨 겁화
          </button>

          <button
            className={`m-2 p-1 w-[90%] justify-center scaleBtm rounded-lg flex m-auto items-baseline text-center bgWtoB text-gray-500 dark:text-gray-300 font-bold ${
              visualState[7] ? "inset-shadow-sm shadow-inset-indigo" : ""
            }`}
            onClick={() => grapeControll(7)}
          >
            <span className=" text-xl ">7</span>레벨 작열
          </button>
        </div>
      </div>

      <div className="mb-10 space-y-10">
        <div className={visualState[0] || visualState[1] ? "" : "hidden"}>
          <SectionDivider title="10" color="orange" />
        </div>
        <div className={visualState[0] ? "" : "hidden"}>
          <LineChartJewelComp
            name={"geop"}
            level={10}
            request={request}
            img={
              "https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_12_105.png"
            }
          />
        </div>

        <div className={visualState[1] ? "" : "hidden"}>
          <LineChartJewelComp
            name={"jack"}
            level={10}
            request={request}
            img={
              "https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_12_115.png"
            }
          />
        </div>

        <div className={visualState[2] || visualState[3] ? "" : "hidden"}>
          <SectionDivider title="9" color="purple" />
        </div>
        <div className={visualState[2] ? "" : "hidden"}>
          <LineChartJewelComp
            name={"geop"}
            level={9}
            request={request}
            img={
              "https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_12_104.png"
            }
          />
        </div>
        <div className={visualState[3] ? "" : "hidden"}>
          <LineChartJewelComp
            name={"jack"}
            level={9}
            request={request}
            img={
              "https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_12_114.png"
            }
          />
        </div>

        <div className={visualState[4] || visualState[5] ? "" : "hidden"}>
          <SectionDivider title="8" color="deepblue" />
        </div>

        <div className={visualState[4] ? "" : "hidden"}>
          <LineChartJewelComp
            name={"geop"}
            level={8}
            request={request}
            img={
              "https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_12_103.png"
            }
          />
        </div>
        <div className={visualState[5] ? "" : "hidden"}>
          <LineChartJewelComp
            name={"jack"}
            level={8}
            request={request}
            img={
              "https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_12_113.png"
            }
          />
        </div>

        <div className={visualState[6] || visualState[7] ? "" : "hidden"}>
          <SectionDivider title="7" color="black" />
        </div>

        <div className={visualState[6] ? "" : "hidden"}>
          <LineChartJewelComp
            name={"geop"}
            level={7}
            request={request}
            img={
              "https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_12_102.png"
            }
          />
        </div>
        <div className={visualState[7] ? "" : "hidden"}>
          <LineChartJewelComp
            name={"jack"}
            level={7}
            request={request}
            img={
              "https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_12_112.png"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default FixChartJewelPage;
