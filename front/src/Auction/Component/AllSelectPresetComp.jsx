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
      <div className="flex">
        <div className="h-44 w-full flex shadow-lg border-2 rounded-3xl bg-[#F5F5F5] ">
          <div className="w-[25%] py-5">
            <div className=" text-center flex justify-center items-center ">
              <button className="resetBtm bg-[#b2ddad]" onClick={setReset}>
                선택 초기화
              </button>
            </div>
            <div className="grid grid-cols-4 justify-center items-center p-4">
              <span className="col-span-1 text-sm text-center font-bold">전체 품질</span>
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
                className="slider col-span-2 w-full  h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="col-span-1  text-center text-sm text-gray-500">
                <input
                  className="w-full text-center rounded-3xl border border-gray-300"
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
              <span className="col-span-1 text-xs text-center font-bold">전체 힘민지%</span>
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
                  className="w-full text-center rounded-3xl border border-gray-300"
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
          <div className="w-[75%] flex grid grid-cols-9 text-sm font-bold px-2 my-2">
            <div className=" text-center flex justify-center items-center ">
              <button className="allBtm w-20 text-xs" onClick={() => setGrade("itemGrade", "유물")}>
                ALL 유물
              </button>
            </div>
            <div className=" text-center flex justify-center items-center ">
              <button className="allBtm w-20 text-xs" onClick={() => setGrade("itemGrade", "고대")}>
                ALL 고대
              </button>
            </div>
            <div className=" text-center flex justify-center items-center ">
              <button
                className="normalBtm color-tomato text-xs"
                onClick={() => setOption("selectValue1", "3", "selectValue2", null)}
              >
                <p className="text-sm font-bold text-[#E38E49]">상단일</p>
                일괄 선택
              </button>
            </div>
            <div className="text-center flex justify-center items-center">
              <button
                className="normalBtm color-tomato w-20 text-xs"
                onClick={() => setOption("selectValue1", "2", "selectValue2", null)}
              >
                <p className="text-sm font-bold text-[#7E1891]">중단일</p>
                일괄 선택
              </button>
            </div>

            <div className=" text-center flex justify-center items-center">
              <button
                className="normalBtm color-tomato w-20 text-xs"
                onClick={() => setOption("selectValue1", "3", "selectValue2", "3")}
              >
                <p className="text-sm font-bold text-[#E38E49]">상상</p>
                일괄 선택
              </button>
            </div>
            <div className=" text-center flex justify-center items-center">
              <button
                className="normalBtm color-tomato w-20 text-xs"
                onClick={() => setOption("selectValue1", "2", "selectValue2", "2")}
              >
                <p className="text-sm font-bold text-[#7E1891]">중중</p>
                일괄 선택
              </button>
            </div>
            <div className=" text-center flex justify-center items-center">
              <button
                className="normalBtm color-tomato w-20 text-xs"
                onClick={() => setGrade("selectValue3", "3")}
              >
                <p className="text-sm font-bold text-[#E38E49]">공용 상</p>
                일괄 선택
              </button>
            </div>
            <div className=" text-center flex justify-center items-center">
              <button
                className="normalBtm color-tomato w-20 text-xs"
                onClick={() => setGrade("selectValue3", "2")}
              >
                <p className="text-sm font-bold text-[#7E1891]">공용 중</p>
                일괄 선택
              </button>
            </div>
            <div className=" text-center flex justify-center items-center">
              <button
                className="normalBtm color-tomato w-20 text-xs"
                onClick={() => setGrade("selectValue3", "1")}
              >
                <p className="text-sm font-bold text-[#0A3981]">공용 하</p>
                일괄 선택
              </button>
            </div>
            <div className=" text-center flex justify-center items-center group relative">
              <button
                className="normalBtm color-tomato w-20 text-xs"
                onClick={() => setOption("selectValue1", "3", "selectValue2", "2")}
              >
                <span className="text-sm font-bold text-[#E38E49]">상 </span>
                <span className="text-sm font-bold text-[#7E1891]">중 </span> <br />
                일괄 선택
              </button>
              <div className="absolute top-full w-[250%] px-3 py-2 bg-gray-800 text-white size-font-xxxs rounded shadow-lg opacity-0 visibility-hidden pointer-events-none group-hover:opacity-100 group-hover:visibility-visible group-hover:pointer-events-auto transition-opacity duration-300">
                목걸이 → 추피 상, 적주피 중 <br /> 귀걸이 → 공 상, 무공 중 <br />
                반지 → 치적 상, 치피 중
              </div>
            </div>
            <div className=" text-center flex justify-center items-center group relative">
              <button
                className="normalBtm color-tomato w-20 text-xs"
                onClick={() => setOption("selectValue1", "2", "selectValue2", "3")}
              >
                <span className="text-sm font-bold text-[#7E1891]">중 </span>
                <span className="text-sm font-bold text-[#E38E49]">상 </span> <br />
                일괄 선택
              </button>
              <div className="absolute top-full w-[250%] px-3 py-2 bg-gray-800 text-white size-font-xxxs rounded shadow-lg opacity-0 visibility-hidden pointer-events-none group-hover:opacity-100 group-hover:visibility-visible group-hover:pointer-events-auto transition-opacity duration-300">
                목걸이 → 추피 중, 적주피 상 <br /> 귀걸이 → 공 중, 무공 상 <br />
                반지 → 치적 중, 치피 상
              </div>
            </div>
            <div className=" text-center flex justify-center items-center group relative">
              <button
                className="normalBtm color-tomato w-20 text-xs"
                onClick={() => setOption("selectValue1", "3", "selectValue2", "1")}
              >
                <span className="text-sm font-bold text-[#E38E49]">상 </span>
                <span className="text-sm font-bold text-[#0A3981]">하 </span>
                <br />
                일괄 선택
              </button>
              <div className="absolute top-full w-[250%] px-3 py-2 bg-gray-800 text-white size-font-xxxs rounded shadow-lg opacity-0 visibility-hidden pointer-events-none group-hover:opacity-100 group-hover:visibility-visible group-hover:pointer-events-auto transition-opacity duration-300">
                목걸이 → 추피 상, 적주피 하 <br /> 귀걸이 → 공 상, 무공 하 <br />
                반지 → 치적 상, 치피 하
              </div>
            </div>
            <div className=" text-center flex justify-center items-center group relative">
              <button
                className="normalBtm color-tomato w-20 text-xs"
                onClick={() => setOption("selectValue1", "1", "selectValue2", "3")}
              >
                <span className="text-sm font-bold text-[#0A3981]">하 </span>
                <span className="text-sm font-bold text-[#E38E49]">상 </span>
                <br />
                일괄 선택
              </button>
              <div className="absolute top-full w-[250%] px-3 py-2 bg-gray-800 text-white size-font-xxxs rounded shadow-lg opacity-0 visibility-hidden pointer-events-none group-hover:opacity-100 group-hover:visibility-visible group-hover:pointer-events-auto transition-opacity duration-300">
                목걸이 → 추피 하, 적주피 상 <br /> 귀걸이 → 공 하, 무공 상 <br />
                반지 → 치적 하, 치피 상
              </div>
            </div>
            <div className=" text-center flex justify-center items-center  group relative">
              <button
                className="normalBtm color-tomato w-20 text-xs"
                onClick={() => setOption("selectValue1", "2", "selectValue2", "1")}
              >
                <span className="text-sm font-bold text-[#7E1891]">중 </span>
                <span className="text-sm font-bold text-[#0A3981]">하 </span> <br />
                일괄 선택
              </button>
              <div className="absolute top-full w-[250%] px-3 py-2 bg-gray-800 text-white size-font-xxxs rounded shadow-lg opacity-0 visibility-hidden pointer-events-none group-hover:opacity-100 group-hover:visibility-visible group-hover:pointer-events-auto transition-opacity duration-300">
                목걸이 → 추피 중, 적주피 하 <br /> 귀걸이 → 공 중, 무공 하 <br />
                반지 → 치적 중, 치피 하
              </div>
            </div>
            <div className=" text-center flex justify-center items-center group relative">
              <button
                className="normalBtm color-tomato w-20 text-xs"
                onClick={() => setOption("selectValue1", "1", "selectValue2", "2")}
              >
                <span className="text-sm font-bold text-[#0A3981]">하 </span>
                <span className="text-sm font-bold text-[#7E1891]">중 </span> <br />
                일괄 선택
              </button>
              <div className="absolute top-full w-[250%] px-3 py-2 bg-gray-800 text-white size-font-xxxs rounded shadow-lg opacity-0 visibility-hidden pointer-events-none group-hover:opacity-100 group-hover:visibility-visible group-hover:pointer-events-auto transition-opacity duration-300">
                목걸이 → 추피 하, 적주피 중 <br /> 귀걸이 → 공 하, 무공 중 <br />
                반지 → 치적 하, 치피 중
              </div>
            </div>

            <div className=" text-center flex justify-center items-center">
              <button
                className="normalBtm color-tomato w-20 text-xs"
                onClick={() => setGrade("selectOption3", "53")}
              >
                공용 공+ <br />
                일괄 선택
              </button>
            </div>

            <div className=" text-center flex justify-center items-center ">
              <button
                className={`normalBtm color-tomato w-20 text-xs ${
                  type === 1 ? "opacity-0 cursor-not-allowed" : ""
                }`}
                onClick={() => setGrade("selectOption3", "54")}
                disabled={type === 1}
              >
                공용 무공 <br />
                일괄 선택
              </button>
            </div>

            <div className=" text-center flex justify-center items-center">
              <button
                className="normalBtm color-tomato w-20 text-xs"
                onClick={() => setGrade("selectOption3", null)}
              >
                공용 옵션 <br />
                일괄 제거
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllSelectPresetComp;
