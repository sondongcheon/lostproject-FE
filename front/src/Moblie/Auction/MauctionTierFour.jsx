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
import Calstat from "./Component/Calstat";

import folderOpen from "../../Assets/folderOpen.png";
import folderClose from "../../Assets/folderClose.png";

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
  currentPage,
  setCurrentPage,
  staticNameList,
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
          calFolder: false,
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
      statPer: option.statPer || "",
      upgradeLevel: option.upgradeLevel || "",
      tradeAllowCount: option.trdCnt || "",
      categoryCode: option.categoryCode || "",
      itemGrade: option.itemGrade || "",
      etcOptionList: [
        {
          option: option.selOpt1 || null,
          value: option.selVal1 || null,
        },
        {
          option: option.selOpt2 || null,
          value: option.selVal2 || null,
        },
        {
          option: option.selOpt3 || null,
          value: option.selVal3 || null,
        },
      ],
    }));

    setSelectOptionReq(newSelectOptionReq);
  };

  const check = () => {
    console.log(options.selOpt2);
  };

  return (
    <div className="mainMobileBody">
      <div
        className="w-full flex items-center justify-center cursor-pointer"
        onClick={() => handleToggle("folder1")}
      >
        <img
          src={folderFlags.folder1 ? folderClose : folderOpen}
          alt="toggle icon"
          className={`absolute z-10 mr-20 w-8 h-8 transform transition-transform duration-300 ease-in-out ${
            folderFlags.folder1
              ? "animate-spinCounterClockwiseM" // 열 때
              : "animate-spinClockwiseM" // 닫을 때
          }`}
        />
        <span className="bg-white font-bold text-[#2384bc] items-center rounded-xl w-40 ml-20 pl-6 text-sm">
          {folderFlags.folder1 ? (
            <span> API KEY 설정창 열기 </span>
          ) : (
            <span> API KEY 설정창 닫기 </span>
          )}
        </span>
      </div>
      <div
        className={`transition-all duration-300 ${
          folderFlags.folder1
            ? "max-h-0 opacity-0 overflow-hidden"
            : "max-h-[120%] opacity-100 mt-4"
        }`}
      >
        <HeadKeyBox
          apiKey={apiKey}
          setApiKey={setApiKey}
          saveKey={saveKey}
          setSaveKey={setSaveKey}
        ></HeadKeyBox>
      </div>

      <div
        className="mt-4 w-full flex items-center justify-center cursor-pointer"
        onClick={() => handleToggle("calFolder")}
      >
        <img
          src={folderFlags.calFolder ? folderClose : folderOpen}
          alt="toggle icon"
          className={`absolute z-10 mr-20 w-8 h-8 transform transition-transform duration-300 ease-in-out ${
            folderFlags.calFolder
              ? "animate-spinCounterClockwiseM" // 열 때
              : "animate-spinClockwiseM" // 닫을 때
          }`}
        />
        <span className="bg-white font-bold text-[#2384bc] items-center rounded-xl w-40 ml-20 pl-6 text-sm">
          {folderFlags.calFolder ? (
            <span> 스텟 계산기 열기 </span>
          ) : (
            <span> 스텟 계산기 닫기 </span>
          )}
        </span>
      </div>
      <div
        className={`transition-all duration-300 ${
          folderFlags.calFolder
            ? "max-h-0 opacity-0 overflow-hidden"
            : "max-h-[120%] opacity-100 mt-4"
        }`}
      >
        <Calstat></Calstat>
      </div>

      <div className="gap-x-4 gap-y-4">
        <div
          className="mt-4 w-full flex items-center justify-center cursor-pointer"
          onClick={() => handleToggle("persetFolder")}
        >
          <img
            src={folderFlags.persetFolder ? folderClose : folderOpen}
            alt="toggle icon"
            className={`absolute z-10 mr-20 w-8 h-8 transform transition-transform duration-300 ease-in-out ${
              folderFlags.persetFolder
                ? "animate-spinCounterClockwiseM" // 열 때
                : "animate-spinClockwiseM" // 닫을 때
            }`}
          />
          <span className="bg-white font-bold text-[#2384bc] items-center rounded-xl w-40 ml-20 pl-6 text-sm">
            {folderFlags.persetFolder ? (
              <span> 일괄 선택 프리셋 열기 </span>
            ) : (
              <span> 일괄 선택 프리셋 닫기 </span>
            )}
          </span>
        </div>
        <div
          className={`transition-all duration-300 ${
            folderFlags.persetFolder
              ? "max-h-0 opacity-0 overflow-hidden"
              : "max-h-[120%] opacity-100 mt-4"
          }`}
        >
          <AllSelectPresetComp updateSet={updateOptions} type={0}></AllSelectPresetComp>
        </div>

        <div
          className="mt-4 w-full flex items-center justify-center cursor-pointer"
          onClick={() => handleToggle("acc1")}
        >
          <img
            src={folderFlags.acc1 ? folderClose : folderOpen}
            alt="toggle icon"
            className={`absolute z-10 mr-20 w-8 h-8 transform transition-transform duration-300 ease-in-out ${
              folderFlags.acc1
                ? "animate-spinCounterClockwiseM" // 열 때
                : "animate-spinClockwiseM" // 닫을 때
            }`}
          />
          <span className="bg-white font-bold text-[#2384bc] items-center rounded-xl w-40 ml-20 pl-6 text-sm">
            {folderFlags.acc1 ? <span> 목걸이 옵션 열기 </span> : <span> 목걸이 옵션 닫기 </span>}
          </span>
        </div>
        <div
          className={`transition-all duration-300 ${
            folderFlags.acc1 ? "max-h-0 opacity-0 overflow-hidden" : "max-h-[120%] opacity-100 mt-4"
          }`}
        >
          <SelectOptionComp
            options={options[0]}
            onOptionsChange={updateOptions[0]}
            staticNameList={staticNameList[0]}
          ></SelectOptionComp>
        </div>

        <div
          className="mt-4 w-full flex items-center justify-center cursor-pointer"
          onClick={() => handleToggle("acc2")}
        >
          <img
            src={folderFlags.acc2 ? folderClose : folderOpen}
            alt="toggle icon"
            className={`absolute z-10 mr-20 w-8 h-8 transform transition-transform duration-300 ease-in-out ${
              folderFlags.acc2
                ? "animate-spinCounterClockwiseM" // 열 때
                : "animate-spinClockwiseM" // 닫을 때
            }`}
          />
          <span className="bg-white font-bold text-[#2384bc] items-center rounded-xl w-40 ml-20 pl-6 text-sm">
            {folderFlags.acc2 ? <span> 귀걸이1 옵션 열기 </span> : <span> 귀걸이1 옵션 닫기 </span>}
          </span>
        </div>
        <div
          className={`transition-all duration-300 ${
            folderFlags.acc2 ? "max-h-0 opacity-0 overflow-hidden" : "max-h-[120%] opacity-100 mt-4"
          }`}
        >
          <SelectOptionComp
            options={options[1]}
            onOptionsChange={updateOptions[1]}
            staticNameList={staticNameList[1]}
          ></SelectOptionComp>
        </div>

        <div
          className="mt-4 w-full flex items-center justify-center cursor-pointer"
          onClick={() => handleToggle("acc3")}
        >
          <img
            src={folderFlags.acc3 ? folderClose : folderOpen}
            alt="toggle icon"
            className={`absolute z-10 mr-20 w-8 h-8 transform transition-transform duration-300 ease-in-out ${
              folderFlags.acc3
                ? "animate-spinCounterClockwiseM" // 열 때
                : "animate-spinClockwiseM" // 닫을 때
            }`}
          />
          <span className="bg-white font-bold text-[#2384bc] items-center rounded-xl w-40 ml-20 pl-6 text-sm">
            {folderFlags.acc3 ? <span> 귀걸이2 옵션 열기 </span> : <span> 귀걸이2 옵션 닫기 </span>}
          </span>
        </div>
        <div
          className={`transition-all duration-300 ${
            folderFlags.acc3 ? "max-h-0 opacity-0 overflow-hidden" : "max-h-[120%] opacity-100 mt-4"
          }`}
        >
          <SelectOptionComp
            options={options[2]}
            onOptionsChange={updateOptions[2]}
            staticNameList={staticNameList[2]}
          ></SelectOptionComp>
        </div>

        <div
          className="mt-4 w-full flex items-center justify-center cursor-pointer"
          onClick={() => handleToggle("acc4")}
        >
          <img
            src={folderFlags.acc4 ? folderClose : folderOpen}
            alt="toggle icon"
            className={`absolute z-10 mr-20 w-8 h-8 transform transition-transform duration-300 ease-in-out ${
              folderFlags.acc4
                ? "animate-spinCounterClockwiseM" // 열 때
                : "animate-spinClockwiseM" // 닫을 때
            }`}
          />
          <span className="bg-white font-bold text-[#2384bc] items-center rounded-xl w-40 ml-20 pl-6 text-sm">
            {folderFlags.acc4 ? <span> 반지1 옵션 열기 </span> : <span> 반지1 옵션 닫기 </span>}
          </span>
        </div>
        <div
          className={`transition-all duration-300 ${
            folderFlags.acc4 ? "max-h-0 opacity-0 overflow-hidden" : "max-h-[120%] opacity-100 mt-4"
          }`}
        >
          <SelectOptionComp
            options={options[3]}
            onOptionsChange={updateOptions[3]}
            staticNameList={staticNameList[3]}
          ></SelectOptionComp>
        </div>

        <div
          className="mt-4 w-full flex items-center justify-center cursor-pointer"
          onClick={() => handleToggle("acc5")}
        >
          <img
            src={folderFlags.acc5 ? folderClose : folderOpen}
            alt="toggle icon"
            className={`absolute z-10 mr-20 w-8 h-8 transform transition-transform duration-300 ease-in-out ${
              folderFlags.acc5
                ? "animate-spinCounterClockwiseM" // 열 때
                : "animate-spinClockwiseM" // 닫을 때
            }`}
          />
          <span className="bg-white font-bold text-[#2384bc] items-center rounded-xl w-40 ml-20 pl-6 text-sm">
            {folderFlags.acc5 ? <span> 반지2 옵션 열기 </span> : <span> 반지2 옵션 닫기 </span>}
          </span>
        </div>
        <div
          className={`transition-all duration-300 ${
            folderFlags.acc5 ? "max-h-0 opacity-0 overflow-hidden" : "max-h-[120%] opacity-100 mt-4"
          }`}
        >
          <SelectOptionComp
            options={options[4]}
            onOptionsChange={updateOptions[4]}
            staticNameList={staticNameList[4]}
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
              className="mt-4 w-full flex items-center justify-center cursor-pointer"
              onClick={() => handleToggle("findCharacter")}
            >
              <img
                src={folderFlags.findCharacter ? folderClose : folderOpen}
                alt="toggle icon"
                className={`absolute z-10 mr-20 w-8 h-8 transform transition-transform duration-300 ease-in-out ${
                  folderFlags.findCharacter
                    ? "animate-spinCounterClockwiseM" // 열 때
                    : "animate-spinClockwiseM" // 닫을 때
                }`}
              />
              <span className="bg-white font-bold text-[#2384bc] items-center rounded-xl w-40 ml-20 pl-6 text-sm">
                {folderFlags.findCharacter ? (
                  <span> 캐릭터 검색창 열기 </span>
                ) : (
                  <span> 캐릭터 검색창 닫기 </span>
                )}
              </span>
            </div>
            <div
              className={`transition-all duration-300 ${
                folderFlags.findCharacter
                  ? "max-h-0 opacity-0 overflow-hidden"
                  : "max-h-[120%] opacity-100 mt-4"
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

            {result.map((item, index) => (
              <ResultBox
                result={item}
                staticNameList={staticNameList[index]}
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
                type={0}
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
                    staticNameList={staticNameList[count]}
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
