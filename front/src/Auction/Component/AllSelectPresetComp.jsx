import React from "react";

const AllSelectPresetComp = ({ updateSet }) => {
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
      <div className="h-28 border-black border-2 flex">
        <div className="w-48 flex justify-center items-center bg-gray-200">일괄선택 프리셋</div>
        <div className="flex flex-1 grid grid-cols-5 border-2 border-gray-500">
          <div className="border border-gray-300 text-center flex justify-center items-center">
            <button className="normalBtm" onClick={setReset}>
              초기화
            </button>
          </div>
          <div className="border border-gray-300 text-center flex justify-center items-center">
            <button className="normalBtm" onClick={() => setGrade("itemGrade", "유물")}>
              ALL 유물 등급
            </button>
          </div>
          <div className="border border-gray-300 text-center flex justify-center items-center">
            <button
              className="normalBtm"
              onClick={() => setOption("selectValue1", "3", "selectValue2", null)}
            >
              상단일 일괄 선택
            </button>
          </div>
          <div className="border border-gray-300 text-center flex justify-center items-center">
            <button
              className="normalBtm"
              onClick={() => setOption("selectValue1", "2", "selectValue2", null)}
            >
              중단일 일괄 선택
            </button>
          </div>
          <div className="border border-gray-300 text-center flex justify-center items-center">
            <button
              className="normalBtm"
              onClick={() => setOption("selectValue1", "1", "selectValue2", null)}
            >
              하단일 일괄 선택
            </button>
          </div>
          <div className="border border-gray-300 text-center flex justify-center items-center">
            전체 품질 선택
            <select
              className="border-black border-2"
              //   value={data.optionSecond}
              onChange={(e) => setGrade("quality", e.target.value)}
            >
              <option value="" disabled>
                -- Select an option --
              </option>
              <option value={null}>Select</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
              <option value="60">60</option>
              <option value="70">70</option>
              <option value="80">80</option>
              <option value="90">90</option>
            </select>
          </div>
          <div className="border border-gray-300 text-center flex justify-center items-center">
            <button className="normalBtm" onClick={() => setGrade("itemGrade", "고대")}>
              ALL 고대 등급
            </button>
          </div>
          <div className="border border-gray-300 text-center flex justify-center items-center">
            <button
              className="normalBtm"
              onClick={() => setOption("selectValue1", "3", "selectValue2", "3")}
            >
              상상 일괄 선택
            </button>
          </div>
          <div className="border border-gray-300 text-center flex justify-center items-center">
            <button
              className="normalBtm"
              onClick={() => setOption("selectValue1", "2", "selectValue2", "2")}
            >
              중중 일괄 선택
            </button>
          </div>
          <div className="border border-gray-300 text-center flex justify-center items-center">
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
