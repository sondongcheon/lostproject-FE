import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

import AuctionTierFour from "../Auction/AuctionTierFour";
import TauctionTierFour from "../Tablet/Auction/TauctionTierFour";
import MauctionTierFour from "../Moblie/Auction/MauctionTierFour";

function Auction({ getCountLog }) {
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
      first: "추피",
      second: "적주피",
      third: "아무 특옵",
    },
    optionValue: {
      first: "41",
      second: "42",
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
      first: "공",
      second: "무공",
      third: "아무 특옵",
    },
    optionValue: {
      first: "45",
      second: "46",
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
    selectOption3: null,
    selectValue3: null,
  });
  const [selectOption3, setSelectOption3] = useState({
    id: 3,
    accName: "귀걸이2",
    optionName: {
      first: "공",
      second: "무공",
      third: "아무 특옵",
    },
    optionValue: {
      first: "45",
      second: "46",
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
    selectOption3: null,
    selectValue3: null,
  });
  const [selectOption4, setSelectOption4] = useState({
    id: 4,
    accName: "반지1",
    optionName: {
      first: "치적",
      second: "치피",
      third: "아무 특옵",
    },
    optionValue: {
      first: "49",
      second: "50",
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
      first: "치적",
      second: "치피",
      third: "아무 특옵",
    },
    optionValue: {
      first: "49",
      second: "50",
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
  const [currentPage, setCurrentPage] = useState([1, 1, 1, 1, 1, 1]); // 각 게시판의 현재 페이지

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

  return (
    <div>
      <div>
        {isMobile ? (
          <MauctionTierFour
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
          />
        ) : isTablet ? (
          <TauctionTierFour
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
          />
        ) : (
          <AuctionTierFour
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
          />
        )}
      </div>
    </div>
  );
}

export default Auction;
