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

  const [selectOption1, setSelectOption1] = useState({
    id: 1,
    accName: "목걸이",
    optionName: {
      first: "아덴+",
      second: "낙인+",
      third: "아무 특옵",
    },
    optionValue: {
      first: "43",
      second: "44",
      third: "아무 특옵",
    },
    tier: "4",
    itemGrade: "",
    quality: null,
    categoryCode: 200010,
    upgradeLevel: null,
    tradeAllowCount: null,
    selectOption1: null,
    selectValue1: null,
    selectOption2: null,
    selectValue2: null,
    selectOption3: null,
    selectValue3: null,
  });
  const [selectOption2, setSelectOption2] = useState({
    id: 2,
    accName: "귀걸이1",
    optionName: {
      first: "회복+",
      second: "실드+",
      third: "아무 특옵",
    },
    optionValue: {
      first: "47",
      second: "48",
      third: "아무 특옵",
    },
    tier: "4",
    itemGrade: "",
    quality: null,
    categoryCode: 200020,
    upgradeLevel: null,
    tradeAllowCount: null,
    selectOption1: null,
    selectValue1: null,
    selectOption2: null,
    selectValue2: null,
    selectOption3: "46",
    selectValue3: null,
  });
  const [selectOption3, setSelectOption3] = useState({
    id: 3,
    accName: "귀걸이2",
    optionName: {
      first: "회복+",
      second: "실드+",
      third: "아무 특옵",
    },
    optionValue: {
      first: "47",
      second: "48",
      third: "아무 특옵",
    },
    tier: "4",
    itemGrade: "",
    quality: null,
    categoryCode: 200020,
    upgradeLevel: null,
    tradeAllowCount: null,
    selectOption1: null,
    selectValue1: null,
    selectOption2: null,
    selectValue2: null,
    selectOption3: "46",
    selectValue3: null,
  });
  const [selectOption4, setSelectOption4] = useState({
    id: 4,
    accName: "반지1",
    optionName: {
      first: "아공강",
      second: "아피강",
      third: "아무 특옵",
    },
    optionValue: {
      first: "51",
      second: "52",
      third: "아무 특옵",
    },
    tier: "4",
    itemGrade: "",
    quality: null,
    categoryCode: 200030,
    upgradeLevel: null,
    tradeAllowCount: null,
    selectOption1: null,
    selectValue1: null,
    selectOption2: null,
    selectValue2: null,
    selectOption3: null,
    selectValue3: null,
  });
  const [selectOption5, setSelectOption5] = useState({
    id: 5,
    accName: "반지2",
    optionName: {
      first: "아공강",
      second: "아피강",
      third: "아무 특옵",
    },
    optionValue: {
      first: "51",
      second: "52",
      third: "아무 특옵",
    },
    tier: "4",
    itemGrade: "",
    quality: null,
    categoryCode: 200030,
    upgradeLevel: null,
    tradeAllowCount: null,
    selectOption1: null,
    selectValue1: null,
    selectOption2: null,
    selectValue2: null,
    selectOption3: null,
    selectValue3: null,
  });

  const updateOption1 = (key, value) => {
    setSelectOption1((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  const updateOption2 = (key, value) => {
    setSelectOption2((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  const updateOption3 = (key, value) => {
    setSelectOption3((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  const updateOption4 = (key, value) => {
    setSelectOption4((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  const updateOption5 = (key, value) => {
    setSelectOption5((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const [count, setCount] = useState(5);

  const options = [selectOption1, selectOption2, selectOption3, selectOption4, selectOption5];
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

  useEffect(() => {
    result.some((item, index) => {
      if (item) {
        setCount(index);
        return true;
      }
      return false;
    });
  }, [result]);

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
          />
        )}
      </div>
    </div>
  );
}

export default AuctionSup;
