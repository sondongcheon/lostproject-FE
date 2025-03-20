import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

import HeadKeyBox from "./Component/HeadKeyBox";
import AllSelectPresetComp from "./Component/AllSelectPresetComp";
import SelectOptionComp from "./Component/SelectOptionComp";
import SearchBtm from "./Component/SearchBtm";
import ResultBox from "./Component/ResultBox";
import PageNation from "./Component/PageNation";

function AuctionTierFourSup({
  getCountLog,
  options,
  updateOptions,
  result,
  setResult,
  resultList,
  setResultList,
  count,
  setCount,
  currentPage,
  setCurrentPage,
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
    res.some((item, index) => {
      if (item) {
        setCount(index);
        return true;
      }
      return false;
    });
    setTotal(tmp);
  };

  useEffect(() => {
    const cookieValue = Cookies.get("apiKey");
    if (Cookies.get("apiKey") !== undefined) {
      setSaveKey(true);
    }
    setApiKey(cookieValue);
  }, []);

  useEffect(() => {
    if (selectOptionReq.length > 0) {
      setSearchState(true);
      if (saveKey) Cookies.set("apiKey", apiKey, { expires: 89, secure: true });
      else Cookies.remove("apiKey");
      axios
        .post(`${process.env.REACT_APP_URL}/auction/test5`, selectOptionReq, {
          headers: { apiKey: apiKey },
          params: { type: 2 },
        })
        .then((res) => {
          getTotal(res.data.data.searchResultRes);
          setResultList(res.data.data.result);
          setCurrentPage([1, 1, 1, 1, 1, 1]);
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
              return new Promise((resolve) => setTimeout(resolve, 5000));
            }
          });
        })
        .finally(() => {
          setTimeout(() => {
            setSearchState(false);
            getCountLog();
          }, 5000);
        });
    }
  }, [selectOptionReq]); // selectOptionReq가 변경될 때마다 실행

  const updateSelect = () => {
    const newSelectOptionReq = options.map((option) => ({
      tier: option.tier || "",
      quality: option.quality || "",
      statPercentage: option.statPercentage || "",
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

  return (
    <div className="mainbody">
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
      <div className="grid grid-cols-2 gap-x-4 gap-y-4">
        <div>
          <AllSelectPresetComp updateSet={updateOptions} type={1}></AllSelectPresetComp>
        </div>
        <div>
          <SelectOptionComp
            options={options[0]}
            onOptionsChange={updateOptions[0]}
          ></SelectOptionComp>
        </div>
        <div>
          <SelectOptionComp
            options={options[1]}
            onOptionsChange={updateOptions[1]}
          ></SelectOptionComp>
        </div>
        <div>
          <SelectOptionComp
            options={options[2]}
            onOptionsChange={updateOptions[2]}
          ></SelectOptionComp>
        </div>
        <div>
          <SelectOptionComp
            options={options[3]}
            onOptionsChange={updateOptions[3]}
          ></SelectOptionComp>
        </div>
        <div>
          <SelectOptionComp
            options={options[4]}
            onOptionsChange={updateOptions[4]}
          ></SelectOptionComp>
        </div>
      </div>

      <div className="mt-6">
        <SearchBtm
          selectOptions={options}
          search={updateSelect}
          total={total}
          searchState={searchState}
          apiKey={apiKey}
        ></SearchBtm>

        <div className="grid grid-cols-2 gap-x-4 mt-6">
          <div className="space-y-2 mt-12">
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
            <div
              className={`"h-12 gap-x-4 w-full border-black border-2" ${
                (result[count]?.cntCount || 0) < 1 && (result[count]?.cntPage || 0) < 1
                  ? "invisible"
                  : ""
              }`}
            >
              <PageNation
                dataLength={resultList[count].length}
                setResult={setResult}
                setResultList={setResultList}
                option={options[count]}
                cntPage={result[count]?.cntPage || 0}
                cntCount={result[count]?.cntCount || 0}
                apiKey={apiKey}
                type={2}
                selAcc={count}
                currentPage={currentPage[count]}
                setCurrentPage={setCurrentPage}
              />
            </div>
            {count < 5 && resultList[count][currentPage[count] - 1]?.length > 0 && (
              <div className="space-y-2">
                {resultList[count][currentPage[count] - 1].map((item, index) => (
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

export default AuctionTierFourSup;
