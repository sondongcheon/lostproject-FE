import React, { useEffect, useState } from "react";

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
      name: 1,
    },
    {
      name: 2,
    },
    {
      name: 3,
    },
    {
      name: 4,
    },
    {
      name: 5,
    },
  ]);

  const exportPreset = (index) => {
    const preset = JSON.parse(localStorage.getItem("presetSlots" + (type === 0 ? "Del" : "Sup")));

    const presetString = JSON.stringify(preset[index]);
    console.log(presetString);
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
    const stored = JSON.parse(localStorage.getItem("presetSlots" + (type === 0 ? "Del" : "Sup")));

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
        selectOption1: ["41", "45", "45", "49", "49"],
        selectOption2: ["42", "46", "46", "50", "50"],
      });
    } else if (type === 1) {
      setOptions({
        selectOption1: ["43", "46", "46", "51", "51"],
        selectOption2: ["44", "54", "54", "52", "52"],
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
        updateOption("selectOption2", null);
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
      updateOption("tradeAllowCount", null);
    });
    updateSet.forEach((updateOption) => {
      updateOption("selectOption1", null);
    });
    updateSet.forEach((updateOption) => {
      updateOption("selectValue1", null);
    });
    updateSet.forEach((updateOption) => {
      updateOption("selectOption2", null);
    });
    updateSet.forEach((updateOption) => {
      updateOption("selectValue2", null);
    });
    updateSet.forEach((updateOption, index) => {
      updateOption("selectOption3", null);
    });
    updateSet.forEach((updateOption) => {
      updateOption("selectValue3", null);
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
        <div className="h-72 w-full flex shadow-lg border-2 rounded-3xl bg-[#F5F5F5] ">
          <div className="w-[25%] grid grid-rows-4 gap-y-2 py-2 ">
            <div className=" overflow-hidden">
              {apiKey === "" || !apiKey ? (
                <div className="flex animate-marquee-loop whitespace-nowrap relative w-full h-full flex items-center overflow-hidden text-sm text-red-500 font-bold">
                  <span className="mr-10">
                    🚨 API Key가 입력되지 않았습니다 🚨 공용키가 사용되어 검색되므로 분당 횟수
                    초과가 일어날 확률이 높습니다.
                  </span>
                  <span>
                    🚨 API Key가 입력되지 않았습니다 🚨 공용키가 사용되어 검색되므로 분당 횟수
                    초과가 일어날 확률이 높습니다.
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
              <button className="w-1/3 resetBtm bg-[#b2ddad]" onClick={setReset}>
                초기화
              </button>

              <div className="w-1/3 h-full flex justify-center items-center ">
                <button
                  className="w-full h-full bg-[#40AC8D] resetBtm"
                  onClick={search}
                  disabled={searchState}
                >
                  {searchState ? (
                    <div className="h-full bg-[url('./Assets/loading.webp')] bg-contain bg-center bg-no-repeat">
                      {" "}
                    </div>
                  ) : (
                    "검색하기"
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
                  className="w-2/3 h-[28px] text-center rounded-3xl border border-gray-300"
                  placeholder="미지정"
                  type="number"
                  min="0"
                  max="100"
                  value={sliderValue}
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    setSliderValue(value); // 로컬 상태 업데이트
                    setGrade("quality", isNaN(value) ? null : Math.min(100, Math.max(0, value)));
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
                  className="w-2/3 h-[28px] text-center rounded-3xl border border-gray-300"
                  placeholder="미지정"
                  type="number"
                  min="0"
                  max="100"
                  value={sliderStatValue}
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    setSliderStatValue(value); // 로컬 상태 업데이트
                    setGrade("statPer", isNaN(value) ? null : Math.min(100, Math.max(0, value)));
                  }}
                />
                {/* {sliderValue === 0 ? "미지정" : sliderValue} */}
              </div>
            </div>
          </div>
          <div className="w-[75%] mr-8 flex grid grid-cols-9 items-center text-sm font-bold">
            <div>
              <div className="border-b-[3px] pb-1 border-[#2384bc] w-[75%] mx-auto text-[#2384bc] size-font-xxs mb-2">
                등급 선택
              </div>
              <div className="grid grid-rows-2 h-20">
                <button
                  className="w-[95px] mx-auto bg-[#e95a04] text-white border border-[#d75101] my-2 h-8  rounded-2xl font-bold  presetBtm"
                  onClick={() => setGrade("itemGrade", "유물")}
                >
                  All 유물
                </button>
                <button
                  className="w-[95px] mx-auto bg-[#ddb300] text-white border border-[#c9a302] my-2 h-8 border rounded-2xl font-bold  presetBtm"
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
                  className="w-[95px] mx-auto bg-white text-gray-500 hover:bg-[#e38e49] hover:text-white border border-gray-500 hover:border-[#da7c2f] my-2 h-8 rounded-2xl font-bold  presetBtm"
                  onClick={() => setOption("selectValue1", "3", "selectValue2", null)}
                >
                  상단일
                </button>

                <button
                  className="w-[95px] mx-auto bg-white text-gray-500 hover:bg-[#e38e49] hover:text-white border border-gray-500 hover:border-[#da7c2f] my-2 h-8 rounded-2xl font-bold  presetBtm"
                  onClick={() => setOption("selectValue1", "3", "selectValue2", "3")}
                >
                  상 상
                </button>
                <div className=" group relative flex justify-center">
                  <button
                    className="w-[95px] mx-auto bg-white text-gray-500 hover:bg-[#e38e49] hover:text-white border border-gray-500 hover:border-[#da7c2f] my-2 h-8 rounded-2xl font-bold  presetBtm"
                    onClick={() => setOption("selectValue1", "3", "selectValue2", "2")}
                  >
                    상 중
                  </button>
                  <div className="absolute z-20 bottom-8 w-[250%] px-3 py-2 bg-gray-800 text-white size-font-xxxs rounded shadow-lg opacity-0 visibility-hidden pointer-events-none group-hover:opacity-100 group-hover:visibility-visible group-hover:pointer-events-auto transition-opacity duration-300">
                    {type === 0 ? (
                      <span>
                        목걸이 → 추피 상, 적주피 중 <br /> 귀걸이 → 공 상, 무공 중 <br />
                        반지 → 치적 상, 치피 중
                      </span>
                    ) : (
                      <span>
                        목걸이 → 아덴+ 상, 낙인력 중 <br /> 귀걸이 → 무공% 상, 무공+ 중 <br />
                        반지 → 아공강 상, 아피강 중
                      </span>
                    )}
                  </div>
                </div>
                <div className=" group relative flex justify-center">
                  <button
                    className="w-[95px] mx-auto bg-white text-gray-500 hover:bg-[#e38e49] hover:text-white border border-gray-500 hover:border-[#da7c2f] my-2 h-8 rounded-2xl font-bold  presetBtm"
                    onClick={() => setOption("selectValue1", "3", "selectValue2", "1")}
                  >
                    상 하
                  </button>
                  <div className="absolute z-20 bottom-8 w-[250%] px-3 py-2 bg-gray-800 text-white size-font-xxxs rounded shadow-lg opacity-0 visibility-hidden pointer-events-none group-hover:opacity-100 group-hover:visibility-visible group-hover:pointer-events-auto transition-opacity duration-300">
                    {type === 0 ? (
                      <span>
                        목걸이 → 추피 상, 적주피 하 <br /> 귀걸이 → 공 상, 무공 하 <br />
                        반지 → 치적 상, 치피 중
                      </span>
                    ) : (
                      <span>
                        목걸이 → 아덴+ 상, 낙인력 하 <br /> 귀걸이 → 무공% 상, 무공+ 하 <br />
                        반지 → 아공강 상, 아피강 하
                      </span>
                    )}
                  </div>
                </div>

                <div className=" group relative flex justify-center">
                  <button
                    className="w-[95px] mx-auto bg-white text-gray-500 hover:bg-[#2f5a9b] hover:text-white border border-gray-500 hover:border-[#0a3981] my-2 h-8 rounded-2xl font-bold  presetBtm"
                    onClick={() => setOption("selectValue1", "1", "selectValue2", "3")}
                  >
                    하 상
                  </button>
                  <div className="absolute z-20 bottom-8 w-[250%] px-3 py-2 bg-gray-800 text-white size-font-xxxs rounded shadow-lg opacity-0 visibility-hidden pointer-events-none group-hover:opacity-100 group-hover:visibility-visible group-hover:pointer-events-auto transition-opacity duration-300">
                    {type === 0 ? (
                      <span>
                        목걸이 → 추피 하, 적주피 상 <br /> 귀걸이 → 공 하, 무공 상 <br />
                        반지 → 치적 하, 치피 상
                      </span>
                    ) : (
                      <span>
                        목걸이 → 아덴+ 하, 낙인력 상 <br /> 귀걸이 → 무공% 하, 무공+ 상 <br />
                        반지 → 아공강 하, 아피강 상
                      </span>
                    )}
                  </div>
                </div>
                <button
                  className="w-[95px] mx-auto bg-white text-gray-500 hover:bg-[#953fb2] hover:text-white border border-gray-500 hover:border-[#781f96] my-2 h-8 rounded-2xl font-bold  presetBtm"
                  onClick={() => setOption("selectValue1", "2", "selectValue2", null)}
                >
                  중단일
                </button>
                <button
                  className="w-[95px] mx-auto bg-white text-gray-500 hover:bg-[#953fb2] hover:text-white border border-gray-500 hover:border-[#781f96] my-2 h-8 rounded-2xl font-bold  presetBtm"
                  onClick={() => setOption("selectValue1", "2", "selectValue2", "2")}
                >
                  중 중
                </button>

                <div className=" group relative flex justify-center">
                  <button
                    className="w-[95px] mx-auto bg-white text-gray-500 hover:bg-[#953fb2] hover:text-white border border-gray-500 hover:border-[#781f96] my-2 h-8 rounded-2xl font-bold  presetBtm"
                    onClick={() => setOption("selectValue1", "2", "selectValue2", "3")}
                  >
                    중 상
                  </button>
                  <div className="absolute z-20 top-full w-[250%] px-3 py-2 bg-gray-800 text-white size-font-xxxs rounded shadow-lg opacity-0 visibility-hidden pointer-events-none group-hover:opacity-100 group-hover:visibility-visible group-hover:pointer-events-auto transition-opacity duration-300">
                    {type === 0 ? (
                      <span>
                        목걸이 → 추피 중, 적주피 상 <br /> 귀걸이 → 공 중, 무공 상 <br />
                        반지 → 치적 중, 치피 상
                      </span>
                    ) : (
                      <span>
                        목걸이 → 아덴+ 중, 낙인력 상 <br /> 귀걸이 → 무공% 중, 무공+ 상 <br />
                        반지 → 아공강 중, 아피강 상
                      </span>
                    )}
                  </div>
                </div>
                <div className=" group relative flex justify-center">
                  <button
                    className="w-[95px] mx-auto bg-white text-gray-500 hover:bg-[#953fb2] hover:text-white border border-gray-500 hover:border-[#781f96] my-2 h-8 rounded-2xl font-bold  presetBtm"
                    onClick={() => setOption("selectValue1", "2", "selectValue2", "1")}
                  >
                    중 하
                  </button>
                  <div className="absolute z-20 top-full w-[250%] px-3 py-2 bg-gray-800 text-white size-font-xxxs rounded shadow-lg opacity-0 visibility-hidden pointer-events-none group-hover:opacity-100 group-hover:visibility-visible group-hover:pointer-events-auto transition-opacity duration-300">
                    {type === 0 ? (
                      <span>
                        목걸이 → 추피 중, 적주피 하 <br /> 귀걸이 → 공 중, 무공 하 <br />
                        반지 → 치적 중, 치피 하
                      </span>
                    ) : (
                      <span>
                        목걸이 → 아덴+ 중, 낙인력 하 <br /> 귀걸이 → 무공% 중, 무공+ 하 <br />
                        반지 → 아공강 중, 아피강 하
                      </span>
                    )}
                  </div>
                </div>
                <div className=" group relative flex justify-center">
                  <button
                    className="w-[95px] mx-auto bg-white text-gray-500 hover:bg-[#2f5a9b] hover:text-white border border-gray-500 hover:border-[#0a3981] my-2 h-8 rounded-2xl font-bold  presetBtm"
                    onClick={() => setOption("selectValue1", "1", "selectValue2", "2")}
                  >
                    하 중
                  </button>
                  <div className="absolute z-20 top-full w-[250%] px-3 py-2 bg-gray-800 text-white size-font-xxxs rounded shadow-lg opacity-0 visibility-hidden pointer-events-none group-hover:opacity-100 group-hover:visibility-visible group-hover:pointer-events-auto transition-opacity duration-300">
                    {type === 0 ? (
                      <span>
                        목걸이 → 추피 하, 적주피 중 <br /> 귀걸이 → 공 하, 무공 중 <br />
                        반지 → 치적 하, 치피 중
                      </span>
                    ) : (
                      <span>
                        목걸이 → 아덴+ 하, 낙인력 중 <br /> 귀걸이 → 무공% 하, 무공+ 중 <br />
                        반지 → 아공강 하, 아피강 중
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-3 pr-4">
              <div className="border-b-[3px] pb-1 border-[#40ac8d] w-[95%] mx-auto text-[#40ac8d] size-font-xxs mb-2">
                공용옵션 선택
              </div>
              <div className="grid grid-rows-2 grid-cols-3 h-20">
                <button
                  className="w-[95px] mx-auto bg-white text-gray-500 hover:bg-[#40ac8d] hover:text-white border border-[#40ac8d] my-2 h-8 rounded-2xl font-bold  presetBtm"
                  onClick={() => setGrade("selectValue3", "3")}
                >
                  공용 상
                </button>
                <button
                  className="w-[95px] mx-auto bg-white text-gray-500 hover:bg-[#40ac8d] hover:text-white border border-[#40ac8d] my-2 h-8 rounded-2xl font-bold  presetBtm"
                  onClick={() => setGrade("selectValue3", "2")}
                >
                  공용 중
                </button>
                <button
                  className="w-[95px] mx-auto bg-white text-gray-500 hover:bg-[#40ac8d] hover:text-white border border-[#40ac8d] my-2 h-8 rounded-2xl font-bold  presetBtm"
                  onClick={() => setGrade("selectValue3", "1")}
                >
                  공용 하
                </button>
                <button
                  className="w-[95px] mx-auto bg-white text-gray-500 hover:bg-[#40ac8d] hover:text-white border border-[#40ac8d] my-2 h-8 rounded-2xl font-bold  presetBtm"
                  onClick={() =>
                    type === 0 ? setGrade("selectOption3", "53") : setGrade("selectOption3", "55")
                  }
                >
                  {type === 0 ? (
                    <p className="text-sm font-bold">공용 공+</p>
                  ) : (
                    <p className="text-sm font-bold">공용 최생</p>
                  )}
                </button>
                <button
                  className={`w-[95px] mx-auto bg-white text-gray-500 hover:bg-[#40ac8d] hover:text-white border border-[#40ac8d] my-2 h-8 rounded-2xl font-bold  presetBtm`}
                  onClick={() =>
                    type === 0 ? setGrade("selectOption3", "54") : setGrade("selectOption3", "56")
                  }
                >
                  {type === 0 ? (
                    <p className="text-sm font-bold">공용 무공</p>
                  ) : (
                    <p className="text-sm font-bold">공용 최마</p>
                  )}
                </button>
                <button
                  className="w-[95px] mx-auto bg-white text-gray-500 hover:bg-[#566863] hover:text-white border border-[#566863] my-2 h-8 rounded-2xl font-bold  presetBtm"
                  onClick={() => setGrade("selectOption3", null)}
                >
                  일괄제거
                </button>
              </div>
            </div>

            {/* 프리셋 저장 */}
            <div className="col-span-9 px-3">
              <div>
                <div className="border-b-[3px] pb-1 border-[#2384bc] text-[#2384bc] size-font-xxs mb-2">
                  개인 저장 프리셋
                </div>
                <div className="h-16 flex">
                  <div className="w-[40%] grid grid-cols-3">
                    <div className="grid grid-rows-2">
                      <select
                        value={presetSelectValue || ""}
                        onChange={(e) => setPresetSelectValue(e.target.value)}
                        className="text-center my-auto h-2/3 rounded-xl border-gray-400 border-2 bg-[#F5F5F5]"
                      >
                        <option value="-1">저장 위치 선택</option>
                        {presetSlots.map((presetSlot, index) => (
                          <option value={index}>{presetSlot?.name}</option>
                        ))}
                      </select>

                      <button
                        className=" mx-auto bg-[#68afb4] text-white border border-[#d75101] h-8 my-1 rounded-2xl font-bold  presetBtm"
                        onClick={() => {
                          exportPreset(presetSelectValue);
                        }}
                        disabled={presetSelectValue === "-1"}
                      >
                        선택값 추출하기
                      </button>
                    </div>
                    <div className="flex items-center grid grid-rows-2">
                      <input
                        type="text"
                        placeholder="이름 (1~8자)"
                        className="w-36 text-center border-red-500 border-2"
                        onChange={(e) => setPresetName(e.target.value)}
                        value={presetName}
                        disabled={presetSelectValue === "-1"}
                        maxLength={8}
                      />

                      <input
                        type="text"
                        placeholder="코드를 입력해주세요"
                        className="w-36 text-center border-red-500 border-2"
                        onChange={(e) => setPresetCode(e.target.value)}
                        value={presetCode}
                        disabled={presetSelectValue === "-1"}
                      />
                    </div>
                    <div className="grid grid-rows-2">
                      <button
                        className=" mx-auto bg-[#68afb4] text-white border border-[#d75101] h-8 my-1 rounded-2xl font-bold  presetBtm"
                        onClick={() => {
                          savePresetSlot(presetSelectValue, presetName);
                          loadPreset();
                        }}
                        disabled={presetName.length < 2}
                      >
                        현재 옵션 저장
                      </button>
                      <button
                        className=" mx-auto bg-[#68afb4] text-white border border-[#d75101] h-8 my-1  rounded-2xl font-bold  presetBtm"
                        onClick={() => {
                          savePresetCodeSlot(presetSelectValue, presetCode);
                          loadPreset();
                        }}
                      >
                        입력 코드 저장
                      </button>
                    </div>
                  </div>

                  <div className="w-[60%] grid grid-cols-4 flex h-full">
                    <button
                      className="w-[90%] mx-auto bg-white text-gray-500 hover:bg-[#e38e49] hover:text-white border border-gray-500 hover:border-[#da7c2f] my-1  h-8 rounded-2xl font-bold  presetBtm"
                      onClick={() => loadPresetSlot(0)}
                    >
                      {presetSlots[0]?.name || "1"}
                    </button>
                    <button
                      className="w-[90%] mx-auto bg-white text-gray-500 hover:bg-[#e38e49] hover:text-white border border-gray-500 hover:border-[#da7c2f] my-1  h-8 rounded-2xl font-bold  presetBtm"
                      onClick={() => loadPresetSlot(1)}
                    >
                      {presetSlots[1]?.name || "2"}
                    </button>

                    <button
                      className="w-[90%] mx-auto bg-white text-gray-500 hover:bg-[#e38e49] hover:text-white border border-gray-500 hover:border-[#da7c2f] my-1  h-8 rounded-2xl font-bold  presetBtm"
                      onClick={() => loadPresetSlot(2)}
                    >
                      {presetSlots[2]?.name || "3"}
                    </button>
                    <button
                      className="w-[90%] mx-auto bg-white text-gray-500 hover:bg-[#e38e49] hover:text-white border border-gray-500 hover:border-[#da7c2f] my-1  h-8 rounded-2xl font-bold  presetBtm"
                      onClick={() => loadPresetSlot(3)}
                    >
                      {presetSlots[3]?.name || "4"}
                    </button>
                    <button
                      className="w-[90%] mx-auto bg-white text-gray-500 hover:bg-[#e38e49] hover:text-white border border-gray-500 hover:border-[#da7c2f] my-1  h-8 rounded-2xl font-bold  presetBtm"
                      onClick={() => loadPresetSlot(4)}
                    >
                      {presetSlots[4]?.name || "5"}
                    </button>
                  </div>
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
