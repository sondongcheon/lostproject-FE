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
import PageNation from "./Component/PageNation";

import { FcOpenedFolder } from "react-icons/fc";
import { FcFolder } from "react-icons/fc";

function MauctionTierFourSup({
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
          acc1: false,
          acc2: false,
          acc3: false,
          acc4: false,
          acc5: false,
          findCharacter: false,
        };
  });

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
    const cookieValue = Cookies.get("apiKey" ?? "");
    if (Cookies.get("apiKey") !== undefined) {
      setSaveKey(true);
    }
    setApiKey(cookieValue);
  }, []);

  useEffect(() => {
    localStorage.setItem("folderFlags", JSON.stringify(folderFlags));
  }, [folderFlags]);

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

  const check = () => {
    console.log(options.selectOption2);
  };

  return (
    <div className="mainMobileBody">
      <div
        className="flex"
        onClick={() => {
          controllFolder("folder1");
        }}
      >
        {folderFlags.folder1 ? (
          <span className="flex items-center font-bold size-font-xl">
            <FcFolder className="ml-8 w-12 h-12" /> - 특수추적 설명, API KEY 설정창 닫힘
          </span>
        ) : (
          <FcOpenedFolder className="ml-8 w-12 h-12" />
        )}
      </div>
      <div className={`mb-4 ${folderFlags.folder1 ? "hidden" : ""}`}>
        <div className="h-30  flex shadow-lg border-2 rounded-3xl bg-[#F5F5F5] mb-4">
          <span className="p-4 size-font-xs">
            <span className="text-red-500 font-bold size-font-xl">특수 추적</span>
            <span>이란?</span>
            <br />
            연마 등급만 정하고(ex. 상단일 3개 중중 2개) <br /> 그 등급을 어느 악세서리와 매칭하는게
            가장 저렴한지 검색합니다. <br /> 연마 옵션을 선택 하지 않고, 등급만 선택한 후 모든
            경우의 수를 비교합니다. <br />
            대신, 스텟 필터 기능이 동작하지 않습니다.
          </span>
        </div>
        <HeadKeyBox
          apiKey={apiKey}
          setApiKey={setApiKey}
          saveKey={saveKey}
          setSaveKey={setSaveKey}
        ></HeadKeyBox>
      </div>

      <div className="gap-x-4 gap-y-4">
        <div
          className="flex"
          onClick={() => {
            controllFolder("persetFolder");
          }}
        >
          {folderFlags.persetFolder ? (
            <span className="flex items-center font-bold size-font-xl">
              <FcFolder className="ml-8 w-12 h-12" /> - 일괄선택 프리셋 닫힘
            </span>
          ) : (
            <FcOpenedFolder className="ml-8 w-12 h-12" />
          )}
        </div>
        <div className={`pb-4 ${folderFlags.persetFolder ? "hidden" : ""}`}>
          <AllSelectPresetComp updateSet={updateOptions} type={1}></AllSelectPresetComp>
        </div>
        <div
          className="flex"
          onClick={() => {
            controllFolder("acc1");
          }}
        >
          {folderFlags.acc1 ? (
            <span className="flex items-center font-bold size-font-xl">
              <FcFolder className="ml-8 w-12 h-12" /> - 목걸이 옵션 선택창 닫힘
            </span>
          ) : (
            <FcOpenedFolder className="ml-8 w-12 h-12" />
          )}
        </div>
        <div className={`pb-4 ${folderFlags.acc1 ? "hidden" : ""}`}>
          <SelectOptionComp
            options={options[0]}
            onOptionsChange={updateOptions[0]}
          ></SelectOptionComp>
        </div>
        <div
          className="flex"
          onClick={() => {
            controllFolder("acc2");
          }}
        >
          {folderFlags.acc2 ? (
            <span className="flex items-center font-bold size-font-xl">
              <FcFolder className="ml-8 w-12 h-12" /> - 귀걸이1 옵션 선택창 닫힘
            </span>
          ) : (
            <FcOpenedFolder className="ml-8 w-12 h-12" />
          )}
        </div>
        <div className={`pb-4 ${folderFlags.acc2 ? "hidden" : ""}`}>
          <SelectOptionComp
            options={options[1]}
            onOptionsChange={updateOptions[1]}
          ></SelectOptionComp>
        </div>
        <div
          className="flex"
          onClick={() => {
            controllFolder("acc3");
          }}
        >
          {folderFlags.acc3 ? (
            <span className="flex items-center font-bold size-font-xl">
              <FcFolder className="ml-8 w-12 h-12" /> - 귀걸이2 옵션 선택창 닫힘
            </span>
          ) : (
            <FcOpenedFolder className="ml-8 w-12 h-12" />
          )}
        </div>
        <div className={`pb-4 ${folderFlags.acc3 ? "hidden" : ""}`}>
          <SelectOptionComp
            options={options[2]}
            onOptionsChange={updateOptions[2]}
          ></SelectOptionComp>
        </div>
        <div
          className="flex"
          onClick={() => {
            controllFolder("acc4");
          }}
        >
          {folderFlags.acc4 ? (
            <span className="flex items-center font-bold size-font-xl">
              <FcFolder className="ml-8 w-12 h-12" /> - 반지1 옵션 선택창 닫힘
            </span>
          ) : (
            <FcOpenedFolder className="ml-8 w-12 h-12" />
          )}
        </div>
        <div className={`pb-4 ${folderFlags.acc4 ? "hidden" : ""}`}>
          <SelectOptionComp
            options={options[3]}
            onOptionsChange={updateOptions[3]}
          ></SelectOptionComp>
        </div>
        <div
          className="flex"
          onClick={() => {
            controllFolder("acc5");
          }}
        >
          {folderFlags.acc5 ? (
            <span className="flex items-center font-bold size-font-xl">
              <FcFolder className="ml-8 w-12 h-12" /> - 반지2 옵션 선택창 닫힘
            </span>
          ) : (
            <FcOpenedFolder className="ml-8 w-12 h-12" />
          )}
        </div>
        <div className={`pb-4 ${folderFlags.acc5 ? "hidden" : ""}`}>
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
            <div
              className="flex"
              onClick={() => {
                controllFolder("findCharacter");
              }}
            >
              {folderFlags.findCharacter ? (
                <span className="flex items-center font-bold">
                  <FcFolder className="ml-8 w-12 h-12" /> - 캐릭터 검색창 닫힘
                </span>
              ) : (
                <FcOpenedFolder className="ml-8 w-12 h-12" />
              )}
            </div>
            <div className={` ${folderFlags.findCharacter ? "hidden" : ""}`}>
              <SearchBtm
                selectOptions={options}
                search={updateSelect}
                total={total}
                searchState={searchState}
                apiKey={apiKey}
              ></SearchBtm>
            </div>

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

export default MauctionTierFourSup;
