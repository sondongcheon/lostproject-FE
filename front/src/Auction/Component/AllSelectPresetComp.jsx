import React, { useEffect, useState } from "react";

import shareBtm from "../../Assets/shareBtm.png";
import { BsFillQuestionCircleFill } from "react-icons/bs";

import loading from "../../Assets/loading.webp";

const AllSelectPresetComp = ({
  updateSet,
  type,
  search,
  searchState,
  apiKey,
  savePresetSlot,
  loadPresetSlot,
  savePresetCodeSlot,
}) => {
  const [sliderValue, setSliderValue] = useState(67);
  const [sliderStatValue, setSliderStatValue] = useState(10);
  const [options, setOptions] = useState({});
  const [presetSelectValue, setPresetSelectValue] = useState("-1");
  const [presetName, setPresetName] = useState("");
  const [presetCode, setPresetCode] = useState("");

  const [presetSlots, setPresetSlots] = useState([
    {
      name: "프리셋 1",
    },
    {
      name: "프리셋 2",
    },
    {
      name: "프리셋 3",
    },
    {
      name: "프리셋 4",
    },
    {
      name: "프리셋 5",
    },
  ]);

  const exportPreset = (index) => {
    const preset = JSON.parse(
      localStorage.getItem("presetSlots" + (type === 0 ? "Del" : "Sup"))
    );

    const presetString = JSON.stringify(preset[index]);
    const encoded = btoa(unescape(encodeURIComponent(presetString)));
    navigator.clipboard.writeText(encoded);
    alert("프리셋이 클립보드에 복사되었습니다!");
  };

  const setGrade = (key, value) => {
    updateSet.forEach((updateOption) => {
      updateOption(key, value);
    });
  };

  const loadPreset = () => {
    const stored = JSON.parse(
      localStorage.getItem("presetSlots" + (type === 0 ? "Del" : "Sup"))
    );

    if (stored) {
      setPresetSlots(stored);
    }
  };

  useEffect(() => {
    loadPreset();
  }, []);

  useEffect(() => {
    if (type === 0) {
      setOptions({
        selOpt1: ["41", "45", "45", "49", "49"],
        selOpt2: ["42", "46", "46", "50", "50"],
      });
    } else if (type === 1) {
      setOptions({
        selOpt1: ["43", "46", "46", "51", "51"],
        selOpt2: ["44", "54", "54", "52", "52"],
      });
    }
    setGrade("quality", 67);
    setGrade("statPer", 10);
  }, type);

  const setOption = (key1, value1, key2, value2) => {
    updateSet.forEach((updateOption) => {
      updateOption(key1, value1);
    });
    updateSet.forEach((updateOption) => {
      updateOption(key2, value2);
    });

    if (value2 !== null) {
      Object.entries(options).forEach(([key, values]) => {
        values.forEach((value, index) => {
          updateSet[index]?.(key, value);
        });
      });
    } else {
      updateSet.forEach((updateOption) => {
        updateOption("selOpt2", null);
      });
    }
  };

  const setReset = () => {
    setSliderValue(67);
    setSliderStatValue(10);
    updateSet.forEach((updateOption) => {
      updateOption("tier", "4");
    });
    updateSet.forEach((updateOption) => {
      updateOption("itemGrade", "");
    });
    updateSet.forEach((updateOption) => {
      updateOption("quality", 67);
    });
    updateSet.forEach((updateOption) => {
      updateOption("statPer", 10);
    });
    updateSet.forEach((updateOption) => {
      updateOption("upgradeLevel", null);
    });
    updateSet.forEach((updateOption) => {
      updateOption("trdCnt", null);
    });
    updateSet.forEach((updateOption) => {
      updateOption("selOpt1", null);
    });
    updateSet.forEach((updateOption) => {
      updateOption("selVal1", null);
    });
    updateSet.forEach((updateOption) => {
      updateOption("selOpt2", null);
    });
    updateSet.forEach((updateOption) => {
      updateOption("selVal2", null);
    });
    updateSet.forEach((updateOption, index) => {
      updateOption("selOpt3", null);
    });
    updateSet.forEach((updateOption) => {
      updateOption("selVal3", null);
    });

    updateSet[0]("categoryCode", 200010);
    updateSet[1]("categoryCode", 200020);
    updateSet[2]("categoryCode", 200020);
    updateSet[3]("categoryCode", 200030);
    updateSet[4]("categoryCode", 200030);
  };

  return (
    <div>
      <div className="flex">
        <div className="h-72 w-full flex shadow-lg border-2 rounded-2xl bg-[#F5F5F5] dark:bg-[#2A2A2A] ">
          <div className="w-[25%] grid grid-rows-4 gap-y-2 py-2 ">
            <div className=" overflow-hidden">
              {apiKey === "" || !apiKey ? (
                <div className="flex animate-marquee-loop whitespace-nowrap relative w-full h-full flex items-center overflow-hidden text-sm text-red-500 dark:text-red-700 font-bold">
                  <span className="mr-10">
                    🚨 API Key가 입력되지 않았습니다 🚨 공용키가 사용되어
                    검색되므로 분당 횟수 초과가 일어날 확률이 높습니다.
                  </span>
                  <span>
                    🚨 API Key가 입력되지 않았습니다 🚨 공용키가 사용되어
                    검색되므로 분당 횟수 초과가 일어날 확률이 높습니다.
                  </span>
                </div>
              ) : (
                <div className="h-full flex items-center px-8">
                  <span className="font-bold text-xl">| 전체 선택 프리셋</span>
                </div>
              )}

              {/* <h1
                className={` ${
                  apiKey === "" || !apiKey ? "visible" : "invisible"
                }`}
              >
                
              </h1> */}
            </div>
            <div className=" w-full gap-x-4 text-center flex justify-center items-center ">
              <button
                className="w-1/3 py-2 px-4 h-full rounded-lg font-bold resetBtm bg-[#b2ddad] dark:bg-[#5C8F5A]"
                onClick={setReset}
              >
                🔄초기화
              </button>

              <div className="w-1/3 h-full flex justify-center items-center ">
                <button
                  className="w-full h-full bg-[#40AC8D] dark:bg-[#2F7560] rounded-lg hover:text-white hover:bg-[#3A8F7A] dark:hover:bg-[#276353] hover:scale-105 transition-transform duration-300"
                  onClick={search}
                  disabled={searchState}
                >
                  {searchState ? (
                    <div className="h-full mt-1 text-xs">
                      <img src={loading} className="mx-auto h-1/3 "></img>
                      결과는 하단에서 <br /> 확인하세요!
                    </div>
                  ) : (
                    <span>🔎검색하기</span>
                  )}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 justify-center items-center px-8">
              <span className=" text-sm  font-bold">전체 품질</span>
              <input
                type="range"
                min="0"
                max="100"
                value={sliderValue}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  setSliderValue(value); // 로컬 상태 업데이트
                  setGrade("quality", value === 0 ? null : value); // 부모에 값 전달
                }}
                className="slider w-full  h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className=" text-center text-sm text-gray-500">
                <input
                  className="w-2/3 h-[28px] text-center rounded-2xl border border-gray-300"
                  placeholder="미지정"
                  type="number"
                  min="0"
                  max="100"
                  value={sliderValue}
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    setSliderValue(value); // 로컬 상태 업데이트
                    setGrade(
                      "quality",
                      isNaN(value) ? null : Math.min(100, Math.max(0, value))
                    );
                  }}
                />
                {/* {sliderValue === 0 ? "미지정" : sliderValue} */}
              </div>
            </div>
            <div className="grid grid-cols-3 justify-center items-center px-8">
              <span className=" text-sm font-bold">전체 힘민지%</span>
              <input
                type="range"
                min="0"
                max="100"
                value={sliderStatValue}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  setSliderStatValue(value); // 로컬 상태 업데이트
                  setGrade("statPer", value === 0 ? null : value); // 부모에 값 전달
                }}
                className="slider  w-full  h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="  text-center text-sm text-gray-500">
                <input
                  className="w-2/3 h-[28px] text-center rounded-2xl border border-gray-300"
                  placeholder="미지정"
                  type="number"
                  min="0"
                  max="100"
                  value={sliderStatValue}
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    setSliderStatValue(value); // 로컬 상태 업데이트
                    setGrade(
                      "statPer",
                      isNaN(value) ? null : Math.min(100, Math.max(0, value))
                    );
                  }}
                />
                {/* {sliderValue === 0 ? "미지정" : sliderValue} */}
              </div>
            </div>
          </div>
          <div className="w-[75%] mt-4 mr-8 flex grid grid-cols-10 items-center text-sm font-bold">
            <div>
              <div className="border-b-[3px] pb-1 border-[#2384bc] w-[75%] mx-auto text-[#2384bc] size-font-xxs mb-2">
                등급 선택
              </div>
              <div className="grid grid-rows-2 h-20">
                <button
                  className="presetBtmNoneBG bg-[#e95a04] border border-[#d75101] "
                  onClick={() => setGrade("itemGrade", "유물")}
                >
                  All 유물
                </button>
                <button
                  className="presetBtmNoneBG bg-[#ddb300] border border-[#c9a302] "
                  onClick={() => setGrade("itemGrade", "고대")}
                >
                  All 고대
                </button>
              </div>
            </div>

            <div className="col-span-5 px-3">
              <div className="border-b-[3px] pb-1 border-gray-500 text-gray-500 w-[95%] mx-auto size-font-xxs mb-2">
                연마등급 일괄선택
              </div>
              <div className="grid grid-rows-2 grid-cols-5 h-20">
                <button
                  className="presetBtm hover:bg-[#e38e49] "
                  onClick={() => setOption("selVal1", "3", "selVal2", null)}
                >
                  상단일
                </button>

                <button
                  className="presetBtm hover:bg-[#e38e49]"
                  onClick={() => setOption("selVal1", "3", "selVal2", "3")}
                >
                  상 상
                </button>
                <div className=" group relative flex justify-center">
                  <button
                    className="hover:bg-[#e38e49] hover:border-[#da7c2f] presetBtm"
                    onClick={() => setOption("selVal1", "3", "selVal2", "2")}
                  >
                    상 중
                  </button>
                  <div className="absolute z-20 bottom-8 w-[250%] px-3 py-2 bg-gray-800 text-white size-font-xxxs rounded shadow-lg opacity-0 visibility-hidden pointer-events-none group-hover:opacity-100 group-hover:visibility-visible group-hover:pointer-events-auto transition-opacity duration-300">
                    {type === 0 ? (
                      <span>
                        목걸이 → 추피 상, 적주피 중 <br /> 귀걸이 → 공 상, 무공
                        중 <br />
                        반지 → 치적 상, 치피 중
                      </span>
                    ) : (
                      <span>
                        목걸이 → 아덴+ 상, 낙인력 중 <br /> 귀걸이 → 무공% 상,
                        무공+ 중 <br />
                        반지 → 아공강 상, 아피강 중
                      </span>
                    )}
                  </div>
                </div>
                <div className=" group relative flex justify-center">
                  <button
                    className="hover:bg-[#e38e49] hover:border-[#da7c2f] presetBtm"
                    onClick={() => setOption("selVal1", "3", "selVal2", "1")}
                  >
                    상 하
                  </button>
                  <div className="absolute z-20 bottom-8 w-[250%] px-3 py-2 bg-gray-800 text-white size-font-xxxs rounded shadow-lg opacity-0 visibility-hidden pointer-events-none group-hover:opacity-100 group-hover:visibility-visible group-hover:pointer-events-auto transition-opacity duration-300">
                    {type === 0 ? (
                      <span>
                        목걸이 → 추피 상, 적주피 하 <br /> 귀걸이 → 공 상, 무공
                        하 <br />
                        반지 → 치적 상, 치피 중
                      </span>
                    ) : (
                      <span>
                        목걸이 → 아덴+ 상, 낙인력 하 <br /> 귀걸이 → 무공% 상,
                        무공+ 하 <br />
                        반지 → 아공강 상, 아피강 하
                      </span>
                    )}
                  </div>
                </div>

                <div className=" group relative flex justify-center">
                  <button
                    className="hover:bg-[#2f5a9b] hover:border-[#0a3981] presetBtm"
                    onClick={() => setOption("selVal1", "1", "selVal2", "3")}
                  >
                    하 상
                  </button>
                  <div className="absolute z-20 bottom-8 w-[250%] px-3 py-2 bg-gray-800 text-white size-font-xxxs rounded shadow-lg opacity-0 visibility-hidden pointer-events-none group-hover:opacity-100 group-hover:visibility-visible group-hover:pointer-events-auto transition-opacity duration-300">
                    {type === 0 ? (
                      <span>
                        목걸이 → 추피 하, 적주피 상 <br /> 귀걸이 → 공 하, 무공
                        상 <br />
                        반지 → 치적 하, 치피 상
                      </span>
                    ) : (
                      <span>
                        목걸이 → 아덴+ 하, 낙인력 상 <br /> 귀걸이 → 무공% 하,
                        무공+ 상 <br />
                        반지 → 아공강 하, 아피강 상
                      </span>
                    )}
                  </div>
                </div>
                <button
                  className="hover:bg-[#953fb2] hover:border-[#781f96] presetBtm"
                  onClick={() => setOption("selVal1", "2", "selVal2", null)}
                >
                  중단일
                </button>
                <button
                  className="hover:bg-[#953fb2] hover:border-[#781f96] presetBtm"
                  onClick={() => setOption("selVal1", "2", "selVal2", "2")}
                >
                  중 중
                </button>

                <div className=" group relative flex justify-center">
                  <button
                    className="hover:bg-[#953fb2] hover:border-[#781f96] presetBtm"
                    onClick={() => setOption("selVal1", "2", "selVal2", "3")}
                  >
                    중 상
                  </button>
                  <div className="absolute z-20 top-full w-[250%] px-3 py-2 bg-gray-800 text-white size-font-xxxs rounded shadow-lg opacity-0 visibility-hidden pointer-events-none group-hover:opacity-100 group-hover:visibility-visible group-hover:pointer-events-auto transition-opacity duration-300">
                    {type === 0 ? (
                      <span>
                        목걸이 → 추피 중, 적주피 상 <br /> 귀걸이 → 공 중, 무공
                        상 <br />
                        반지 → 치적 중, 치피 상
                      </span>
                    ) : (
                      <span>
                        목걸이 → 아덴+ 중, 낙인력 상 <br /> 귀걸이 → 무공% 중,
                        무공+ 상 <br />
                        반지 → 아공강 중, 아피강 상
                      </span>
                    )}
                  </div>
                </div>
                <div className=" group relative flex justify-center">
                  <button
                    className="hover:bg-[#953fb2] hover:border-[#781f96] presetBtm"
                    onClick={() => setOption("selVal1", "2", "selVal2", "1")}
                  >
                    중 하
                  </button>
                  <div className="absolute z-20 top-full w-[250%] px-3 py-2 bg-gray-800 text-white size-font-xxxs rounded shadow-lg opacity-0 visibility-hidden pointer-events-none group-hover:opacity-100 group-hover:visibility-visible group-hover:pointer-events-auto transition-opacity duration-300">
                    {type === 0 ? (
                      <span>
                        목걸이 → 추피 중, 적주피 하 <br /> 귀걸이 → 공 중, 무공
                        하 <br />
                        반지 → 치적 중, 치피 하
                      </span>
                    ) : (
                      <span>
                        목걸이 → 아덴+ 중, 낙인력 하 <br /> 귀걸이 → 무공% 중,
                        무공+ 하 <br />
                        반지 → 아공강 중, 아피강 하
                      </span>
                    )}
                  </div>
                </div>
                <div className=" group relative flex justify-center">
                  <button
                    className="hover:bg-[#2f5a9b] hover:border-[#0a3981] presetBtm"
                    onClick={() => setOption("selVal1", "1", "selVal2", "2")}
                  >
                    하 중
                  </button>
                  <div className="absolute z-20 top-full w-[250%] px-3 py-2 bg-gray-800 text-white size-font-xxxs rounded shadow-lg opacity-0 visibility-hidden pointer-events-none group-hover:opacity-100 group-hover:visibility-visible group-hover:pointer-events-auto transition-opacity duration-300">
                    {type === 0 ? (
                      <span>
                        목걸이 → 추피 하, 적주피 중 <br /> 귀걸이 → 공 하, 무공
                        중 <br />
                        반지 → 치적 하, 치피 중
                      </span>
                    ) : (
                      <span>
                        목걸이 → 아덴+ 하, 낙인력 중 <br /> 귀걸이 → 무공% 하,
                        무공+ 중 <br />
                        반지 → 아공강 하, 아피강 중
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-4 pr-4">
              <div className="border-b-[3px] pb-1 border-[#40ac8d] w-[95%] mx-auto text-[#40ac8d] size-font-xxs mb-2">
                공용옵션 선택
              </div>
              <div className="grid grid-rows-2 grid-cols-4 h-20">
                <button
                  className="hover:bg-[#40ac8d] hover:text-white border border-[#40ac8d] presetBtm"
                  onClick={() => setGrade("selVal3", "3")}
                >
                  공용 상
                </button>
                <button
                  className="hover:bg-[#40ac8d] hover:text-white border border-[#40ac8d] presetBtm"
                  onClick={() => setGrade("selVal3", "2")}
                >
                  공용 중
                </button>
                <button
                  className="hover:bg-[#40ac8d] hover:text-white border border-[#40ac8d] presetBtm"
                  onClick={() => setGrade("selVal3", "1")}
                >
                  공용 하
                </button>
                <select
                  onClick={(e) =>
                    setGrade(
                      "upgradeLevel",
                      e.target.value === "" ? null : e.target.value
                    )
                  }
                  className="mx-auto my-2 h-8 text-xs text-center text-gray-500 bgWtoB rounded-2xl border-[#566863] border bg-[#F5F5F5]"
                >
                  <option value="" disabled selected>
                    연마 단계 선택
                  </option>
                  <option value="">모든 단계</option>
                  <option value="1">1단계</option>
                  <option value="2">2단계</option>
                  <option value="3">3단계</option>
                </select>
                <button
                  className="hover:bg-[#40ac8d] hover:text-white border border-[#40ac8d] presetBtm"
                  onClick={() =>
                    type === 0
                      ? setGrade("selOpt3", "53")
                      : setGrade("selOpt3", "55")
                  }
                >
                  {type === 0 ? (
                    <p className="text-sm font-bold">공용 공+</p>
                  ) : (
                    <p className="text-sm font-bold">공용 최생</p>
                  )}
                </button>
                <button
                  className={`hover:bg-[#40ac8d] hover:text-white border border-[#40ac8d] presetBtm`}
                  onClick={() =>
                    type === 0
                      ? setGrade("selOpt3", "54")
                      : setGrade("selOpt3", "56")
                  }
                >
                  {type === 0 ? (
                    <p className="text-sm font-bold">공용 무공</p>
                  ) : (
                    <p className="text-sm font-bold">공용 최마</p>
                  )}
                </button>
                <button
                  className="hover:bg-[#566863] hover:text-white border border-[#566863] presetBtm"
                  onClick={() => setGrade("selOpt3", null)}
                >
                  일괄제거
                </button>
                <select
                  onClick={(e) =>
                    setGrade(
                      "trdCnt",
                      e.target.value === "" ? null : e.target.value
                    )
                  }
                  className="mx-auto my-2 h-8 text-xs text-center text-gray-500 bgWtoB rounded-2xl border-[#566863] border bg-[#F5F5F5]"
                >
                  <option value="" disabled selected>
                    거래 횟수 선택
                  </option>
                  <option value="">모든 횟수</option>
                  <option value="0">0회</option>
                  <option value="1">1회</option>
                  <option value="2">2회</option>
                </select>
              </div>
            </div>

            {/* 프리셋 저장 */}
            <div className="h-24 col-span-10 my-auto px-6 py-2 bg-[#e0dedf] dark:bg-[#1e1d1f] rounded-2xl inset-shadow-sm shadow-inset-indigo">
              <div className="h-1/2 flex items-center justify-between size-font-xxs">
                <span>개인 저장 프리셋 </span>

                <div className="flex items-center">
                  <div className="flex items-center mr-2 h-full group relative">
                    <BsFillQuestionCircleFill className=" h-4" />
                    <div className="absolute z-50 bottom-8 w-[2800%] px-3 py-2 bg-gray-800 text-white size-font-xxxs rounded shadow-lg opacity-0 visibility-hidden pointer-events-none group-hover:opacity-100 group-hover:visibility-visible group-hover:pointer-events-auto transition-opacity duration-300">
                      🛑주의🛑 저장 위치를 가장 먼저 선택해주세요 <br />
                      주황색 버튼 클릭시 선택한 프리셋을 공유할 수 있는 코드가
                      복사됩니다.
                      <br />
                      <br />
                      저장 위치를 선택한 뒤에 공유받은 코드를 붙여놓고 저장을
                      눌러주세요
                      <br /> 선택한 위치에 공유받은 프리셋이 저장됩니다.
                    </div>
                  </div>
                  <button
                    className="scaleBtm"
                    onClick={() => {
                      exportPreset(presetSelectValue);
                    }}
                    disabled={presetSelectValue === "-1"}
                  >
                    <img src={shareBtm} className="h-6" />
                  </button>
                  <select
                    value={presetSelectValue || ""}
                    onChange={(e) => setPresetSelectValue(e.target.value)}
                    className="text-sm mr-2 text-center h-6 rounded-lg border-black border bg-[#F5F5F5] dark:bg-[#2A2A2A]"
                  >
                    <option value="-1">저장 위치 선택</option>
                    {presetSlots.map((presetSlot, index) => (
                      <option value={index}>{presetSlot?.name}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="공유 받은 코드 입력"
                    className="w-36 h-6  text-sm text-center border-[#68afb4] dark:border-[#4ab0b6] border bgWtoB rounded-l-xl"
                    onChange={(e) => setPresetCode(e.target.value)}
                    value={presetCode}
                    disabled={presetSelectValue === "-1"}
                  />
                  <button
                    className="w-16 h-6 text-sm px-2 text-white dark:text-black bg-[#68afb4] border-[#68afb4] dark:border-[#4ab0b6] rounded-r-xl font-bold transition duration-700 ease-in-out hover:bg-black  hover:border-black"
                    onClick={async () => {
                      await savePresetCodeSlot(presetSelectValue, presetCode);
                      loadPresetSlot(presetSelectValue);
                      loadPreset();
                    }}
                  >
                    저장
                  </button>
                </div>
              </div>
              <div className="h-1/2 flex items-center">
                <div className="w-[30%] grid grid-cols-10 h-6">
                  <div className=" h-full group relative">
                    <BsFillQuestionCircleFill className="self-end h-6" />
                    <div className="absolute z-50 bottom-8 w-[1500%] px-3 py-2 bg-gray-800 text-white size-font-xxxs rounded shadow-lg opacity-0 visibility-hidden pointer-events-none group-hover:opacity-100 group-hover:visibility-visible group-hover:pointer-events-auto transition-opacity duration-300">
                      🛑주의🛑 저장 위치를 가장 먼저 선택해주세요 <br />
                      <br />
                      저장 위치를 선택한 뒤에 이름을 쓰고 저장을 누르면
                      <br /> 다시 사이트에 접속해도 골라둔 옵션을 쉽게 불러올 수
                      있어요
                    </div>
                  </div>
                  <div className="col-span-4 flex items-center">
                    <select
                      value={presetSelectValue || ""}
                      onChange={(e) => setPresetSelectValue(e.target.value)}
                      className="text-center h-full rounded-lg border-black border dark:border-white bg-[#F5F5F5] dark:bg-[#2A2A2A]"
                    >
                      <option value="-1">저장 위치 선택</option>
                      {presetSlots.map((presetSlot, index) => (
                        <option value={index}>{presetSlot?.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-3 flex items-center">
                    <input
                      type="text"
                      placeholder="이름 (1~8자)"
                      className="w-full h-full text-center border-[#2383bd] dark:border-[#3ea3dd] border bgWtoB rounded-l-xl"
                      onChange={(e) => setPresetName(e.target.value)}
                      value={presetName}
                      disabled={presetSelectValue === "-1"}
                      maxLength={8}
                    />
                  </div>
                  <div className="col-span-2 flex items-center">
                    <button
                      className="group relative w-full h-full text-white dark:text-black bg-[#2383bd] dark:bg-[#3ea3dd]  border border-[#2383bd] dark:border-[#3ea3dd] rounded-r-xl font-bold transition duration-700 ease-in-out hover:bg-black dark:hover:bg-white hover:border-black dark:hover:border-white"
                      onClick={() => {
                        savePresetSlot(presetSelectValue, presetName);
                        loadPreset();
                      }}
                      disabled={
                        presetName.length < 2 && presetSelectValue === "-1"
                      }
                    >
                      저장
                      <div
                        className={`absolute z-50 bottom-8 w-[300%] px-3 py-2 bg-gray-800 dark:bg-gray-200 text-white dark:text-black size-font-xxxs rounded shadow-lg opacity-0 visibility-hidden pointer-events-none  ${
                          presetName.length < 2
                            ? "group-hover:opacity-100 group-hover:visibility-visible group-hover:pointer-events-auto"
                            : ""
                        }  transition-opacity duration-300`}
                      >
                        이름을 정해주세요
                      </div>
                    </button>
                  </div>
                </div>

                <div className="w-[70%] grid grid-cols-5 flex h-8">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="flex items-center">
                      <button
                        className="w-4/5 mx-auto text-sm text-gray-500 dark:text-gray-400 font-bold hover:underline presetBtm"
                        onClick={() => {
                          loadPresetSlot(index);
                          setPresetName(presetSlots[index].name);
                          setPresetSelectValue(index + "");
                        }}
                      >
                        {presetSlots[index]?.name || `${index + 1}`}
                      </button>
                      {index < 4 && (
                        <span className="px-2 text-[4px] text-gray-400">●</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllSelectPresetComp;
