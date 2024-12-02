import React from "react";

function AllSelectPresetComp(props) {
  return (
    <div>
      <div className="h-28 border-black border-2 flex">
        <div className="w-48 flex justify-center items-center bg-gray-200">일괄선택 프리셋</div>
        <div className="flex flex-1 grid grid-cols-5 border-2 border-gray-500">
          <div className="border border-gray-300 text-center flex justify-center items-center">
            <button className="normalBtm">초기화</button>
          </div>
          <div className="border border-gray-300 text-center flex justify-center items-center">
            <button className="normalBtm">ALL 유물 등급</button>
          </div>
          <div className="border border-gray-300 text-center flex justify-center items-center">
            <button className="normalBtm">상단일 일괄 선택</button>
          </div>
          <div className="border border-gray-300 text-center flex justify-center items-center">
            <button className="normalBtm">중단일 일괄 선택</button>
          </div>
          <div className="border border-gray-300 text-center flex justify-center items-center">
            <button className="normalBtm">하단일 일괄 선택</button>
          </div>
          <div className="border border-gray-300 text-center flex justify-center items-center">
            전체 품질 선택
            <select
              className="border-black border-2"
              //   value={data.optionSecond}
              //   onChange={(e) => handleChange(index, "optionSecond", e.target.value)}
            >
              <option value="" disabled>
                -- Select an option --
              </option>
              <option value="40">40</option>
              <option value="50">50</option>
              <option value="60">60</option>
              <option value="70">70</option>
              <option value="80">80</option>
              <option value="90">90</option>
            </select>
          </div>
          <div className="border border-gray-300 text-center flex justify-center items-center">
            <button className="normalBtm">ALL 고대 등급</button>
          </div>
          <div className="border border-gray-300 text-center flex justify-center items-center">
            <button className="normalBtm">상상 일괄 선택</button>
          </div>
          <div className="border border-gray-300 text-center flex justify-center items-center">
            <button className="normalBtm">중중 일괄 선택</button>
          </div>
          <div className="border border-gray-300 text-center flex justify-center items-center">
            <button className="normalBtm">하하 일괄 선택</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllSelectPresetComp;
