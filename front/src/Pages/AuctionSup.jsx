import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

import AuctionTierFourSup from "../Auction/AuctionTierFourSup";
import TauctionTierFourSup from "../Tablet/Auction/TacutionTierFourSup";
import MauctionTierFourSup from "../Moblie/Auction/MacutionTierFourSup";

function AuctionSup({ getCountLog }) {
  const isMobile = useMediaQuery({
    query: "(max-width:468px)",
  });
  const isTablet = useMediaQuery({
    query: "(max-width:800px)",
  });

  const [selOpt1, setSelOpt1] = useState({
    tier: "4",
    itemGrade: "",
    quality: null,
    categoryCode: 200010,
    upgradeLevel: null,
    trdCnt: null,
    selOpt1: null,
    selVal1: null,
    selOpt2: null,
    selVal2: null,
    selOpt3: null,
    selVal3: null,
  });
  const [selOpt2, setSelOpt2] = useState({
    tier: "4",
    itemGrade: "",
    quality: null,
    categoryCode: 200020,
    upgradeLevel: null,
    trdCnt: null,
    selOpt1: null,
    selVal1: null,
    selOpt2: null,
    selVal2: null,
    selOpt3: "46",
    selVal3: null,
  });
  const [selOpt3, setSelOpt3] = useState({
    tier: "4",
    itemGrade: "",
    quality: null,
    categoryCode: 200020,
    upgradeLevel: null,
    trdCnt: null,
    selOpt1: null,
    selVal1: null,
    selOpt2: null,
    selVal2: null,
    selOpt3: "46",
    selVal3: null,
  });
  const [selOpt4, setSelOpt4] = useState({
    tier: "4",
    itemGrade: "",
    quality: null,
    categoryCode: 200030,
    upgradeLevel: null,
    trdCnt: null,
    selOpt1: null,
    selVal1: null,
    selOpt2: null,
    selVal2: null,
    selOpt3: null,
    selVal3: null,
  });
  const [selOpt5, setSelOpt5] = useState({
    tier: "4",
    itemGrade: "",
    quality: null,
    categoryCode: 200030,
    upgradeLevel: null,
    trdCnt: null,
    selOpt1: null,
    selVal1: null,
    selOpt2: null,
    selVal2: null,
    selOpt3: null,
    selVal3: null,
  });

  const staticNameList = [
    {
      id: 1,
      accName: "목걸이",
      optName: {
        first: "아덴+",
        second: "낙인+",
      },
      optVal: {
        first: "43",
        second: "44",
      },
    },
    {
      id: 2,
      accName: "귀걸이1",
      optName: {
        first: "무공%",
        second: "무공+",
      },
      optVal: {
        first: "46",
        second: "54",
      },
    },
    {
      id: 3,
      accName: "귀걸이2",
      optName: {
        first: "무공%",
        second: "무공+",
      },
      optVal: {
        first: "46",
        second: "54",
      },
    },
    {
      id: 4,
      accName: "반지1",
      optName: {
        first: "아공강",
        second: "아피강",
      },
      optVal: {
        first: "51",
        second: "52",
      },
    },
    {
      id: 5,
      accName: "반지2",
      optName: {
        first: "아공강",
        second: "아피강",
      },
      optVal: {
        first: "51",
        second: "52",
      },
    },
  ];

  const loadPresetSlot = (slotIndex) => {
    const presets = JSON.parse(localStorage.getItem("presetSlotsSup"));
    if (!presets || !presets[slotIndex] || !presets[slotIndex].type || !presets[slotIndex].value) {
      alert("해당 슬롯에 저장된 프리셋이 없습니다.");
      return;
    }

    const loadedOptions = presets[slotIndex].value;

    setSelOpt1(loadedOptions[0]);
    setSelOpt2(loadedOptions[1]);
    setSelOpt3(loadedOptions[2]);
    setSelOpt4(loadedOptions[3]);
    setSelOpt5(loadedOptions[4]);
  };

  const updateOption1 = (key, value) => {
    setSelOpt1((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  const updateOption2 = (key, value) => {
    setSelOpt2((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  const updateOption3 = (key, value) => {
    setSelOpt3((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  const updateOption4 = (key, value) => {
    setSelOpt4((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  const updateOption5 = (key, value) => {
    setSelOpt5((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const [count, setCount] = useState(5);
  const [currentPage, setCurrentPage] = useState([1, 1, 1, 1, 1, 1]); // 각 게시판의 현재 페이지

  const options = [selOpt1, selOpt2, selOpt3, selOpt4, selOpt5];
  const updateOptions = [updateOption1, updateOption2, updateOption3, updateOption4, updateOption5];
  const [result, setResult] = useState([
    {
      options: [],
    },
    { options: [] },
    { options: [] },
    { options: [] },
    { options: [] },
  ]);
  const [resultList, setResultList] = useState([[], [], [], [], [], []]);

  return (
    <div>
      <div>
        {isMobile ? (
          <MauctionTierFourSup
            getCountLog={getCountLog}
            options={options}
            updateOptions={updateOptions}
            result={result}
            setResult={setResult}
            resultList={resultList}
            setResultList={setResultList}
            count={count}
            setCount={setCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            loadPresetSlot={loadPresetSlot}
            staticNameList={staticNameList}
          />
        ) : isTablet ? (
          <TauctionTierFourSup
            getCountLog={getCountLog}
            options={options}
            updateOptions={updateOptions}
            result={result}
            setResult={setResult}
            resultList={resultList}
            setResultList={setResultList}
            count={count}
            setCount={setCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            loadPresetSlot={loadPresetSlot}
            staticNameList={staticNameList}
          />
        ) : (
          <AuctionTierFourSup
            getCountLog={getCountLog}
            options={options}
            updateOptions={updateOptions}
            result={result}
            setResult={setResult}
            resultList={resultList}
            setResultList={setResultList}
            count={count}
            setCount={setCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            loadPresetSlot={loadPresetSlot}
            staticNameList={staticNameList}
          />
        )}
      </div>
    </div>
  );
}

export default AuctionSup;
