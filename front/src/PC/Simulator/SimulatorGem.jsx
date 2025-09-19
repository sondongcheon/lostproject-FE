import React, { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import SelectSideBar from "./Components/SelectSideBar";
import DisplayAds from "@/common/Component/DisplayAds";

const SimulatorGem = ({}) => {
  const { type } = useParams();
  const navigate = useNavigate();

  const [useGold, setUseGold] = useState(0);

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
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
              개발중인 화면
            </h5>

            <div
              className={`m-4  p-4 flex flex-col items-center border-2 border-black`}
            >
              젬 종류 바꾸기 & 젬 초기화
              <div className="w-full grid grid-cols-3 px-24 gap-x-24">
                <button className="normalBtm" onClick={() => loadPage(5)}>
                  고급 젬
                </button>
                <button className="normalBtm" onClick={() => loadPage(7)}>
                  희귀 젬
                </button>
                <button className="normalBtm" onClick={() => loadPage(9)}>
                  영웅 젬
                </button>
              </div>
            </div>

            <div
              className={`m-4  p-4 flex flex-col items-center border-2 border-black ${
                gemState.remainingProcessCount > 0 ? " " : "hidden"
              }`}
            >
              <p>현재 상태</p>

              <p>
                {" "}
                1옵션 : {gemState.optionName[0]} - {gemState.optionState[0]}
              </p>
              <p>
                {" "}
                2옵션 : {gemState.optionName[1]} - {gemState.optionState[1]}
              </p>
              <p>
                {" "}
                3옵션 : {gemState.optionName[2]} - {gemState.optionState[2]}{" "}
              </p>
              <p>
                {" "}
                4옵션 : {gemState.optionName[3]} - {gemState.optionState[3]}{" "}
              </p>

              <br />
              <p>마지막으로 선택된 옵션 - {gemState.choiceEffect}</p>
            </div>

            <div
              className={`m-4  p-4 flex flex-col items-center border-2 border-black ${
                gemState.remainingProcessCount > 0 ? " " : "hidden"
              }`}
            >
              <p>가공 가능성</p>
              <br />
              <div className="w-full grid grid-cols-4 px-16 space-x-12">
                <p className="border-2 border-black text-center">
                  {" "}
                  {gemState.effectName[0]}
                </p>
                <p className="border-2 border-black text-center">
                  {" "}
                  {gemState.effectName[1]}
                </p>
                <p className="border-2 border-black text-center">
                  {" "}
                  {gemState.effectName[2]}
                </p>
                <p className="border-2 border-black text-center">
                  {" "}
                  {gemState.effectName[3]}
                </p>
              </div>
              <br />
              <p>가공 가능 횟수 : {gemState.remainingProcessCount}</p>
            </div>

            <div
              className={`m-4  p-4 flex flex-col items-center border-2 border-black ${
                gemState.remainingProcessCount > 0 ? " " : "hidden"
              }`}
            >
              <div className="flex">
                <button
                  className={`normalBtm`}
                  onClick={() => rerollGem()}
                  disabled={gemState.rerollChoiceList === 0}
                >
                  다른 항목 보기 - {gemState.rerollChoiceList}회 남음
                </button>
                <div className="border-gray-300 border-2 my-auto">
                  <div className="group relative">
                    <span> ★다른 항목 출현 기대 확률 확인하기★</span>
                    {/* <BsFillQuestionCircleFill className="h-full" /> */}
                    <div className="absolute w-[230%] mt-2 px-3 py-2 bg-gray-800 text-white size-font-xxxs rounded shadow-lg opacity-0 visibility-hidden pointer-events-none group-hover:opacity-100 group-hover:visibility-visible group-hover:pointer-events-auto transition-opacity duration-300 left-8">
                      만드는중 ㄱㄷㄱㄷ
                    </div>
                  </div>
                </div>
              </div>
              <button
                className={`normalBtm ${
                  gemState.remainingProcessCount > 0 ? " " : "hidden"
                }`}
                onClick={() => processGem()}
              >
                가공 하기 - 가공비용 {9 * gemState.costExtraPercent + 900}
              </button>
            </div>

            <div className="m-4  p-4 flex flex-col items-center border-2 border-black">
              <p> 누적 사용 골드 - {useGold}</p>
            </div>

            <div
              className={`m-4  p-4 flex flex-col items-center border-2 border-black ${
                gemState.remainingProcessCount > 0 ? "hidden" : ""
              }`}
            >
              <p>가공 결과</p>

              <p>
                {" "}
                1옵션 : {gemState.optionName[0]} - {gemState.optionState[0]}
              </p>
              <p>
                {" "}
                2옵션 : {gemState.optionName[1]} - {gemState.optionState[1]}
              </p>
              <p>
                {" "}
                3옵션 : {gemState.optionName[2]} - {gemState.optionState[2]}{" "}
              </p>
              <p>
                {" "}
                4옵션 : {gemState.optionName[3]} - {gemState.optionState[3]}{" "}
              </p>
              <p> </p>
              <p>마지막으로 선택된 옵션 - {gemState.choiceEffect}</p>
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
