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
    setGrade("statPercentage", 10);
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
      updateOption("statPercentage", 10);
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
          <div className="text-[8px] text-center flex justify-center items-center ">
            <button className="resetBtm bg-[#b2ddad]" onClick={setReset}>
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
                setGrade("statPercentage", value === 0 ? null : value); // 부모에 값 전달
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
                  setGrade(
                    "statPercentage",
                    isNaN(value) ? null : Math.min(100, Math.max(0, value))
                  );
                }}
              />
              {/* {sliderValue === 0 ? "미지정" : sliderValue} */}
            </div>
          </div>
        </div>

        <div className="flex flex-1 grid grid-cols-4 text-[8px] mb-4 font-bold pl-2 pr-4">
          <div className="border-[#dd4407] border-2 m-3 h-16 rounded-lg text-center flex justify-center items-center ">
            <button
              className=" w-20 text-[#dd4407] text-[18px]"
              onClick={() => setGrade("itemGrade", "유물")}
            >
              All 유물
            </button>
          </div>
          <div className="border-[#ddb300] border-2 m-3 h-16 rounded-lg text-center flex justify-center items-center ">
            <button
              className=" w-20 text-[#ddb300] text-[18px]"
              onClick={() => setGrade("itemGrade", "고대")}
            >
              All 고대
            </button>
          </div>
          <div className="bg-[#E38E49] border-2 m-3 h-16 rounded-lg text-center flex justify-center items-center ">
            <button
              className="text-xs"
              onClick={() => setOption("selectValue1", "3", "selectValue2", null)}
            >
              <p className="text-sm text-white">상단일</p>
              일괄 선택
            </button>
          </div>
          <div className="bg-[#953fb2] border-2 m-3 h-16 rounded-lg text-center flex justify-center items-center">
            <button
              className="w-20 text-xs"
              onClick={() => setOption("selectValue1", "2", "selectValue2", null)}
            >
              <p className="text-sm text-white">중단일</p>
              일괄 선택
            </button>
          </div>

          <div className="col-span-3">
            <div className="grid grid-cols-3 border-[#E38E49] border-2 m-3 rounded-lg h-16">
              <div className=" text-center flex justify-center items-center">
                <button
                  className=" w-20 text-xs"
                  onClick={() => setOption("selectValue1", "3", "selectValue2", "3")}
                >
                  <p className="text-sm text-[#E38E49]">상 상</p>
                  일괄 선택
                </button>
              </div>
              <div className=" text-center flex justify-center items-center group relative">
                <button
                  className="w-28 border-dashed border-gray-400 border-x text-xs"
                  onClick={() => setOption("selectValue1", "3", "selectValue2", "2")}
                >
                  <span className="text-sm text-[#E38E49]">상 </span>
                  <span className="text-sm text-[#7E1891]">중 </span> <br />
                  일괄 선택
                </button>
                <div className="absolute z-10 top-full w-[250%] px-3 py-2 bg-gray-800 text-white size-font-xxxs rounded shadow-lg opacity-0 visibility-hidden pointer-events-none group-hover:opacity-100 group-hover:visibility-visible group-hover:pointer-events-auto transition-opacity duration-300">
                  목걸이 → 추피 상, 적주피 중 <br /> 귀걸이 → 공 상, 무공 중 <br />
                  반지 → 치적 상, 치피 중
                </div>
              </div>
              <div className=" text-center flex justify-center items-center group relative">
                <button
                  className=" w-20 text-xs"
                  onClick={() => setOption("selectValue1", "3", "selectValue2", "1")}
                >
                  <span className="text-sm font-bold text-[#E38E49]">상 </span>
                  <span className="text-sm font-bold text-[#0A3981]">하 </span>
                  <br />
                  일괄 선택
                </button>
                <div className="absolute z-10 top-full w-[250%] px-3 py-2 bg-gray-800 text-white size-font-xxxs rounded shadow-lg opacity-0 visibility-hidden pointer-events-none group-hover:opacity-100 group-hover:visibility-visible group-hover:pointer-events-auto transition-opacity duration-300">
                  목걸이 → 추피 상, 적주피 하 <br /> 귀걸이 → 공 상, 무공 하 <br />
                  반지 → 치적 상, 치피 하
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 border-[#7E1891] border-2 m-3 rounded-lg h-16">
              <div className="text-center flex justify-center items-center">
                <button
                  className=" w-20 text-xs"
                  onClick={() => setOption("selectValue1", "2", "selectValue2", "2")}
                >
                  <p className="text-sm  text-[#7E1891]">중 중</p>
                  일괄 선택
                </button>
              </div>
              <div className="text-center flex justify-center items-center group relative">
                <button
                  className="w-28 border-dashed border-gray-400 border-x text-xs"
                  onClick={() => setOption("selectValue1", "2", "selectValue2", "3")}
                >
                  <span className="text-sm text-[#7E1891]">중 </span>
                  <span className="text-sm text-[#E38E49]">상 </span> <br />
                  일괄 선택
                </button>
                <div className="absolute z-10 top-full w-[250%] px-3 py-2 bg-gray-800 text-white size-font-xxxs rounded shadow-lg opacity-0 visibility-hidden pointer-events-none group-hover:opacity-100 group-hover:visibility-visible group-hover:pointer-events-auto transition-opacity duration-300">
                  목걸이 → 추피 중, 적주피 상 <br /> 귀걸이 → 공 중, 무공 상 <br />
                  반지 → 치적 중, 치피 상
                </div>
              </div>
              <div className="text-center flex justify-center items-center group relative">
                <button
                  className=" w-20 text-xs"
                  onClick={() => setOption("selectValue1", "1", "selectValue2", "3")}
                >
                  <span className="text-sm text-[#0A3981]">하 </span>
                  <span className="text-sm text-[#E38E49]">상 </span>
                  <br />
                  일괄 선택
                </button>
                <div className="absolute z-10 top-full w-[250%] px-3 py-2 bg-gray-800 text-white size-font-xxxs rounded shadow-lg opacity-0 visibility-hidden pointer-events-none group-hover:opacity-100 group-hover:visibility-visible group-hover:pointer-events-auto transition-opacity duration-300">
                  목걸이 → 추피 하, 적주피 상 <br /> 귀걸이 → 공 하, 무공 상 <br />
                  반지 → 치적 하, 치피 상
                </div>
              </div>
            </div>
          </div>

          <div className="border-[#0A3981] border-2 rounded-lg m-2 h-36 grid grid-rows-2">
            <div className=" text-center flex justify-center items-center  group relative">
              <button
                className="border-b border-dashed border-gray-400 w-12 h-full text-xs"
                onClick={() => setOption("selectValue1", "2", "selectValue2", "1")}
              >
                <span className="text-sm text-[#7E1891]">중 </span>
                <span className="text-sm text-[#0A3981]">하 </span> <br />
                일괄 선택
              </button>
              <div className="absolute top-full w-[250%] px-3 py-2 bg-gray-800 text-white size-font-xxxs rounded shadow-lg opacity-0 visibility-hidden pointer-events-none group-hover:opacity-100 group-hover:visibility-visible group-hover:pointer-events-auto transition-opacity duration-300">
                목걸이 → 추피 중, 적주피 하 <br /> 귀걸이 → 공 중, 무공 하 <br />
                반지 → 치적 중, 치피 하
              </div>
            </div>
            <div className=" text-center flex justify-center items-center group relative">
              <button
                className=" w-20 text-xs"
                onClick={() => setOption("selectValue1", "1", "selectValue2", "2")}
              >
                <span className="text-sm text-[#0A3981]">하 </span>
                <span className="text-sm text-[#7E1891]">중 </span> <br />
                일괄 선택
              </button>
              <div className="absolute top-full w-[250%] px-3 py-2 bg-gray-800 text-white size-font-xxxs rounded shadow-lg opacity-0 visibility-hidden pointer-events-none group-hover:opacity-100 group-hover:visibility-visible group-hover:pointer-events-auto transition-opacity duration-300">
                목걸이 → 추피 하, 적주피 중 <br /> 귀걸이 → 공 하, 무공 중 <br />
                반지 → 치적 하, 치피 중
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="grid grid-cols-3 border-[#40AC8D] border-2 h-16 rounded-lg m-3">
            <div className="text-center flex justify-center items-center">
              <button className="  w-20 text-xs" onClick={() => setGrade("selectValue3", "3")}>
                <p className="text-sm  text-[#E38E49]">공용 상</p>
                일괄 선택
              </button>
            </div>
            <div className="text-center flex justify-center items-center">
              <button
                className="w-28 border-dashed border-gray-400 border-x  w-20 text-xs"
                onClick={() => setGrade("selectValue3", "2")}
              >
                <p className="text-sm  text-[#7E1891]">공용 중</p>
                일괄 선택
              </button>
            </div>
            <div className="text-center flex justify-center items-center">
              <button className=" w-20 text-xs" onClick={() => setGrade("selectValue3", "1")}>
                <p className="text-sm font-bold text-[#0A3981]">공용 하</p>
                일괄 선택
              </button>
            </div>
          </div>

          <div className="flex m-3">
            <div className="w-2/3 grid grid-cols-2 border-[#40AC8D] border-2 h-16 rounded-lg">
              <div className="text-center flex justify-center items-center">
                <button
                  className="w-28 border-dashed border-gray-400 border-r w-20 text-xs"
                  onClick={() => setGrade("selectOption3", "53")}
                >
                  <p className="text-sm text-[#40AC8D] font-bold">공용 공+ </p>
                  일괄 선택
                </button>
              </div>

              <div className="text-center flex justify-center items-center ">
                <button
                  className={`  w-28 text-xs ${type === 1 ? "opacity-0 cursor-not-allowed" : ""}`}
                  onClick={() => setGrade("selectOption3", "54")}
                  disabled={type === 1}
                >
                  <p className="text-sm text-[#40AC8D] font-bold">공용 무공 </p>
                  일괄 선택
                </button>
              </div>
            </div>
            <div className="bg-red-500 border-2 mx-auto h-16 rounded-lg text-center flex justify-center items-center">
              <button
                className="text-white w-20 text-xs"
                onClick={() => setGrade("selectOption3", null)}
              >
                공용 옵션
                <p className="text-sm ">일괄 제거 </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllSelectPresetComp;
