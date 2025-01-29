import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

import HeadKeyBox from "./Component/HeadKeyBox";
import AllSelectPresetComp from "./Component/AllSelectPresetComp";
import SelectOptionComp from "./Component/SelectOptionComp";
import SelectSummary from "./Component/SelectSummary";
import SearchBtm from "./Component/SearchBtm";
import ResultBox from "./Component/ResultBox";

function MauctionTierFour({
  getCountLog,
  options,
  updateOptions,
  result,
  setResult,
  resultList,
  setResultList,
  count,
  setCount,
}) {
  const [selectOptionReq, setSelectOptionReq] = useState([]);

  const [searchState, setSearchState] = useState(false);

  const [apiKey, setApiKey] = useState("");
  const [saveKey, setSaveKey] = useState(false);

  const [total, setTotal] = useState(0);

  const getTotal = (res) => {
    var tmp = res.reduce((sum, item) => {
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
      const encodedApiKey = encodeURIComponent(apiKey);
      setSearchState(true);
      if (saveKey)
        Cookies.set("apiKey", apiKey, {
          expires: 89,
          secure: true,
          sameSite: "Strict",
        });
      else Cookies.remove("apiKey");
      axios
        .post(`${process.env.REACT_APP_URL}/auction/test5`, selectOptionReq, {
          headers: { apiKey: encodedApiKey },
          params: { type: 0 },
        })
        .then((res) => {
          getTotal(res.data.data.searchResultRes);
          setResultList(res.data.data.result);
        })
        .catch((error) => {
          const handleError = () => {
            if (error.response.data.code.includes("API-")) {
              return Swal.fire({
                icon: "warning",
                html: error.response.data.message,
                confirmButtonText: "확인",
              });
            } else {
              return Swal.fire({
                icon: "warning",
                title: "예측되지 못한 오류입니다.",
                html: error.response.data.message,
                confirmButtonText: "확인",
              });
            }
          };

          return handleError().then(() => {
            // 60초 대기
            if (error.response.data.code === "API-001") {
              return new Promise((resolve) => setTimeout(resolve, 60000));
            } else {
              return new Promise((resolve) => setTimeout(resolve, 3000));
            }
          });
        })
        .finally(() => {
          setSearchState(false);
          getCountLog();
        });
    }
  }, [selectOptionReq]); // selectOptionReq가 변경될 때마다 실행

  const updateSelect = () => {
    const newSelectOptionReq = options.map((option) => ({
      tier: option.tier || "",
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
  };

  const check = () => {
    console.log(options.selectOption2);
  };

  return (
    <div className="mainMobileBody">
      {/* <button className="normalBtm" onClick={() => check()}>
        dfsfdsa
      </button> */}
      <div className="mb-4">
        <HeadKeyBox
          apiKey={apiKey}
          setApiKey={setApiKey}
          saveKey={saveKey}
          setSaveKey={setSaveKey}
        ></HeadKeyBox>
      </div>

      <div className="gap-x-4 gap-y-4">
        <div className="pb-4">
          <AllSelectPresetComp updateSet={updateOptions} type={0}></AllSelectPresetComp>
        </div>
        <div className="pb-4">
          <SelectOptionComp
            options={options[0]}
            onOptionsChange={updateOptions[0]}
          ></SelectOptionComp>
        </div>
        <div className="pb-4">
          <SelectOptionComp
            options={options[1]}
            onOptionsChange={updateOptions[1]}
          ></SelectOptionComp>
        </div>
        <div className="pb-4">
          <SelectOptionComp
            options={options[2]}
            onOptionsChange={updateOptions[2]}
          ></SelectOptionComp>
        </div>
        <div className="pb-4">
          <SelectOptionComp
            options={options[3]}
            onOptionsChange={updateOptions[3]}
          ></SelectOptionComp>
        </div>
        <div className="pb-4">
          <SelectOptionComp
            options={options[4]}
            onOptionsChange={updateOptions[4]}
          ></SelectOptionComp>
        </div>
      </div>

      <div className="mt-6">
        <SelectSummary
          search={updateSelect}
          total={total}
          searchState={searchState}
          apiKey={apiKey}
        ></SelectSummary>

        <div className="gap-x-4 mt-6">
          <div className="space-y-2">
            <SearchBtm
              selectOptions={options}
              search={updateSelect}
              total={total}
              searchState={searchState}
              apiKey={apiKey}
            ></SearchBtm>

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
          <div className="pt-10">
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

export default MauctionTierFour;
