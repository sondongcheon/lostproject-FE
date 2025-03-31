import React, { useEffect, useState } from "react";

const AllSelectPresetComp = ({ updateSet, type }) => {
  const [sliderValue, setSliderValue] = useState(67);
  const [sliderStatValue, setSliderStatValue] = useState(10);
  const [options, setOptions] = useState({});

  const setGrade = (key, value) => {
    updateSet.forEach((updateOption) => {
      updateOption(key, value);
    });
  };

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
      <div className="shadow-lg border-2 rounded-3xl bg-[#F5F5F5] pt-4 pb-4">
        <div className="py-2">
          <div className="w-full flex justify-center items-center ">
            <button className=" resetBtm text-center size-font-xl bg-[#b2ddad]" onClick={setReset}>
              초기화
            </button>
          </div>
          <div className="grid grid-cols-4 justify-center items-center p-4">
            <span className="col-span-1 text-sm text-center font-bold">품질</span>
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
              className="slider col-span-2 w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="col-span-1  text-center text-sm text-gray-500">
              <input
                className="w-1/2 text-center rounded-3xl border border-gray-300"
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
          <div className="grid grid-cols-4 justify-center items-center p-4">
            <span className="col-span-1 text-xs text-center font-bold">힘민지%</span>
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
              className="slider col-span-2 w-full  h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="col-span-1  text-center text-sm text-gray-500">
              <input
                className="w-1/2 text-center rounded-3xl border border-gray-300"
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

        <div className="text-[8px] mb-4 font-bold pl-2 pr-4">
          <div>
            <div className="border-b-[3px] pb-1 border-[#2384bc] w-[75%] mx-auto text-[#2384bc]  font-bold size-font-2xl mb-2">
              등급 선택
            </div>
            <div className="grid grid-cols-2 h-20 gap-x-12 px-8">
              <button
                className="w-full mx-auto bg-[#e95a04] text-white border border-[#d75101] my-2 h-8  rounded-2xl font-bold size-font-xl presetBtm"
                onClick={() => setGrade("itemGrade", "유물")}
              >
                All 유물
              </button>
              <button
                className="w-full mx-auto bg-[#ddb300] text-white border border-[#c9a302] my-2 h-8 border rounded-2xl font-bold size-font-xl  presetBtm"
                onClick={() => setGrade("itemGrade", "고대")}
              >
                All 고대
              </button>
            </div>
          </div>

          <div className="">
            <div className="border-b-[3px] pb-1 border-gray-500 text-gray-500 w-[95%] font-bold size-font-2xl mx-auto mb-2">
              연마등급 일괄선택
            </div>
            <div className="grid grid-rows-2 grid-cols-5 gap-x-4 h-20">
              <button
                className="w-full mx-auto bg-white text-gray-500 hover:bg-[#e38e49] hover:text-white border border-gray-500 hover:border-[#da7c2f] my-2 h-8 rounded-2xl font-bold  presetBtm"
                onClick={() => setOption("selectValue1", "3", "selectValue2", null)}
              >
                상단일
              </button>

              <button
                className="w-full mx-auto bg-white text-gray-500 hover:bg-[#e38e49] hover:text-white border border-gray-500 hover:border-[#da7c2f] my-2 h-8 rounded-2xl font-bold  presetBtm"
                onClick={() => setOption("selectValue1", "3", "selectValue2", "3")}
              >
                상 상
              </button>
              <div className=" group relative flex justify-center">
                <button
                  className="w-full mx-auto bg-white text-gray-500 hover:bg-[#e38e49] hover:text-white border border-gray-500 hover:border-[#da7c2f] my-2 h-8 rounded-2xl font-bold  presetBtm"
                  onClick={() => setOption("selectValue1", "3", "selectValue2", "2")}
                >
                  상 중
                </button>
                <div className="absolute z-20 bottom-8 w-[200%] px-3 py-2 bg-gray-800 text-white size-font-xxxs rounded shadow-lg opacity-0 visibility-hidden pointer-events-none group-hover:opacity-100 group-hover:visibility-visible group-hover:pointer-events-auto transition-opacity duration-300">
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
                  className="w-full mx-auto bg-white text-gray-500 hover:bg-[#e38e49] hover:text-white border border-gray-500 hover:border-[#da7c2f] my-2 h-8 rounded-2xl font-bold  presetBtm"
                  onClick={() => setOption("selectValue1", "3", "selectValue2", "1")}
                >
                  상 하
                </button>
                <div className="absolute z-20 bottom-8 w-[200%] px-3 py-2 bg-gray-800 text-white size-font-xxxs rounded shadow-lg opacity-0 visibility-hidden pointer-events-none group-hover:opacity-100 group-hover:visibility-visible group-hover:pointer-events-auto transition-opacity duration-300">
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
                  className="w-full mx-auto bg-white text-gray-500 hover:bg-[#2f5a9b] hover:text-white border border-gray-500 hover:border-[#0a3981] my-2 h-8 rounded-2xl font-bold  presetBtm"
                  onClick={() => setOption("selectValue1", "1", "selectValue2", "3")}
                >
                  하 상
                </button>
                <div className="absolute z-20 bottom-8 right-0 w-[200%] px-3 py-2 bg-gray-800 text-white size-font-xxxs rounded shadow-lg opacity-0 visibility-hidden pointer-events-none group-hover:opacity-100 group-hover:visibility-visible group-hover:pointer-events-auto transition-opacity duration-300">
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
                className="w-full mx-auto bg-white text-gray-500 hover:bg-[#953fb2] hover:text-white border border-gray-500 hover:border-[#781f96] my-2 h-8 rounded-2xl font-bold  presetBtm"
                onClick={() => setOption("selectValue1", "2", "selectValue2", null)}
              >
                중단일
              </button>
              <button
                className="w-full mx-auto bg-white text-gray-500 hover:bg-[#953fb2] hover:text-white border border-gray-500 hover:border-[#781f96] my-2 h-8 rounded-2xl font-bold  presetBtm"
                onClick={() => setOption("selectValue1", "2", "selectValue2", "2")}
              >
                중 중
              </button>

              <div className=" group relative flex justify-center">
                <button
                  className="w-full mx-auto bg-white text-gray-500 hover:bg-[#953fb2] hover:text-white border border-gray-500 hover:border-[#781f96] my-2 h-8 rounded-2xl font-bold  presetBtm"
                  onClick={() => setOption("selectValue1", "2", "selectValue2", "3")}
                >
                  중 상
                </button>
                <div className="absolute z-20 top-full w-[200%] px-3 py-2 bg-gray-800 text-white size-font-xxxs rounded shadow-lg opacity-0 visibility-hidden pointer-events-none group-hover:opacity-100 group-hover:visibility-visible group-hover:pointer-events-auto transition-opacity duration-300">
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
                  className="w-full mx-auto bg-white text-gray-500 hover:bg-[#953fb2] hover:text-white border border-gray-500 hover:border-[#781f96] my-2 h-8 rounded-2xl font-bold  presetBtm"
                  onClick={() => setOption("selectValue1", "2", "selectValue2", "1")}
                >
                  중 하
                </button>
                <div className="absolute z-20 top-full w-[200%] px-3 py-2 bg-gray-800 text-white size-font-xxxs rounded shadow-lg opacity-0 visibility-hidden pointer-events-none group-hover:opacity-100 group-hover:visibility-visible group-hover:pointer-events-auto transition-opacity duration-300">
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
                  className="w-full mx-auto bg-white text-gray-500 hover:bg-[#2f5a9b] hover:text-white border border-gray-500 hover:border-[#0a3981] my-2 h-8 rounded-2xl font-bold  presetBtm"
                  onClick={() => setOption("selectValue1", "1", "selectValue2", "2")}
                >
                  하 중
                </button>
                <div className="absolute z-20 top-full right-0 w-[200%] px-3 py-2 bg-gray-800 text-white size-font-xxxs rounded shadow-lg opacity-0 visibility-hidden pointer-events-none group-hover:opacity-100 group-hover:visibility-visible group-hover:pointer-events-auto transition-opacity duration-300">
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
        </div>
        <div className="">
          <div className="border-b-[3px] pb-1 border-[#40ac8d] w-[95%] mx-auto text-[#40ac8d] font-bold size-font-2xl mb-2">
            공용옵션 선택
          </div>
          <div className="grid grid-rows-2 grid-cols-3 gap-x-4 px-2 h-20">
            <button
              className="w-full mx-auto bg-white text-gray-500 hover:bg-[#40ac8d] hover:text-white border border-[#40ac8d] my-2 h-8 rounded-2xl font-bold  presetBtm"
              onClick={() => setGrade("selectValue3", "3")}
            >
              공용 상
            </button>
            <button
              className="w-full mx-auto bg-white text-gray-500 hover:bg-[#40ac8d] hover:text-white border border-[#40ac8d] my-2 h-8 rounded-2xl font-bold  presetBtm"
              onClick={() => setGrade("selectValue3", "2")}
            >
              공용 중
            </button>
            <button
              className="w-full mx-auto bg-white text-gray-500 hover:bg-[#40ac8d] hover:text-white border border-[#40ac8d] my-2 h-8 rounded-2xl font-bold  presetBtm"
              onClick={() => setGrade("selectValue3", "1")}
            >
              공용 하
            </button>
            <button
              className="w-full mx-auto bg-white text-gray-500 hover:bg-[#40ac8d] hover:text-white border border-[#40ac8d] my-2 h-8 rounded-2xl font-bold  presetBtm"
              onClick={(type) =>
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
              className={`w-full mx-auto bg-white text-gray-500 hover:bg-[#40ac8d] hover:text-white border border-[#40ac8d] my-2 h-8 rounded-2xl font-bold  presetBtm`}
              onClick={(type) =>
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
              className="w-full mx-auto bg-white text-gray-500 hover:bg-[#566863] hover:text-white border border-[#566863] my-2 h-8 rounded-2xl font-bold  presetBtm"
              onClick={() => setGrade("selectOption3", null)}
            >
              일괄제거
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllSelectPresetComp;
