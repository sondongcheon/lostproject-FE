import React, { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import SelectSideBar from "./Components/SelectSideBar";
import DisplayAds from "@/common/Component/DisplayAds";

import red from "@/Assets/gem/simulator_red.png";
import blue from "@/Assets/gem/simulator_blue.png";
import yellow from "@/Assets/gem/simulator_yellow.png";
import green from "@/Assets/gem/simulator_greed.png";

const SimulatorGem = ({}) => {
  const { type } = useParams();
  const navigate = useNavigate();

  const [useGold, setUseGold] = useState(0);

  const [grade, setGrade] = useState(9);

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
    <div>
      <div className="flex">
        <div className="mt-32 w-[15%]">
          <DisplayAds />
        </div>

        <div className="mainbody flex">
          <div className="w-[15%]">
            <SelectSideBar />
          </div>
          <div className="w-[85%]">
            <h5 className="flex justify-center m-4 p-4 text-xl border-2 border-black">
              BETA 버전입니다. 오류 확인, 가시성 개선 작업 진행중
            </h5>

            <div
              className={`m-4  p-4 grid grid-cols-3 flex flex-col items-center border-2 border-black 
              }`}
            >
              <div className={`m-4 p-4 items-center`}>
                <div className="w-full grid grid-rows-3 px-12 gap-y-4">
                  <button
                    className="rounded-lg font-bold resetBtm bg-[#b2ddad]"
                    onClick={() => {
                      loadPage(5);
                      setGrade(5);
                    }}
                  >
                    고급 젬으로 초기화
                  </button>
                  <button
                    className="rounded-lg font-bold resetBtm bg-[#b2ddad]"
                    onClick={() => {
                      loadPage(7);
                      setGrade(7);
                    }}
                  >
                    희귀 젬으로 초기화
                  </button>
                  <button
                    className="rounded-lg font-bold resetBtm bg-[#b2ddad]"
                    onClick={() => {
                      loadPage(9);
                      setGrade(9);
                    }}
                  >
                    영웅 젬으로 초기화
                  </button>
                </div>
                <div className="m-4  p-4 flex flex-col items-center border-2 font-bold border-black">
                  <p> 누적 사용 골드 - {useGold}</p>
                </div>
              </div>

              <div className=" grid grid-cols-3">
                <div
                  className="m-auto w-32 h-32 flex items-center justify-center text-center text-white font-bold text-sm"
                  style={{
                    backgroundImage: `url(${green})`,
                    backgroundSize: "cover", // 이미지 크기 맞춤
                    backgroundPosition: "center", // 중앙 정렬
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  {gemState.optionName[0]} <br /> Lv. {gemState.optionState[0]}
                </div>
                <div className="m-auto grid grid-rows-2">
                  <div
                    className="w-32 h-32 flex items-center justify-center text-center text-white font-bold text-sm"
                    style={{
                      backgroundImage: `url(${red})`,
                      backgroundSize: "cover", // 이미지 크기 맞춤
                      backgroundPosition: "center", // 중앙 정렬
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    {gemState.optionName[2]} <br /> {gemState.optionState[2]}
                  </div>
                  <div
                    className="w-32 h-32 flex items-center justify-center text-center text-white font-bold text-sm"
                    style={{
                      backgroundImage: `url(${yellow})`,
                      backgroundSize: "cover", // 이미지 크기 맞춤
                      backgroundPosition: "center", // 중앙 정렬
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    {gemState.optionName[3]} <br /> {gemState.optionState[3]}
                  </div>
                </div>
                <div
                  className=" m-auto w-32 h-32 flex items-center justify-center text-center text-white font-bold text-sm"
                  style={{
                    backgroundImage: `url(${blue})`,
                    backgroundSize: "cover", // 이미지 크기 맞춤
                    backgroundPosition: "center", // 중앙 정렬
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  {gemState.optionName[1]} <br /> {gemState.optionState[1]}
                </div>
                <div className="mt-4 col-span-3 h-16">
                  <p className="text-center font-bold">
                    마지막으로 선택된 옵션 <br />
                    {gemState.choiceEffect === "가공이전"
                      ? gemState.choiceEffect
                      : nameCustom(gemState.choiceEffect)}
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`m-4  p-4 flex flex-col items-center border-2 border-black
                
              }`}
            >
              <div className="w-full grid grid-cols-4 px-16 space-x-12">
                <div
                  className=" m-auto w-40 h-16 flex items-center justify-center  font-bold text-sm"
                  style={{
                    backgroundImage: `url(${blue})`,
                    backgroundSize: "cover", // 이미지 크기 맞춤
                    backgroundPosition: "center", // 중앙 정렬
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <span className="text-white px-2 py-1 rounded-lg text-center">
                    {nameCustom(gemState.effectName[0])}
                  </span>
                </div>{" "}
                <div
                  className=" m-auto w-40 h-16 flex items-center justify-center  font-bold text-sm"
                  style={{
                    backgroundImage: `url(${blue})`,
                    backgroundSize: "cover", // 이미지 크기 맞춤
                    backgroundPosition: "center", // 중앙 정렬
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <span className="bgWtoB px-2 py-1 rounded-lg text-center">
                    {nameCustom(gemState.effectName[1])}
                  </span>
                </div>{" "}
                <div
                  className=" m-auto w-40 h-16 flex items-center justify-center  font-bold text-sm"
                  style={{
                    backgroundImage: `url(${blue})`,
                    backgroundSize: "cover", // 이미지 크기 맞춤
                    backgroundPosition: "center", // 중앙 정렬
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <span className="bgWtoB px-2 py-1 rounded-lg text-center">
                    {nameCustom(gemState.effectName[2])}
                  </span>
                </div>
                <div
                  className=" m-auto w-40 h-16 flex items-center justify-center  font-bold text-sm"
                  style={{
                    backgroundImage: `url(${blue})`,
                    backgroundSize: "cover", // 이미지 크기 맞춤
                    backgroundPosition: "center", // 중앙 정렬
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <span className="bgWtoB px-2 py-1 rounded-lg text-center">
                    {nameCustom(gemState.effectName[3])}
                  </span>
                </div>
              </div>
              <br />
              <div className="grid grid-cols-2 gap-x-12">
                <button
                  className={`normalBtm`}
                  onClick={() => rerollGem()}
                  disabled={gemState.rerollChoiceList === 0}
                >
                  다른 항목 보기 - {gemState.rerollChoiceList}회 남음
                </button>
                <button
                  className={`normalBtm ${
                    gemState.remainingProcessCount > 0 ? " " : "hidden"
                  }`}
                  onClick={() => processGem()}
                >
                  가공 하기 ( {gemState.remainingProcessCount} / {grade} ) -
                  가공비용 {9 * gemState.costExtraPercent + 900}
                </button>
              </div>

              <br />
              <div className="group relative">
                <span className="border-2 border-black">
                  {" "}
                  ★다른 항목 출현 기대 확률 확인하기★
                </span>
                {/* <BsFillQuestionCircleFill className="h-full" /> */}
                <div className="absolute w-[400%] mt-2 px-4 py-2 left-1/2 transform -translate-x-1/2 top-full bg-gray-800 text-white size-font-xxxs rounded shadow-lg opacity-0 visibility-hidden pointer-events-none group-hover:opacity-100 group-hover:visibility-visible group-hover:pointer-events-auto transition-opacity duration-300">
                  <div className="grid grid-cols-5 gap-x-6 gap-y-2">
                    {gemState.weight.map((effect) => (
                      <div
                        key={effect.num}
                        className="flex justify-between border-b py-1"
                      >
                        <span className="font-semibold">
                          {nameCustom(effect.name)}
                        </span>
                        <span>{effect.weight.toFixed(2)}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
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
