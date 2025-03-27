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
import Calstat from "./Component/Calstat";

import DisplayAds from "../common/Component/DisplayAds";

import folderOpen from "../Assets/folderOpen.png";
import folderClose from "../Assets/folderClose.png";

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

  const [folderFlags, setFolderFlags] = useState(() => {
    const savedFlags = localStorage.getItem("folderFlags");
    return savedFlags
      ? JSON.parse(savedFlags)
      : {
          folder1: false,
          presetFolder: false,
          selAll: false,
          searchMenu: false,
          acc1: false,
          acc2: false,
          acc3: false,
          acc4: false,
          acc5: false,
          findCharacter: false,
        };
  });

  const [rotateFlags, setRotateFlags] = useState({});

  const handleToggle = (key) => {
    // 회전 상태 변경
    setRotateFlags((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setRotateFlags((prev) => ({ ...prev, [key]: false }));
    }, 500); // 회전 지속 시간

    // 기존 토글 함수 호출
    controllFolder(key);
  };

  const controllFolder = (key) => {
    setFolderFlags((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

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
    localStorage.setItem("folderFlags", JSON.stringify(folderFlags));
  }, [folderFlags]);

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
    <div className="flex">
      <div className="mt-32 w-[15%]">
        <DisplayAds />
      </div>
      <div className="mainbody">
        <div
          className="w-full flex items-center justify-center cursor-pointer"
          onClick={() => handleToggle("presetFolder")}
        >
          <img
            src={folderFlags.presetFolder ? folderClose : folderOpen}
            alt="toggle icon"
            className={`absolute z-10 mr-20 w-8 h-8 transform transition-transform duration-500 ease-in-out ${
              folderFlags.presetFolder
                ? "animate-spinCounterClockwise" // 열 때
                : "animate-spinClockwise" // 닫을 때
            }`}
          />
          <span className="bg-white font-bold text-[#2384bc] items-center rounded-xl w-40 ml-20 pl-6 text-sm">
            {folderFlags.presetFolder ? (
              <span> 일괄 선택 프리셋 열기 </span>
            ) : (
              <span> 일괄 선택 프리셋 닫기 </span>
            )}
          </span>
        </div>

        <div
          className={`transition-all duration-500 ${
            folderFlags.presetFolder
              ? "max-h-0 opacity-0 overflow-hidden"
              : "max-h-[120%] opacity-100 mt-4"
          }`}
        >
          <AllSelectPresetComp
            updateSet={updateOptions}
            type={1}
            search={updateSelect}
            searchState={searchState}
            apiKey={apiKey}
          />
        </div>

        <div
          className="mt-4 flex items-center justify-center cursor-pointer"
          onClick={() => handleToggle("selAll")}
        >
          <img
            src={folderFlags.selAll ? folderClose : folderOpen}
            alt="toggle icon"
            className={`absolute z-10 w-8 h-8 mr-20 transform transition-transform duration-500 ease-in-out ${
              folderFlags.selAll
                ? "animate-spinCounterClockwise" // 열 때
                : "animate-spinClockwise" // 닫을 때
            }`}
          />
          <span className="bg-white font-bold text-[#2384bc] items-center rounded-xl w-40 ml-20 pl-6 text-sm">
            {folderFlags.selAll ? (
              <span> 전체 옵션 선택창 열기 </span>
            ) : (
              <span> 전체 옵션 선택창 닫기 </span>
            )}
          </span>
        </div>
        <div
          className={`grid grid-cols-2 gap-x-4 gap-y-4 transition-all duration-1000 ${
            folderFlags.selAll
              ? "max-h-0 opacity-0 overflow-hidden"
              : "max-h-[120%] opacity-100 mt-4 "
          }`}
        >
          <div>
            <HeadKeyBox
              apiKey={apiKey}
              setApiKey={setApiKey}
              saveKey={saveKey}
              setSaveKey={setSaveKey}
            ></HeadKeyBox>
            <Calstat></Calstat>
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
          <div
            className=" flex items-center justify-center cursor-pointer"
            onClick={() => handleToggle("searchMenu")}
          >
            <img
              src={folderFlags.searchMenu ? folderClose : folderOpen}
              alt="toggle icon"
              className={`absolute z-10 w-8 h-8 mr-20 w-8 h-8 transform transition-transform duration-500 ease-in-out ${
                folderFlags.searchMenu
                  ? "animate-spinCounterClockwise" // 열 때
                  : "animate-spinClockwise" // 닫을 때
              }`}
            />
            <span className="bg-white font-bold text-[#2384bc] items-center rounded-xl w-40 ml-20 pl-6 text-sm">
              {folderFlags.searchMenu ? (
                <span> 검색/캐릭터검색 열기 </span>
              ) : (
                <span> 검색/캐릭터검색 닫기 </span>
              )}
            </span>
          </div>
          <div
            className={`transition-all duration-500 ${
              folderFlags.searchMenu
                ? "max-h-0 opacity-0 overflow-hidden"
                : "max-h-44 opacity-100 mt-4"
            }`}
          >
            <SearchBtm
              selectOptions={options}
              search={updateSelect}
              total={total}
              searchState={searchState}
              apiKey={apiKey}
            ></SearchBtm>
          </div>
          <div className="grid grid-cols-2 gap-x-4 mt-6">
            <div className="space-y-2 mt-24">
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
            <div className="h-[1024px] overflow-y-invisible shadow-xl overflow-x-hidden">
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
                      className={"bg-[#F5F5F5] pointer-events-none"}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-32 w-[15%]">
        <DisplayAds />
      </div>
    </div>
  );
}

export default AuctionTierFourSup;
