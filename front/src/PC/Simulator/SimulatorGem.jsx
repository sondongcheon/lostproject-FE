import React, { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import SelectSideBar from "./Components/SelectSideBar";
import DisplayAds from "@/common/Component/DisplayAds";

import red from "@/Assets/gem/simulator_red.png";
import blue from "@/Assets/gem/simulator_blue.png";
import yellow from "@/Assets/gem/simulator_yellow.png";
import green from "@/Assets/gem/simulator_greed.png";
import { yearsToQuarters } from "date-fns";

const SimulatorGem = ({}) => {
  const { type } = useParams();
  const navigate = useNavigate();

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
      //, { params: { page: 0 }, }
      .post(`${process.env.REACT_APP_URL}/simulator/gem/${type}?grade=${grade}`, gemState)
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
    if (!name) return ""; // 문자열이 null 또는 undefined인 경우 처리
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

    // +숫자 / -숫자 패턴 처리 (증가/감소 포함)
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

    // 기본 반환
    return name;
  }

  const processGem = () => {
    setUseGold(useGold + (9 * gemState.costExtraPercent + 900));
    axios
      //, { params: { page: 0 }, }
      .post(`${process.env.REACT_APP_URL}/simulator/gem/process/${type}`, gemState)
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
    <div className="">
      <div className="flex">
        <div className="mt-32 w-[15%]">
          <DisplayAds />
        </div>

        <div className="mainbody flex">
          <div className="w-[15%]">
            <SelectSideBar />
          </div>
          <div className="w-[85%]">
            {/* 메인 시뮬레이터 영역 */}
            <div className="bg-white/50 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mx-8 mt-8 border border-white/20">
              <div className="grid grid-cols-10 gap-x-8">
                {/* 젬 등급 선택 패널 */}
                <div className="col-span-3 space-y-4 h-[22rem]">
                  <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-8 text-center">
                    젬 등급 선택/초기화
                  </h3>
                  <div className="grid grid-cols-3 space-x-2">
                    <button
                      className="p-2 rounded-2xl font-bold text-white bg-emerald-700 hover:bg-emerald-800 transform hover:scale-110 transition-all duration-300 shadow-xl hover:shadow-2xl border-2 border-emerald-500"
                      onClick={() => {
                        loadPage(5);
                        setGrade(5);
                      }}
                    >
                      <div className="flex flex-col items-center space-y-1">
                        <div className="flex items-center space-x-2">
                          <img
                            src="https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_13_114.png"
                            alt="고급"
                            className="w-6 h-6"
                          />
                          <span className="text-lg">고급</span>
                        </div>
                        <span className="text-xs">5회 가공 가능</span>
                      </div>
                    </button>
                    <button
                      className="p-2 rounded-2xl font-bold text-white bg-blue-700 hover:bg-blue-800 transform hover:scale-110 transition-all duration-300 shadow-xl hover:shadow-2xl border-2 border-blue-500"
                      onClick={() => {
                        loadPage(7);
                        setGrade(7);
                      }}
                    >
                      <div className="flex flex-col items-center space-y-1">
                        <div className="flex items-center space-x-2">
                          <img
                            src="https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_13_114.png"
                            alt="희귀"
                            className="w-6 h-6"
                          />
                          <span className="text-lg">희귀</span>
                        </div>
                        <span className="text-xs">7회 가공 가능</span>
                      </div>
                    </button>
                    <button
                      className="p-2 rounded-2xl font-bold text-white bg-purple-700 hover:bg-purple-800 transform hover:scale-110 transition-all duration-300 shadow-xl hover:shadow-2xl border-2 border-purple-500"
                      onClick={() => {
                        loadPage(9);
                        setGrade(9);
                      }}
                    >
                      <div className="flex flex-col items-center space-y-1">
                        <div className="flex items-center space-x-2">
                          <img
                            src="https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_13_114.png"
                            alt="영웅"
                            className="w-6 h-6"
                          />
                          <span className="text-lg">영웅</span>
                        </div>
                        <span className="text-xs">9회 가공가능</span>
                      </div>
                    </button>
                  </div>

                  {/* 골드 사용량 표시 */}
                  <div className="p-2 bg-yellow-500 rounded-2xl border-2 border-yellow-300 shadow-lg">
                    <div className="text-center">
                      <div className="text-lg font-bold text-yellow-900 justify-between flex px-8">
                        💰 누적 사용 골드
                        <span className="font-bold text-yellow-800">
                          {useGold.toLocaleString()} G
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 선택된 옵션 표시 */}
                  <div className="bg-violet-100 dark:bg-violet-900/30 rounded-2xl p-4 border-2 border-violet-300 dark:border-violet-600 shadow-lg">
                    <div className="text-center">
                      <div className="text-sm font-bold text-violet-800 dark:text-violet-200 mb-3 flex items-center justify-center">
                        <span className="mr-2">🎯</span>
                        마지막으로 선택된 옵션
                      </div>
                      <div className="text-lg text-violet-700 dark:text-violet-300 bg-white/50 dark:bg-black/30 rounded-xl p-2">
                        {gemState.choiceEffect === "가공이전"
                          ? gemState.choiceEffect
                          : nameCustom(gemState.choiceEffect)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 젬 시뮬레이터 메인 영역 */}
                <div className="col-span-4 h-[22rem]">
                  <h3 className="text-2xl font-bold text-cyan-600 dark:text-cyan-400 mb-8 text-center">
                    젬 시뮬레이터
                  </h3>

                  {/* 젬 배치 - 다이아몬드 형태 */}
                  <div className="flex justify-center items-center">
                    <div className="grid grid-cols-3 gap-4">
                      {/* 좌측 젬 (녹색) */}
                      <div className="my-auto">
                        <div
                          className="w-32 h-32 flex items-center justify-center text-center text-white text-sm transform transition-all duration-300"
                          style={{
                            backgroundImage: `url(${green})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                          }}
                        >
                          <div className="">
                            <div className="font-semibold">{gemState.optionName[0]}</div>
                            <div className="font-bold mt-1">Lv. {gemState.optionState[0]}</div>
                          </div>
                        </div>
                      </div>

                      <div>
                        {/* 상단 젬 (빨간색) */}
                        <div className="">
                          <div
                            className="w-32 h-32 flex items-center justify-center text-center text-white text-sm transform transition-all duration-300"
                            style={{
                              backgroundImage: `url(${red})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              backgroundRepeat: "no-repeat",
                            }}
                          >
                            <div className="">
                              <div className="leading-tight font-semibold">
                                {gemState.optionName[2]}
                              </div>
                              <div className="font-bold mt-1">Lv. {gemState.optionState[2]}</div>
                            </div>
                          </div>
                        </div>
                        {/* 하단 젬 (노란색) */}
                        <div className="">
                          <div
                            className="w-32 h-32 flex items-center justify-center text-center text-white text-sm transform transition-all duration-300"
                            style={{
                              backgroundImage: `url(${yellow})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              backgroundRepeat: "no-repeat",
                            }}
                          >
                            <div className="">
                              <div className="leading-tight font-semibold">
                                {gemState.optionName[3]}
                              </div>
                              <div className="font-bold mt-1">Lv. {gemState.optionState[3]}</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 우측 젬 (파란색) */}
                      <div className="my-auto">
                        <div
                          className="w-32 h-32 flex items-center justify-center text-center text-white text-sm transform transition-all duration-300"
                          style={{
                            backgroundImage: `url(${blue})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                          }}
                        >
                          <div className="">
                            <div className="leading-tight font-semibold">
                              {gemState.optionName[1]}
                            </div>
                            <div className="font-bold mt-1">Lv. {gemState.optionState[1]}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 액션 버튼들 */}
                <div className="grid col-span-3 grid-rows-3 h-[22rem] py-8 gap-y-8">
                  {/* 확률 확인 툴팁 */}
                  <div className="group relative flex justify-center gap-x-4">
                    <button className="p-2 w-[65%]  bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300">
                      <div className="flex justify-center items-center space-x-3">
                        <span className="text-xl">📊</span>
                        <span className="text-sm">
                          다른 항목 출현 <br /> 기대 확률 확인하기
                        </span>
                      </div>
                    </button>

                    {/* 툴팁 크기 선택 체크박스 */}
                    <div className="flex flex-col items-center justify-center w-[35%]">
                      <div className="bg-white dark:bg-slate-800 rounded-2xl p-3 border-2 border-purple-200 dark:border-purple-600 shadow-lg hover:shadow-xl transition-all duration-200">
                        <label
                          htmlFor="tooltipSize"
                          className="flex flex-col items-center space-y-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            id="tooltipSize"
                            className="w-5 h-5 text-purple-600 bg-white dark:bg-slate-700 border-2 border-purple-300 dark:border-purple-500 rounded"
                            checked={tooltip}
                            onChange={(e) => setTooltip(e.target.checked)}
                          />
                          <span className="text-sm font-bold text-purple-700 dark:text-purple-300">
                            크게 보기
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* 툴팁 내용 */}
                    <div
                      className={`absolute mt-6 px-8 py-4 transform top-full bg-slate-900 text-white rounded-3xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[100] border border-slate-700 ${
                        tooltip ? "w-[100rem] -translate-x-1/4" : "w-[38rem] left-1"
                      }`}
                    >
                      <div className="text-center mb-4">
                        <h4 className="text-xl font-bold text-purple-300 flex items-center justify-center">
                          <span className="mr-2">🎲</span>
                          출현 확률
                        </h4>
                      </div>
                      <div
                        className={`grid gap-3 overflow-y-auto ${
                          tooltip ? "grid-cols-5 max-h-[24rem]" : "grid-cols-2 max-h-[11rem]"
                        }`}
                      >
                        {gemState.weight.map((effect) => (
                          <div
                            key={effect.num}
                            className="flex justify-between items-center py-3 px-4 bg-slate-800/50 rounded-xl hover:bg-slate-800/70 transition-colors border border-slate-700"
                          >
                            <span className="font-semibold text-sm flex-1">
                              {nameCustom(effect.name)}
                            </span>
                            <div className="flex items-center space-x-3">
                              <div className="w-16 bg-slate-700 rounded-full h-3">
                                <div
                                  className="bg-purple-500 h-3 rounded-full transition-all duration-500"
                                  style={{
                                    width: `${Math.min(effect.weight * 2, 100)}%`,
                                  }}
                                ></div>
                              </div>
                              <span className="text-purple-300 font-bold text-sm min-w-[48px] text-right">
                                {effect.weight.toFixed(2)}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    className={`p-2 rounded-2xl font-bold text-white transition-all duration-300 transform hover:scale-105 shadow-xl ${
                      gemState.rerollChoiceList === 0
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-cyan-600 hover:bg-cyan-700"
                    }`}
                    onClick={() => rerollGem()}
                    disabled={gemState.rerollChoiceList === 0}
                  >
                    <div className="flex items-center justify-center space-x-3">
                      <span className="text-2xl">🔄</span>
                      <div>
                        <div className="text-lg">다른 항목 보기</div>
                        <div className="text-sm opacity-90">{gemState.rerollChoiceList}회 남음</div>
                      </div>
                    </div>
                  </button>

                  <button
                    className={`p-2 rounded-2xl font-bold text-white transition-all duration-300 transform hover:scale-105 shadow-xl ${
                      gemState.remainingProcessCount > 0
                        ? "bg-emerald-600 hover:bg-emerald-700"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                    onClick={() => processGem()}
                  >
                    <div className="flex items-center justify-center space-x-3">
                      <span className="text-2xl">⚡</span>
                      <div>
                        <div className="text-lg">가공 하기</div>
                        <div className="text-sm opacity-90">
                          {gemState.remainingProcessCount} / {grade} -{" "}
                          {(9 * gemState.costExtraPercent + 900).toLocaleString()}
                          골드
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* 효과 선택 및 액션 영역 */}
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl shadow-2xl mt-4 px-16 py-4 border border-white/20">
                <div className="grid grid-cols-4 gap-x-16">
                  {gemState.effectName.map((effect, index) => {
                    return (
                      <div key={index} className="">
                        <div
                          className="w-44 h-20 flex items-center justify-center font-bold text-sm rounded-2xl transform transition-all duration-300"
                          style={{
                            backgroundImage: `url(${blue})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                          }}
                        >
                          <div className="bg-black/50 p-4 rounded-xl text-center text-white text-sm font-semibold">
                            {nameCustom(effect)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <h5 className="flex justify-center m-4 p-4 text-xl border-2 border-black">
              BETA 버전입니다. 오류 확인, 가시성 개선 작업 진행중
            </h5>
          </div>
        </div>
        <div className="mt-32 w-[15%]">
          <DisplayAds />
        </div>
      </div>
    </div>
  );
};

export default SimulatorGem;
