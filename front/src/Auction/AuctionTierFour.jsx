import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

import HeadKeyBox from "./Component/HeadKeyBox";
import AllSelectPresetComp from "./Component/AllSelectPresetComp";
import SelectOptionComp from "./Component/SelectOptionComp";
import SelectSummary from "./Component/SelectSummary";
import ResultBox from "./Component/ResultBox";

import Test from "./Component/Test";

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
      first: "공",
      second: "무공",
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
      first: "공",
      second: "무공",
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
      first: "치적",
      second: "치피",
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
      first: "치적",
      second: "치피",
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

  const [searchState, setSearchState] = useState(false);

  const [apiKey, setApiKey] = useState("");
  const [saveKey, setSaveKey] = useState(false);

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
    const cookieValue = Cookies.get("apiKey" ?? "");
    if (Cookies.get("apiKey") !== undefined) {
      setSaveKey(true);
    }
    setApiKey(cookieValue);
  }, []);

  useEffect(() => {
    if (selectOptionReq.length > 0) {
      setSearchState(true);
      if (saveKey) Cookies.set("apiKey", apiKey, { expires: 89, secure: true, sameSite: "Strict" });
      else Cookies.remove("apiKey");
      axios
        .post(`${process.env.REACT_APP_URL}/auction/test5`, selectOptionReq, {
          headers: { apiKey: apiKey },
          params: { type: 0 },
        })
        .then((res) => {
          console.log(res);
          getTotal(res.data.data.searchResultRes);
          setResultList(res.data.data.result);
          console.log("result", res.data.data.result);
        })
        .catch((error) => {
          const handleError = () => {
            if (error.response.data.code === "API-001") {
              return Swal.fire({
                icon: "warning",
                html: "API 분당 요청 횟수 100회를 초과하였습니다 <br /> 60초 뒤에 시도해주세요",
                confirmButtonText: "확인",
              });
            } else {
              return Swal.fire({
                icon: "warning",
                title: "예측되지 못한 오류입니다.",
                text: error.response.data.message,
                confirmButtonText: "확인",
              });
            }
          };

          return handleError().then(() => {
            // 60초 대기
            return new Promise((resolve) => setTimeout(resolve, 60000));
          });
        })
        .finally(() => {
          setSearchState(false);
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
      {/* <button className="normalBtm" onClick={() => check()}>
        dfsfdsa
      </button> */}

      <HeadKeyBox
        apiKey={apiKey}
        setApiKey={setApiKey}
        saveKey={saveKey}
        setSaveKey={setSaveKey}
      ></HeadKeyBox>
      <div className="grid grid-cols-2 gap-x-4 gap-y-4">
        <div>
          <AllSelectPresetComp updateSet={updateSet} type={0}></AllSelectPresetComp>
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
        <SelectSummary
          selectOptions={options}
          search={updateSelect}
          total={total}
          searchState={searchState}
        ></SelectSummary>

        <div className="grid grid-cols-2 gap-x-4 mt-6">
          <div className="space-y-2">
            {result.map((item, index) => (
              <ResultBox
                result={item}
                option={options[index]}
                onClick={() => setCount(index)}
                className={`${
                  count === index
                    ? "bg-[#EDF1D6] " // 선택된 인덱스에 배경색과 투명도
                    : "bg-[#F5F5F5]" // 선택되지 않은 경우
                }`}
              />
            ))}
          </div>
          <div>
            {count < 5 && resultList[count]?.length > 0 && (
              <div className="space-y-2">
                {resultList[count].map((item, index) => (
                  <ResultBox
                    key={index}
                    result={item}
                    option={options[count]}
                    number={index}
                    className={"bg-[#F5F5F5]"}
                  />
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
