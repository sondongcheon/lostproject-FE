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
      first: "추피",
      second: "적주피",
      third: "아무 특옵",
    },
    optionValue: {
      first: "41",
      second: "42",
      third: "아무 특옵",
    },
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
      first: "공%",
      second: "무공%",
      third: "아무 특옵",
    },
    optionValue: {
      first: "45",
      second: "46",
      third: "아무 특옵",
    },
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
      first: "공%",
      second: "무공%",
      third: "아무 특옵",
    },
    optionValue: {
      first: "45",
      second: "46",
      third: "아무 특옵",
    },
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
      first: "치적%",
      second: "치피%",
      third: "아무 특옵",
    },
    optionValue: {
      first: "49",
      second: "50",
      third: "아무 특옵",
    },
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
      first: "치적%",
      second: "치피%",
      third: "아무 특옵",
    },
    optionValue: {
      first: "49",
      second: "50",
      third: "아무 특옵",
    },
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

  const options = [selectOption1, selectOption2, selectOption3, selectOption4, selectOption5];

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

  const [count, setCount] = useState(5);

  const check = () => {
    console.log("aa", count);
    console.log("ccc", selectOptionReq);
    console.log("hi1", selectOption1);
    console.log("hi2", selectOption2);
    console.log("hi3", selectOption3);
    console.log("hi4", selectOption4);
    console.log("hi5", selectOption5);
  };

  const [total, setTotal] = useState(0);

  const [resultList, setResultList] = useState([[], [], [], [], [], []]);

  const getTotal = (res) => {
    var tmp = res.reduce((sum, item) => {
      console.log("가격", item?.auctionInfo.buyPrice || 0);
      return sum + (item?.auctionInfo.buyPrice || 0);
    }, 0);
    setResult(res);
    setTotal(tmp);
  };

  useEffect(() => {
    if (selectOptionReq.length > 0) {
      axios
        .post(`${process.env.REACT_APP_URL}/action/test5`, selectOptionReq)
        .then((res) => {
          console.log(res);
          getTotal(res.data.data.searchResultRes);
          setResultList(res.data.data.result);
          console.log("result", res.data.data.result);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [selectOptionReq]); // selectOptionReq가 변경될 때마다 실행

  const updateSelect = () => {
    const newSelectOptionReq = options.map((option) => ({
      quality: option.quality || "",
      upgradeLevel: option.upgradeLevel || "",
      tradeAllowCount: option.tradeAllowCount || "",
      categoryCode: option.categoryCode || "",
      itemGrade: option.itemGrade || "",
      etcOptionList: [
        {
          option: option.selectOption1 || null,
          value: option.selectValue1 || null,
        },
        {
          option: option.selectOption2 || null,
          value: option.selectValue2 || null,
        },
        {
          option: option.selectOption3 || null,
          value: option.selectValue3 || null,
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

  const updateSet = [updateOption1, updateOption2, updateOption3, updateOption4, updateOption5];

  return (
    <div className="mainbody">
      <p>임시설명 - 연마 효과와 등급을 선택한 부위를 검색하여 하단에 결과가 나타납니다.</p>
      <p>
        임시설명 - 부위 이름 하단 '탐색 리스트 추가' 버튼을 클릭하면 선택한 부위들 에서 고른
        등급들을 가지고 가장 싼 조합을 탐색해서 보여줍니다.
      </p>
      <p>
        EX - 목걸이, 귀걸이1, 귀걸이2 선택 + 등급에서 [상], [상중], [중하] 선택시 어떤부위에서
        어떤등급을 주는게 제일 싼지 탐색, 결과 - 목걸이[상중], 귀걸이1[상], 귀걸이2[중하]
      </p>
      <p>임시설명 - 일부는 고정, 일부는 탐색리스트도 가능합니다. 하단에 선택요약을 참고해보세요</p>
      <p>임시설명 - 검색결과 좌측에 있는 부위를 누르면 추가 매물을 확인 할 수 있습니다.</p>
      {/* <button className="normalBtm" onClick={() => check()}>
        dfsfdsa
      </button> */}

      <div className="grid grid-cols-2 gap-x-8 gap-y-8">
        <div>
          <AllSelectPresetComp updateSet={updateSet}></AllSelectPresetComp>
        </div>
        <div>
          <SelectOptionComp
            options={selectOption1}
            onOptionsChange={updateOption1}
          ></SelectOptionComp>
        </div>
        <div>
          <SelectOptionComp
            options={selectOption2}
            onOptionsChange={updateOption2}
          ></SelectOptionComp>
        </div>
        <div>
          <SelectOptionComp
            options={selectOption3}
            onOptionsChange={updateOption3}
          ></SelectOptionComp>
        </div>
        <div>
          <SelectOptionComp
            options={selectOption4}
            onOptionsChange={updateOption4}
          ></SelectOptionComp>
        </div>
        <div>
          <SelectOptionComp
            options={selectOption5}
            onOptionsChange={updateOption5}
          ></SelectOptionComp>
        </div>
      </div>

      <div className="mt-6">
        <SelectSummary selectOptions={options} search={updateSelect} total={total}></SelectSummary>

        <div className="grid grid-cols-2 gap-x-8 mt-6">
          <div className="space-y-2">
            {result.map((item, index) => (
              <ResultBox
                key={index}
                result={item}
                option={options[index]}
                onClick={() => setCount(index)}
                className={`${
                  count === index
                    ? "bg-[#FFF100] bg-opacity-25" // 선택된 인덱스에 배경색과 투명도
                    : "bg-[#F5F5F5]" // 선택되지 않은 경우
                }`}
              />
            ))}
          </div>
          <div>
            {count < 5 && resultList[count]?.length > 0 && (
              <div className="space-y-2">
                {resultList[count].map((item, index) => (
                  <ResultBox key={index} result={item} option={options[count]} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuctionTierFour;
