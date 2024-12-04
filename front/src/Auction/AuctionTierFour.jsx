import React, { useEffect, useState } from "react";
import axios from "axios";

import AllSelectPresetComp from "./Component/AllSelectPresetComp";
import SelectOptionComp from "./Component/SelectOptionComp";
import SelectSummary from "./Component/SelectSummary";
import ResultBox from "./Component/ResultBox";

function AuctionTierFour(props) {
  const [selectOption1, setSelectOption1] = useState({
    id: 1,
    accName: "목걸이",
    optionName: {
      first: "추가 피해",
      second: "적에게 주는 피해",
      third: "아무 특옵",
    },
    optionValue: {
      first: 41,
      second: 42,
      third: "아무 특옵",
    },
    itemGrade: "",
    quality: "",
    categoryCode: 200010,
    upgradeLevel: "",
    tradeAllowCount: "",
    selectOption1: "",
    selectValue1: "",
    selectOption2: "",
    selectValue2: "",
    selectOption3: "",
    selectValue3: "",
  });
  const [selectOption2, setSelectOption2] = useState({
    id: 2,
    accName: "귀걸이",
    optionName: {
      first: "공격력 %",
      second: "무기 공격력 %",
      third: "아무 특옵",
    },
    optionValue: {
      first: 45,
      second: 46,
      third: "아무 특옵",
    },
    itemGrade: "",
    quality: "",
    categoryCode: 200020,
    upgradeLevel: "",
    tradeAllowCount: "",
    selectOption1: "",
    selectValue1: "",
    selectOption2: "",
    selectValue2: "",
    selectOption3: "",
    selectValue3: "",
  });
  const [selectOption3, setSelectOption3] = useState({
    id: 3,
    accName: "귀걸이",
    optionName: {
      first: "공격력%",
      second: "무기공격력%",
      third: "아무 특옵",
    },
    optionValue: {
      first: 45,
      second: 46,
      third: "아무 특옵",
    },
    itemGrade: "",
    quality: "",
    categoryCode: 200020,
    upgradeLevel: "",
    tradeAllowCount: "",
    selectOption1: "",
    selectValue1: "",
    selectOption2: "",
    selectValue2: "",
    selectOption3: "",
    selectValue3: "",
  });
  const [selectOption4, setSelectOption4] = useState({
    id: 4,
    accName: "반지",
    optionName: {
      first: "치명타 적중률%",
      second: "치명타 피해%",
      third: "아무 특옵",
    },
    optionValue: {
      first: 49,
      second: 50,
      third: "아무 특옵",
    },
    itemGrade: "",
    quality: "",
    categoryCode: 200030,
    upgradeLevel: "",
    tradeAllowCount: "",
    selectOption1: "",
    selectValue1: "",
    selectOption2: "",
    selectValue2: "",
    selectOption3: "",
    selectValue3: "",
  });
  const [selectOption5, setSelectOption5] = useState({
    id: 5,
    accName: "반지",
    optionName: {
      first: "치명타 적중률%",
      second: "치명타 피해%",
      third: "아무 특옵",
    },
    optionValue: {
      first: 49,
      second: 50,
      third: "아무 특옵",
    },
    itemGrade: "",
    quality: "",
    categoryCode: 200030,
    upgradeLevel: "",
    tradeAllowCount: "",
    selectOption1: "",
    selectValue1: "",
    selectOption2: "",
    selectValue2: "",
    selectOption3: "",
    selectValue3: "",
  });

  const [selectOptionReq, setSelectOptionReq] = useState([
    // {
    //   quality: "",
    //   upgradeLevel: "",
    //   tradeAllowCount: "",
    //   itemGrade: "",
    //   etcOptionList: [
    //     {
    //       option: "",
    //       value: "",
    //     },
    //     {
    //       option: "",
    //       value: "",
    //     },
    //     {
    //       option: "",
    //       value: "",
    //     },
    //   ],
    // },
  ]);

  const [result, setResult] = useState([
    {
      options: [],
    },
    { options: [] },
    { options: [] },
    { options: [] },
    { options: [] },
  ]);

  const check = () => {
    console.log("ccc", selectOptionReq);
    console.log("hi", selectOption1);
  };

  useEffect(() => {
    if (selectOptionReq.length > 0) {
      axios
        .post(`${process.env.REACT_APP_URL}/action/test5`, selectOptionReq)
        .then((res) => {
          console.log(res);
          setResult(res.data.data);
        })
        .catch((error) => {
          console.error(error);
        });

      console.log("result", result);
    }
  }, [selectOptionReq]); // selectOptionReq가 변경될 때마다 실행

  const updateSelect = () => {
    const options = [selectOption1, selectOption2, selectOption3, selectOption4, selectOption5];

    const newSelectOptionReq = options.map((option) => ({
      quality: option.quality || "",
      upgradeLevel: option.upgradeLevel || "",
      tradeAllowCount: option.tradeAllowCount || "",
      categoryCode: option.categoryCode || "",
      itemGrade: option.itemGrade || "",
      etcOptionList: [
        {
          option: option.selectOption1 || "",
          value: option.selectValue1 || "",
        },
        {
          option: option.selectOption2 || "",
          value: option.selectValue2 || "",
        },
        {
          option: option.selectOption3 || "",
          value: option.selectValue3 || "",
        },
      ],
    }));

    setSelectOptionReq(newSelectOptionReq);
    console.log("check", { selectOptionReq });
  };

  const updateOption1 = (key, value) => {
    console.log("key ", key);
    console.log("value ", value);
    setSelectOption1((prevState) => ({
      ...prevState,
      [key]: value,
    }));
    console.log("data", selectOption1);
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

  return (
    <div>
      <button className="normalBtm" onClick={() => check()}>
        dfsfdsa
      </button>
      <AllSelectPresetComp></AllSelectPresetComp>
      <SelectOptionComp options={selectOption1} onOptionsChange={updateOption1}></SelectOptionComp>
      <SelectOptionComp options={selectOption2} onOptionsChange={updateOption2}></SelectOptionComp>
      <SelectOptionComp options={selectOption3} onOptionsChange={updateOption3}></SelectOptionComp>
      <SelectOptionComp options={selectOption4} onOptionsChange={updateOption4}></SelectOptionComp>
      <SelectOptionComp options={selectOption5} onOptionsChange={updateOption5}></SelectOptionComp>
      <SelectSummary search={updateSelect}></SelectSummary>
      {result.map((item, index) => (
        <ResultBox key={index} result={item} />
      ))}
    </div>
  );
}

export default AuctionTierFour;
