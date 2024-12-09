import React, { useEffect, useState } from "react";

const AllSelectPresetComp = ({ updateSet, type }) => {
  const [sliderValue, setSliderValue] = useState(0);
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
        selectOption1: ["43", "47", "47", "51", "51"],
        selectOption2: ["44", "48", "48", "52", "52"],
      });
    }
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
    setSliderValue(0);

    updateSet.forEach((updateOption) => {
      updateOption("itemGrade", "");
    });
    updateSet.forEach((updateOption) => {
      updateOption("quality", null);
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
    updateSet.forEach((updateOption) => {
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
      <div className="h-44 flex shadow-lg border-2 rounded-3xl bg-[#F5F5F5] pt-8 pb-8">
        <div className="w-20 flex flex-col justify-center items-center font-bold">
          일괄선택<p> 프리셋</p>
        </div>
        <div className="w-52 pt-2 pb-2">
          <div className=" text-center flex justify-center items-center ">
            <button className="resetBtm w-40 bg-[#FF6E00]" onClick={setReset}>
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
        </div>
        <div className="flex flex-1 grid grid-cols-4 text-sm font-bold pl-2 pr-4">
          <div className=" text-center flex justify-center items-center">
            <button
              className="normalBtm color-tomato w-20 text-xs"
              onClick={() => setGrade("itemGrade", "유물")}
            >
              ALL 유물
            </button>
          </div>
          <div className=" text-center flex justify-center items-center">
            <button
              className="normalBtm color-tomato w-20 text-xs"
              onClick={() => setOption("selectValue1", "3", "selectValue2", null)}
            >
              상단일 <br />
              일괄 선택
            </button>
          </div>
          <div className="text-center flex justify-center items-center">
            <button
              className="normalBtm color-tomato w-20 text-xs"
              onClick={() => setOption("selectValue1", "2", "selectValue2", null)}
            >
              중단일 <br />
              일괄 선택
            </button>
          </div>
          <div className=" text-center flex justify-center items-center">
            <button
              className="normalBtm color-tomato w-20 text-xs"
              onClick={() => setOption("selectValue1", "1", "selectValue2", null)}
            >
              하단일 <br />
              일괄 선택
            </button>
          </div>

          <div className=" text-center flex justify-center items-center">
            <button
              className="normalBtm color-tomato w-20 text-xs"
              onClick={() => setGrade("itemGrade", "고대")}
            >
              ALL 고대
            </button>
          </div>
          <div className=" text-center flex justify-center items-center">
            <button
              className="normalBtm color-tomato w-20 text-xs"
              onClick={() => setOption("selectValue1", "3", "selectValue2", "3")}
            >
              상상 <br />
              일괄 선택
            </button>
          </div>
          <div className=" text-center flex justify-center items-center">
            <button
              className="normalBtm color-tomato w-20 text-xs"
              onClick={() => setOption("selectValue1", "2", "selectValue2", "2")}
            >
              중중 <br />
              일괄 선택
            </button>
          </div>
          <div className=" text-center flex justify-center items-center">
            <button
              className="normalBtm color-tomato w-20 text-xs"
              onClick={() => setOption("selectValue1", "1", "selectValue2", "1")}
            >
              하하 <br />
              일괄 선택
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllSelectPresetComp;
