import React, { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import SelectSideBar from "./Components/SelectSideBar";
import DisplayAds from "@/common/Component/DisplayAds";

const SimulatorGem = ({}) => {
  const { type } = useParams();
  const navigate = useNavigate();

  const [optionName, setOptionName] = useState([
    "공격력",
    "보스 피해",
    "아군 피해 강화",
    "아군 공격 강화",
  ]);
  const [optionState, setOptionState] = useState([1, 1, 1, 1]);

  const [gemState, setGemState] = useState({
    optionNum: [0, 0, 0, 0],
    optionName: [null, null, null, null],
    optionState: [1, 1, 1, 1],
    costExtraPercent: 0,
    remainingProcessCount: 9,
    effectNum: [],
    effectName: [],
    rerollChoiceList: 1,
  });

  const loadPage = () => {
    axios
      //, { params: { page: 0 }, }
      .post(`${process.env.REACT_APP_URL}/simulator/gem/${type}`, gemState)
      .then((res) => {
        setGemState(res.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const processGem = () => {
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

  useEffect(() => {
    loadPage();
  }, []);

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
            <h5 className="flex justify-center my-4 py-4 text-xl border-2 border-black">
              개발중인 화면
            </h5>

            <div className="my-4 flex flex-col items-center border-2 border-black">
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
            </div>

            <div className="my-4 flex flex-col items-center border-2 border-black">
              <p>옵션 선택</p>
              <p> 선택지 1 : {gemState.effectName[0]}</p>
              <p> 선택지 2 : {gemState.effectName[1]}</p>
              <p> 선택지 3 : {gemState.effectName[2]}</p>
              <p> 선택지 4 : {gemState.effectName[3]}</p>
              <p>가공 가능 횟수 : {gemState.remainingProcessCount}</p>
            </div>

            <div className="my-4 flex flex-col items-center border-2 border-black">
              <button className="normalBtm">
                다른 항목 보기 - {gemState.rerollChoiceList}회 남음 // 아직 못씀
                눌러도 아무일도 안일어남
              </button>
              <button
                className={`normalBtm ${
                  gemState.remainingProcessCount > 0 ? " " : "hidden"
                }`}
                onClick={() => processGem()}
              >
                가공 하기
              </button>
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
