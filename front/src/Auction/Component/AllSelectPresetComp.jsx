import React, { useState } from "react";

const AllSelectPresetComp = ({ updateSet }) => {
  const [sliderValue, setSliderValue] = useState(0);

  const setGrade = (key, value) => {
    updateSet.forEach((updateOption) => {
      updateOption(key, value);
    });
  };

  const setOption = (key1, value1, key2, value2) => {
    updateSet.forEach((updateOption) => {
      updateOption(key1, value1);
    });
    updateSet.forEach((updateOption) => {
      updateOption(key2, value2);
    });

    if (value2 !== null) {
      const options = {
        selectOption1: ["41", "45", "45", "49", "49"],
        selectOption2: ["42", "46", "46", "50", "50"],
      };

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
    updateSet.forEach((updateOption) => {
      updateOption("itemGrade", "");
    });
    updateSet.forEach((updateOption) => {
      updateOption("quality", null);
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
      <div className="h-28 flex shadow-lg border-2 rounded-3xl">
        <div className="w-48 flex justify-center items-center">일괄선택 프리셋</div>
        <div className="flex flex-1 grid grid-cols-5 ">
          <div className=" text-center flex justify-center items-center">
            <button className="normalBtm" onClick={setReset}>
              초기화
            </button>
          </div>
          <div className=" text-center flex justify-center items-center">
            <button className="normalBtm" onClick={() => setGrade("itemGrade", "유물")}>
              ALL 유물 등급
            </button>
          </div>
          <div className=" text-center flex justify-center items-center">
            <button
              className="normalBtm"
              onClick={() => setOption("selectValue1", "3", "selectValue2", null)}
            >
              상단일 일괄 선택
            </button>
          </div>
          <div className="text-center flex justify-center items-center">
            <button
              className="normalBtm"
              onClick={() => setOption("selectValue1", "2", "selectValue2", null)}
            >
              중단일 일괄 선택
            </button>
          </div>
          <div className=" text-center flex justify-center items-center">
            <button
              className="normalBtm"
              onClick={() => setOption("selectValue1", "1", "selectValue2", null)}
            >
              하단일 일괄 선택
            </button>
          </div>
          <div className="grid grid-cols-10 justify-center items-center">
            <p className="col-span-2 text-sm text-center">전체품질</p>
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
              className="col-span-6 w-full  h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="col-span-2  text-center text-sm text-gray-500">
              {sliderValue === 0 ? "미지정" : sliderValue}
            </div>
          </div>
          <div className=" text-center flex justify-center items-center">
            <button className="normalBtm" onClick={() => setGrade("itemGrade", "고대")}>
              ALL 고대 등급
            </button>
          </div>
          <div className=" text-center flex justify-center items-center">
            <button
              className="normalBtm"
              onClick={() => setOption("selectValue1", "3", "selectValue2", "3")}
            >
              상상 일괄 선택
            </button>
          </div>
          <div className=" text-center flex justify-center items-center">
            <button
              className="normalBtm"
              onClick={() => setOption("selectValue1", "2", "selectValue2", "2")}
            >
              중중 일괄 선택
            </button>
          </div>
          <div className=" text-center flex justify-center items-center">
            <button
              className="normalBtm"
              onClick={() => setOption("selectValue1", "1", "selectValue2", "1")}
            >
              하하 일괄 선택
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllSelectPresetComp;
