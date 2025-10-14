import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import DisplayAds from "@/common/Component/DisplayAds";
import SelectTopMenu from "./Component/SelectTopMenu";

import red from "@/Assets/gem/simulator_red.png";
import blue from "@/Assets/gem/simulator_blue.png";
import yellow from "@/Assets/gem/simulator_yellow.png";
import green from "@/Assets/gem/simulator_greed.png";

const SimulatorGem = ({}) => {
  const { type } = useParams();

  const [useGold, setUseGold] = useState(0);
  const [grade, setGrade] = useState(9);
  const [tooltip, setTooltip] = useState(false);

  const [gemState, setGemState] = useState({
    optionNum: [0, 0, 0, 0],
    optionName: [null, null, null, null],
    optionState: [1, 1, 1, 1],
    costExtraPercent: 0,
    remainingProcessCount: 9,
    effectNum: [],
    effectName: [],
    rerollChoiceList: 1,
    choiceEffect: "가공 이전",
    weight: [],
  });

  const updateOption = (key, value) => {
    setGemState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const loadPage = (grade) => {
    axios
      .post(
        `${process.env.REACT_APP_URL}/simulator/gem/${type}?grade=${grade}`,
        gemState
      )
      .then((res) => {
        setGemState(res.data.data);
        setGrade(grade);
        console.log(res.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  function nameCustom(name) {
    if (!name) return "";
    if (name.includes("첫번째")) {
      return (
        <>
          {gemState.optionName[0]} <br />
          {name.substring(7).includes("증가") ? (
            <span className="text-green-600"> {name.substring(7)} ▲ </span>
          ) : name.substring(7).includes("감소") ? (
            <span className="text-red-600"> {name.substring(7)} ▼ </span>
          ) : (
            name.substring(4)
          )}
        </>
      );
    } else if (name.includes("두번째")) {
      return (
        <>
          {gemState.optionName[1]} <br />
          {name.substring(7).includes("증가") ? (
            <span className="text-green-600"> {name.substring(7)} ▲ </span>
          ) : name.substring(7).includes("감소") ? (
            <span className="text-red-600"> {name.substring(7)} ▼ </span>
          ) : (
            name.substring(4)
          )}
        </>
      );
    }

    const match = name.match(/(.+?)([+-]\d+.*)/);
    if (match) {
      const [, label, value] = match;
      const isIncrease = value.trim().startsWith("+");

      return (
        <>
          {label.trim()} <br />
          <span className={isIncrease ? "text-green-600" : "text-red-600"}>
            {value.trim()} {isIncrease ? "▲" : "▼"}
          </span>
        </>
      );
    }

    return name;
  }

  const processGem = () => {
    setUseGold(useGold + (9 * gemState.costExtraPercent + 900));
    axios
      .post(
        `${process.env.REACT_APP_URL}/simulator/gem/process/${type}`,
        gemState
      )
      .then((res) => {
        setGemState(res.data.data);
        console.log(res.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const rerollGem = () => {
    updateOption("rerollChoiceList", gemState.rerollChoiceList - 1);
    axios
      .post(`${process.env.REACT_APP_URL}/simulator/gem/reroll`, gemState)
      .then((res) => {
        updateOption("effectNum", res.data.data.effectNum);
        updateOption("effectName", res.data.data.effectName);
        updateOption("weight", res.data.data.weight);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    loadPage(9);
  }, [type]);

  return (
    <div className="mainMobileBody">
      <SelectTopMenu />

      {/* 젬 등급 선택 */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-4 mx-2 mt-4">
        <h3 className="size-font-xs font-bold text-purple-600 dark:text-purple-400 mb-3 text-center">
          젬 등급 선택/초기화
        </h3>
        <div className="grid grid-cols-3 gap-2">
          <button
            className="p-2 rounded-lg font-bold text-white bg-emerald-700 hover:bg-emerald-800"
            onClick={() => {
              loadPage(5);
              setGrade(5);
            }}
          >
            <img
              src="https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_13_114.png"
              alt="고급"
              className="w-6 h-6 mx-auto"
            />
            <span className="size-font-xs">고급 (5회)</span>
          </button>
          <button
            className="p-2 rounded-lg font-bold text-white bg-blue-700 hover:bg-blue-800"
            onClick={() => {
              loadPage(7);
              setGrade(7);
            }}
          >
            <img
              src="https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_13_114.png"
              alt="희귀"
              className="w-6 h-6 mx-auto"
            />
            <span className="size-font-xs">희귀 (7회)</span>
          </button>
          <button
            className="p-2 rounded-lg font-bold text-white bg-purple-700 hover:bg-purple-800"
            onClick={() => {
              loadPage(9);
              setGrade(9);
            }}
          >
            <img
              src="https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_13_114.png"
              alt="영웅"
              className="w-6 h-6 mx-auto"
            />
            <span className="size-font-xs">영웅 (9회)</span>
          </button>
        </div>
      </div>

      {/* 젬 시뮬레이터 메인 */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-4 mx-2 mt-4">
        <div className="flex h-[4rem] items-center justify-between mb-4 gap-2">
          <h3 className="size-font-xl font-bold text-cyan-600 dark:text-cyan-400">
            젬 시뮬레이터
          </h3>
          <div className="flex gap-2">
            {/* 누적 골드 */}
            <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-lg px-2 py-1 border border-yellow-300 dark:border-yellow-600">
              <div className="size-font-xs font-bold text-yellow-800 dark:text-yellow-200 text-center">
                💰 누적골드
              </div>
              <div className="size-font-xs text-yellow-700 dark:text-yellow-300 text-center whitespace-nowrap">
                {useGold.toLocaleString()}G
              </div>
            </div>
            {/* 선택된 옵션 */}
            <div className="bg-violet-100 dark:bg-violet-900/30 rounded-lg px-2 py-1 border border-violet-300 dark:border-violet-600">
              <div className="size-font-xs font-bold text-violet-800 dark:text-violet-200 text-center">
                🎯 가공된옵션
              </div>
              <div className="size-font-xs text-violet-700 dark:text-violet-300 text-center min-w-[60px]">
                {gemState.choiceEffect === "가공이전"
                  ? gemState.choiceEffect
                  : nameCustom(gemState.choiceEffect)}
              </div>
            </div>
          </div>
        </div>

        {/* 젬 배치 - 다이아몬드 형태 (모바일 최적화) */}
        <div className="flex justify-center items-center mb-4">
          <div className="grid grid-cols-3 gap-2">
            {/* 좌측 젬 (녹색) */}
            <div className="my-auto">
              <div
                className="w-20 h-20 flex items-center justify-center text-center text-white text-xs"
                style={{
                  backgroundImage: `url(${green})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="">
                  <div className="font-semibold size-font-xs">
                    {gemState.optionName[0]}
                  </div>
                  <div className="font-bold mt-1 size-font-xs">
                    Lv. {gemState.optionState[0]}
                  </div>
                </div>
              </div>
            </div>

            <div>
              {/* 상단 젬 (빨간색) */}
              <div className="">
                <div
                  className="w-20 h-20 flex items-center justify-center text-center text-white text-xs"
                  style={{
                    backgroundImage: `url(${red})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div className="">
                    <div className="leading-tight font-semibold size-font-xs">
                      {gemState.optionName[2]}
                    </div>
                    <div className="font-bold mt-1 size-font-xs">
                      Lv. {gemState.optionState[2]}
                    </div>
                  </div>
                </div>
              </div>
              {/* 하단 젬 (노란색) */}
              <div className="">
                <div
                  className="w-20 h-20 flex items-center justify-center text-center text-white text-xs"
                  style={{
                    backgroundImage: `url(${yellow})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div className="">
                    <div className="leading-tight font-semibold size-font-xs">
                      {gemState.optionName[3]}
                    </div>
                    <div className="font-bold mt-1 size-font-xs">
                      Lv. {gemState.optionState[3]}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 우측 젬 (파란색) */}
            <div className="my-auto">
              <div
                className="w-20 h-20 flex items-center justify-center text-center text-white text-xs"
                style={{
                  backgroundImage: `url(${blue})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="">
                  <div className="leading-tight font-semibold size-font-xs">
                    {gemState.optionName[1]}
                  </div>
                  <div className="font-bold mt-1 size-font-xs">
                    Lv. {gemState.optionState[1]}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 효과 선택 */}
        <div className="grid grid-cols-2 gap-2 mt-4 mx-8">
          {gemState.effectName.map((effect, index) => {
            return (
              <div key={index} className="">
                <div
                  className="w-full h-10 flex items-center justify-center font-bold size-font-xs rounded-lg"
                  style={{
                    backgroundImage: `url(${blue})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div className="bg-black/50 p-2 rounded-lg text-center text-white size-font-xs font-semibold">
                    {nameCustom(effect)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 액션 버튼들 */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-4 mx-2 mt-4 grid grid-cols-3 gap-2">
        {/* 확률 확인 */}
        <div className="relative">
          <button
            className="w-full p-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg shadow-lg"
            onClick={() => setTooltip(!tooltip)}
          >
            <div className="flex justify-center items-center space-x-2">
              <span className="size-font-xxs">📊</span>
              <span className="size-font-xs">
                다른 항목 출현 기대 확률 확인
              </span>
            </div>
          </button>

          {/* 툴팁 내용 */}
          {tooltip && (
            <div className="absolute w-[300%] mt-2 p-4 bg-slate-900 text-white rounded-xl shadow-2xl z-50 border border-slate-700 max-h-60 overflow-y-auto">
              <div className="text-center mb-3">
                <h4 className="size-font-xs font-bold text-purple-300">
                  <span className="mr-2">🎲</span>
                  출현 확률
                </h4>
              </div>
              <div className="space-y-2">
                {gemState.weight.map((effect) => (
                  <div
                    key={effect.num}
                    className="flex justify-between items-center py-2 px-3 bg-slate-800/50 rounded-lg border border-slate-700"
                  >
                    <span className="font-semibold size-font-5xs flex-1">
                      {nameCustom(effect.name)}
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="w-12 bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-purple-500 h-2 rounded-full"
                          style={{
                            width: `${Math.min(effect.weight * 2, 100)}%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-purple-300 font-bold size-font-5xs min-w-[40px] text-right">
                        {effect.weight.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          className={`w-full p-3 rounded-lg font-bold text-white ${
            gemState.rerollChoiceList === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-cyan-600 hover:bg-cyan-700"
          }`}
          onClick={() => rerollGem()}
          disabled={gemState.rerollChoiceList === 0}
        >
          <div className="flex items-center justify-center space-x-2">
            <span className="size-font-xs">🔄</span>
            <div>
              <div className="size-font-xs">다른 항목 보기</div>
              <div className="size-font-xs opacity-90">
                {gemState.rerollChoiceList}회 남음
              </div>
            </div>
          </div>
        </button>

        <button
          className={`w-full p-3 rounded-lg font-bold text-white ${
            gemState.remainingProcessCount > 0
              ? "bg-emerald-600 hover:bg-emerald-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          onClick={() => processGem()}
          disabled={gemState.remainingProcessCount === 0}
        >
          <div className="flex items-center justify-center space-x-2">
            <span className="size-font-xs">⚡</span>
            <div>
              <div className="size-font-xs">가공 하기</div>
              <div className="size-font-xs opacity-90">
                {gemState.remainingProcessCount} / {grade} -{" "}
                {(9 * gemState.costExtraPercent + 900).toLocaleString()}G
              </div>
            </div>
          </div>
        </button>
      </div>

      <div className="text-center py-4 mx-2">
        <p className="size-font-xs border-2 border-gray-400 dark:border-gray-600 p-3 rounded-lg">
          BETA 버전입니다. 오류 확인, 가시성 개선 작업 진행중
        </p>
      </div>

      <DisplayAds />
    </div>
  );
};

export default SimulatorGem;
