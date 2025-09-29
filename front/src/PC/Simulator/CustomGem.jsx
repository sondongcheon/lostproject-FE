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
  const [type, setType] = useState(1);
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

  const updateName = (key, value) => {
    const tmp = gemState.optionName;
    tmp[key] = value;

    updateOption("optionName", tmp);
  };

  const updateState = (key, value) => {
    const tmp = gemState.optionState;
    tmp[key] = value;

    updateOption("optionState", tmp);
  };

  const updateEffect = (num, key, value) => {
    const tmp = gemState.effectName;
    tmp[num] = value;

    const tmp2 = gemState.effectNum;
    tmp2[num] = key;

    updateOption("effectName", tmp);
    updateOption("effectNum", tmp2);
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

  const checkWeight = () => {
    axios
      .post(`${process.env.REACT_APP_URL}/simulator/gem/recheck`, gemState)
      .then((res) => {
        console.log(res.data.data);
        updateOption("weight", res.data.data.weight);
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

  useEffect(() => {
    loadPage(9);
  }, [type]);

  useEffect(() => {
    rerollGem();
  }, [
    gemState.optionState[0],
    gemState.optionState[1],
    gemState.optionState[2],
    gemState.optionState[3],
  ]);

  useEffect(() => {
    console.log(gemState);
    checkWeight();
  }, [
    gemState.effectName[0],
    gemState.effectName[1],
    gemState.effectName[2],
    gemState.effectName[3],
  ]);

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

              <div
                className={`m-4  p-4 grid flex flex-col items-center border-2 border-black gap-y-4
              }`}
              >
                <h1 className="text-center font-bold"> 옵션 종류 변경</h1>

                <div className="grid grid-rows-2 gap-2">
                  <div className="flex items-center gap-2">
                    <span className="whitespace-nowrap">초록색 옵션</span>
                    <select
                      value={gemState.optionName[0]}
                      onChange={(e) => updateName(0, e.target.value)}
                      className="flex-1 mx-auto my-1 h-6 text-sm text-center text-gray-500 dark:text-gray-300 rounded-2xl border-[#566863] border bg-[#F5F5F5] dark:bg-[#2A2A2A]"
                    >
                      <option value="" disabled>
                        옵션 선택
                      </option>
                      <option value="공격력">공격력</option>
                      <option value="보스 피해">보스 피해</option>
                      <option value="추가 피해">추가 피해</option>
                      <option value="아군 피해 강화">아군 피해 강화</option>
                      <option value="아군 피해 공격">아군 피해 공격</option>
                      <option value="낙인력">낙인력</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="whitespace-nowrap">파란색 옵션</span>
                    <select
                      value={gemState.optionName[1]}
                      onChange={(e) => updateName(1, e.target.value)}
                      className="flex-1 mx-auto my-1 h-6 text-sm text-center text-gray-500 dark:text-gray-300 rounded-2xl border-[#566863] border bg-[#F5F5F5] dark:bg-[#2A2A2A]"
                    >
                      <option value="" disabled>
                        옵션 선택
                      </option>
                      <option value="공격력">공격력</option>
                      <option value="보스 피해">보스 피해</option>
                      <option value="추가 피해">추가 피해</option>
                      <option value="아군 피해 강화">아군 피해 강화</option>
                      <option value="아군 피해 공격">아군 피해 공격</option>
                      <option value="낙인력">낙인력</option>
                    </select>
                  </div>
                </div>

                <div className="w-2/3 mx-auto border-b-2 border-black"></div>

                <h1 className="text-center font-bold"> 옵션 수치 변경</h1>

                <div className="grid grid-rows-4">
                  <div className="flex items-center gap-2 w-full">
                    <span className="whitespace-nowrap">
                      {gemState.optionName[0]} 수치
                    </span>
                    <select
                      value={gemState.optionState[0]}
                      onChange={(e) => updateState(0, e.target.value)}
                      className="flex-1 mx-auto my-1 h-6 text-sm text-center text-gray-500 dark:text-gray-300 rounded-2xl border-[#566863] border bg-[#F5F5F5] dark:bg-[#2A2A2A]"
                    >
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2 w-full">
                    <span className="whitespace-nowrap">
                      {gemState.optionName[1]} 수치
                    </span>
                    <select
                      value={gemState.optionState[1]}
                      onChange={(e) => updateState(1, e.target.value)}
                      className="flex-1 mx-auto my-1 h-6 text-sm text-center text-gray-500 dark:text-gray-300 rounded-2xl border-[#566863] border bg-[#F5F5F5] dark:bg-[#2A2A2A]"
                    >
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2 w-full">
                    <span className="whitespace-nowrap">
                      {gemState.optionName[2]} 수치
                    </span>
                    <select
                      value={gemState.optionState[2]}
                      onChange={(e) => updateState(2, e.target.value)}
                      className="flex-1 mx-auto my-1 h-6 text-sm text-center text-gray-500 dark:text-gray-300 rounded-2xl border-[#566863] border bg-[#F5F5F5] dark:bg-[#2A2A2A]"
                    >
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2 w-full">
                    <span className="whitespace-nowrap">
                      {gemState.optionName[3]} 수치
                    </span>
                    <select
                      value={gemState.optionState[3]}
                      onChange={(e) => updateState(3, e.target.value)}
                      className="flex-1 mx-auto my-1 h-6 text-sm text-center text-gray-500 dark:text-gray-300 rounded-2xl border-[#566863] border bg-[#F5F5F5] dark:bg-[#2A2A2A]"
                    >
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`m-4  p-4 flex flex-col items-center border-2 border-black
                
              }`}
            >
              <div className="w-full grid grid-cols-4 px-16 gap-x-12 gap-y-4">
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
                <select
                  className="mx-auto my-1 h-6 text-sm text-center text-gray-500 dark:text-gray-300 rounded-2xl border-[#566863] border bg-[#F5F5F5] dark:bg-[#2A2A2A]"
                  value={gemState.effectName[0]}
                  onChange={(e) => {
                    const num = e.target.value;
                    const name = e.target.selectedOptions[0].dataset.name;
                    updateEffect(0, num, name);
                  }}
                >
                  <option value="">{nameCustom(gemState.effectName[0])}</option>
                  {gemState.weight.map((effect) => (
                    <option
                      key={effect.num}
                      value={effect.num}
                      data-name={effect.name}
                    >
                      {nameCustom(effect.name)}
                    </option>
                  ))}
                </select>
                <select
                  className="mx-auto my-1 h-6 text-sm text-center text-gray-500 dark:text-gray-300 rounded-2xl border-[#566863] border bg-[#F5F5F5] dark:bg-[#2A2A2A]"
                  value={gemState.effectName[1]}
                  onChange={(e) => {
                    const num = e.target.value;
                    const name = e.target.selectedOptions[1].dataset.name;
                    updateEffect(0, num, name);
                  }}
                >
                  <option value="">{nameCustom(gemState.effectName[1])}</option>
                  {gemState.weight.map((effect) => (
                    <option
                      key={effect.num}
                      value={effect.num}
                      data-name={effect.name}
                    >
                      {nameCustom(effect.name)}
                    </option>
                  ))}
                </select>
                <select
                  className="mx-auto my-1 h-6 text-sm text-center text-gray-500 dark:text-gray-300 rounded-2xl border-[#566863] border bg-[#F5F5F5] dark:bg-[#2A2A2A]"
                  value={gemState.effectName[2]}
                  onChange={(e) => {
                    const num = e.target.value;
                    const name = e.target.selectedOptions[2].dataset.name;
                    updateEffect(0, num, name);
                  }}
                >
                  <option value="">{nameCustom(gemState.effectName[2])}</option>
                  {gemState.weight.map((effect) => (
                    <option
                      key={effect.num}
                      value={effect.num}
                      data-name={effect.name}
                    >
                      {nameCustom(effect.name)}
                    </option>
                  ))}
                </select>
                <select
                  className="mx-auto my-1 h-6 text-sm text-center text-gray-500 dark:text-gray-300 rounded-2xl border-[#566863] border bg-[#F5F5F5] dark:bg-[#2A2A2A]"
                  value={gemState.effectName[3]}
                  onChange={(e) => {
                    const num = e.target.value;
                    const name = e.target.selectedOptions[3].dataset.name;
                    updateEffect(0, num, name);
                  }}
                >
                  <option value="">{nameCustom(gemState.effectName[3])}</option>
                  {gemState.weight.map((effect) => (
                    <option
                      key={effect.num}
                      value={effect.num}
                      data-name={effect.name}
                    >
                      {nameCustom(effect.name)}
                    </option>
                  ))}
                </select>
              </div>
              <br />
              <button
                className={`normalBtm ${
                  gemState.remainingProcessCount > 0 ? " " : "hidden"
                }`}
                onClick={() => processGem()}
              >
                가공 하기 ( {gemState.remainingProcessCount} / {grade} ) -
                가공비용 {9 * gemState.costExtraPercent + 900}
              </button>
              <br />
              <div className="flex">
                <div className="border-gray-300 border-2 my-auto">
                  <div className="group relative">
                    <span> ★다른 항목 출현 기대 확률 확인하기★</span>
                    {/* <BsFillQuestionCircleFill className="h-full" /> */}
                    <div className="absolute w-[400%] mt-2 px-4 py-2 left-1/2 transform -translate-x-1/2 top-full bg-gray-800 text-white size-font-xxxs rounded shadow-lg opacity-0 visibility-hidden pointer-events-none group-hover:opacity-100 group-hover:visibility-visible group-hover:pointer-events-auto transition-opacity duration-300">
                      <div className="grid grid-cols-5 gap-x-6">
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
