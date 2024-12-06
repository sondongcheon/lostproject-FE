import React, { useState, useCallback } from "react";

const SelectOptionComp = ({ options, onOptionsChange }) => {
  const [currentOption, setCurrentOption] = useState({});

  const updateOption = (key, value) => {
    setCurrentOption((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleCategoryCode = () => {
    if (options.categoryCode === 200000) {
      if (options.accName === "목걸이") {
        onOptionsChange("categoryCode", 200010);
      } else if (options.accName === "귀걸이") {
        onOptionsChange("categoryCode", 200020);
      } else {
        onOptionsChange("categoryCode", 200030);
      }
      onOptionsChange("selectOption1", currentOption.selectOption1);
      onOptionsChange("selectOption2", currentOption.selectOption2);
      onOptionsChange("selectOption3", currentOption.selectOption3);
    } else {
      onOptionsChange("categoryCode", 200000);
      updateOption("selectOption1", options.selectOption1);
      updateOption("selectOption2", options.selectOption2);
      updateOption("selectOption3", options.selectOption3);
      onOptionsChange("selectOption1", "");
      onOptionsChange("selectOption2", "");
      onOptionsChange("selectOption3", "");
    }
  };

  return (
    <div>
      <div className="h-44 flex shadow-lg">
        {/* 왼쪽 고정 크기 영역 */}
        <div className="w-48 flex flex-col justify-center items-center bg-gray-200 border-black">
          <p>{options.accName}</p>
          <button className="normalBtm" onClick={handleCategoryCode}>
            {options.categoryCode === 200000 ? "탐색 리스트에서 제거" : "탐색 리스트에 추가"}
          </button>
        </div>

        {/* 오른쪽 비율 영역 */}
        <div className="flex flex-1">
          {/* 3 영역: 세로로 4칸, 각 칸을 3:7로 나누기 */}
          <div className="flex-[3] grid grid-rows-4">
            <div className="grid grid-cols-10">
              <div className="col-span-3 border-b-2 border-gray-300 flex items-center justify-center">
                등급
              </div>
              <div className="col-span-7 border-b-2 border-gray-300 flex items-center justify-center">
                <label>
                  <input
                    type="radio"
                    name={`${options.id}_itemGrade`}
                    value="유물"
                    checked={options.itemGrade === "유물"}
                    className="mr-1"
                    onChange={(e) => onOptionsChange("itemGrade", e.target.value)}
                  />
                  유물
                </label>
                <label>
                  <input
                    type="radio"
                    name={`${options.id}_itemGrade`}
                    value="고대"
                    checked={options.itemGrade === "고대"}
                    className="mr-1"
                    onChange={(e) => onOptionsChange("itemGrade", e.target.value)}
                  />
                  고대
                </label>
              </div>
            </div>
            <div className="grid grid-cols-10">
              <div className="col-span-3 border-b-2 border-gray-300 flex items-center justify-center">
                품질
              </div>
              <div className="col-span-7 border-b-2 border-gray-300 flex items-center justify-center">
                <select
                  className="mt-2 w-full border border-gray-300 rounded px-3 py-1"
                  value={options.quality}
                  onChange={(e) => onOptionsChange("quality", e.target.value)}
                >
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
            </div>
            <div className="grid grid-cols-10">
              <div className="col-span-3 border-b-2 border-gray-300 flex items-center justify-center">
                연마 단계
              </div>
              <div className="col-span-7 border-b-2 border-gray-300 flex items-center justify-center">
                <label>
                  <input
                    type="radio"
                    name={`${options.id}_upgradeLevel`}
                    value={null}
                    className="mr-1"
                    checked={options.upgradeLevel === null}
                    onChange={() => onOptionsChange("upgradeLevel", null)}
                  />
                  상관 없음
                </label>
                <label>
                  <input
                    type="radio"
                    name={`${options.id}_upgradeLevel`}
                    value="1"
                    className="mr-1"
                    onChange={(e) => onOptionsChange("upgradeLevel", e.target.value)}
                  />
                  1단계
                </label>
                <label>
                  <input
                    type="radio"
                    name={`${options.id}_upgradeLevel`}
                    value="2"
                    className="mr-1"
                    onChange={(e) => onOptionsChange("upgradeLevel", e.target.value)}
                  />
                  2단계
                </label>
                <label>
                  <input
                    type="radio"
                    name={`${options.id}_upgradeLevel`}
                    value="3"
                    className="mr-1"
                    onChange={(e) => onOptionsChange("upgradeLevel", e.target.value)}
                  />
                  3단계
                </label>
              </div>
            </div>
            <div className="grid grid-cols-10">
              <div className="col-span-3 border-b-2 border-gray-300 flex items-center justify-center">
                거래 횟수
              </div>
              <div className="col-span-7 border-b-2 border-gray-300 flex items-center justify-center">
                <label>
                  <input
                    type="radio"
                    name={`${options.id}tradeCount`}
                    value={null}
                    className="mr-1"
                    checked={options.tradeAllowCount === null}
                    onChange={() => onOptionsChange("tradeAllowCount", null)}
                  />
                  상관 없음
                </label>
                <label>
                  <input
                    type="radio"
                    name={`${options.id}tradeCount`}
                    value="0"
                    className="mr-1"
                    onChange={(e) => onOptionsChange("tradeAllowCount", e.target.value)}
                  />
                  0회
                </label>
                <label>
                  <input
                    type="radio"
                    name={`${options.id}tradeCount`}
                    value="1"
                    className="mr-1"
                    onChange={(e) => onOptionsChange("tradeAllowCount", e.target.value)}
                  />
                  1회
                </label>
                <label>
                  <input
                    type="radio"
                    name={`${options.id}tradeCount`}
                    value="2"
                    className="mr-1"
                    onChange={(e) => onOptionsChange("tradeAllowCount", e.target.value)}
                  />
                  2회
                </label>
              </div>
            </div>
          </div>

          {/* 6:4 비율로 나누기 */}
          <div className="flex-[7] grid grid-rows-3">
            <div className="grid grid-cols-10">
              <div className="col-span-6  flex items-center">
                {/* 그룹명 "연마 효과"가 30% 영역에 정중앙 배치 */}
                <div className="w-[30%] flex justify-center">
                  <p className="text-xl">연마 효과</p>
                </div>

                {/* 나머지 70% 영역에 라디오 버튼들 배치 */}
                <div className="w-[70%] border-2 flex gap-4 justify-center items-center relative">
                  {/* 옵션이 200000일 경우만 덮기 */}
                  {options.categoryCode === 200000 && (
                    <div className="absolute inset-0 bg-gray-200 z-10 flex justify-center items-center">
                      <p className="text-sm text-gray-500">조합 리스트 선택 시 등급만 선택합니다</p>
                    </div>
                  )}
                  <form>
                    <label>
                      <input
                        type="radio"
                        name={`${options.id}selectOption1`}
                        value={options.optionValue.first}
                        checked={options.selectOption1 === options.optionValue.first}
                        disabled={options.selectOption2 === options.optionValue.first}
                        onChange={(e) => onOptionsChange("selectOption1", e.target.value)}
                      />
                      {options.optionName.first}
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={`${options.id}selectOption1`}
                        value={options.optionValue.second}
                        checked={options.selectOption1 === options.optionValue.second}
                        disabled={options.selectOption2 === options.optionValue.second}
                        onChange={(e) => onOptionsChange("selectOption1", e.target.value)}
                      />
                      {options.optionName.second}
                    </label>
                    {/* <label>
                      <input
                        type="radio"
                        name={`${options.id}selectOption1`}
                        value={options.optionValue.third}
                        checked={options.selectOption1 === options.optionValue.third}
                        onChange={(e) => onOptionsChange("selectOption1", e.target.value)}
                      />
                      {options.optionName.third}
                    </label> */}
                    <label>
                      <input
                        type="radio"
                        name={`${options.id}selectOption1`}
                        value={null}
                        checked={options.selectOption1 === null}
                        onChange={() => onOptionsChange("selectOption1", null)}
                      />
                      선택 안함
                    </label>
                  </form>
                </div>
              </div>
              <div className="col-span-4  flex items-center justify-center">
                {/* 그룹명 "연마 효과"가 30% 영역에 정중앙 배치 */}
                <div className="w-[30%] flex justify-center">
                  <p className="text-xl">등급</p>
                </div>

                {/* 나머지 70% 영역에 라디오 버튼들 배치 */}
                <div className="w-[70%] border-2 flex gap-4 justify-center items-center">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={`${options.id}selectValue1`}
                      value="3"
                      checked={options.selectValue1 === "3"}
                      className="mr-1"
                      onChange={(e) => onOptionsChange("selectValue1", e.target.value)}
                    />
                    상
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={`${options.id}selectValue1`}
                      value="2"
                      checked={options.selectValue1 === "2"}
                      className="mr-1"
                      onChange={(e) => onOptionsChange("selectValue1", e.target.value)}
                    />
                    중
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={`${options.id}selectValue1`}
                      value="1"
                      checked={options.selectValue1 === "1"}
                      className="mr-1"
                      onChange={(e) => onOptionsChange("selectValue1", e.target.value)}
                    />
                    하
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={`${options.id}selectValue1`}
                      checked={options.selectValue1 === null}
                      value={null}
                      className="mr-1"
                      onChange={() => onOptionsChange("selectValue1", null)}
                    />
                    선택안함
                  </label>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-10 ">
              <div className="col-span-6 border-b-2 border-gray-300 flex items-center justify-center">
                {/* 그룹명 "연마 효과"가 30% 영역에 정중앙 배치 */}
                <div className="w-[30%] flex justify-center">
                  <p className="text-xl">연마 효과</p>
                </div>

                {/* 나머지 70% 영역에 라디오 버튼들 배치 */}
                <div className="w-[70%] border-2 flex gap-4 justify-center items-center relative">
                  {/* 옵션이 200000일 경우만 덮기 */}
                  {options.categoryCode === 200000 && (
                    <div className="absolute inset-0 bg-gray-200 z-10 flex justify-center items-center">
                      <p className="text-sm text-gray-500">조합 리스트 선택 시 등급만 선택합니다</p>
                    </div>
                  )}
                  <form>
                    <label>
                      <input
                        type="radio"
                        name={`${options.id}selectOption2`}
                        value={options.optionValue.first}
                        checked={options.selectOption2 === options.optionValue.first}
                        disabled={options.selectOption1 === options.optionValue.first}
                        onChange={(e) => onOptionsChange("selectOption2", e.target.value)}
                      />
                      {options.optionName.first}
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={`${options.id}selectOption2`}
                        value={options.optionValue.second}
                        checked={options.selectOption2 === options.optionValue.second}
                        disabled={options.selectOption1 === options.optionValue.second}
                        onChange={(e) => onOptionsChange("selectOption2", e.target.value)}
                      />
                      {options.optionName.second}
                    </label>
                    {/* <label>
                      <input
                        type="radio"
                        name={`${options.id}selectOption2`}
                        value={options.optionValue.third}
                        checked={options.selectOption2 === options.optionValue.third}
                        onChange={(e) => onOptionsChange("selectOption2", e.target.value)}
                      />
                      {options.optionName.third}
                    </label> */}
                    <label>
                      <input
                        type="radio"
                        name={`${options.id}selectOption2`}
                        value={null}
                        checked={options.selectOption2 === null}
                        onChange={() => onOptionsChange("selectOption2", null)}
                      />
                      선택 안함
                    </label>
                  </form>
                </div>
              </div>
              <div className="col-span-4 border-b-2 border-gray-300 flex items-center justify-center">
                {/* 그룹명 "연마 효과"가 30% 영역에 정중앙 배치 */}
                <div className="w-[30%] flex justify-center">
                  <p className="text-xl">등급</p>
                </div>

                {/* 나머지 70% 영역에 라디오 버튼들 배치 */}
                <div className="w-[70%] border-2 flex gap-4 justify-center items-center">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={`${options.id}selectValue2`}
                      value="3"
                      checked={options.selectValue2 === "3"}
                      className="mr-1"
                      onChange={(e) => onOptionsChange("selectValue2", e.target.value)}
                    />
                    상
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={`${options.id}selectValue2`}
                      value="2"
                      checked={options.selectValue2 === "2"}
                      className="mr-1"
                      onChange={(e) => onOptionsChange("selectValue2", e.target.value)}
                    />
                    중
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={`${options.id}selectValue2`}
                      value="1"
                      checked={options.selectValue2 === "1"}
                      className="mr-1"
                      onChange={(e) => onOptionsChange("selectValue2", e.target.value)}
                    />
                    하
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={`${options.id}selectValue2`}
                      value={null}
                      checked={options.selectValue2 === null}
                      className="mr-1"
                      onChange={() => onOptionsChange("selectValue2", null)}
                    />
                    선택안함
                  </label>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-10 relative">
              {/* 전체를 덮는 미구현 메시지 */}
              <div className="absolute inset-0 bg-gray-200 bg-opacity-90 text-gray-500 text-sm flex justify-center items-center z-10">
                현재 미구현, 특수 옵션 2개만 활용합니다. 공용 옵션 선택 추가 예정
              </div>

              {/* 왼쪽 "연마 효과" 그룹 */}
              <div className="col-span-6 border-b-2 border-gray-300 flex items-center justify-center">
                <div className="w-[30%] flex justify-center">
                  <p className="text-xl">연마 효과</p>
                </div>
                <div className="w-[70%] border-2 flex gap-4 justify-center items-center">
                  <form>
                    <label>
                      <input
                        type="radio"
                        name={`${options.id}selectOption3`}
                        value={options.optionValue.first}
                        checked={options.selectOption3 === options.optionValue.first}
                        disabled={options.selectOption3 === options.optionValue.first}
                        onChange={(e) => onOptionsChange("selectOption3", e.target.value)}
                      />
                      {options.optionName.first}
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={`${options.id}selectOption3`}
                        value={options.optionValue.second}
                        checked={options.selectOption3 === options.optionValue.second}
                        disabled={options.selectOption3 === options.optionValue.second}
                        onChange={(e) => onOptionsChange("selectOption3", e.target.value)}
                      />
                      {options.optionName.second}
                    </label>
                    {/* <label>
                      <input
                        type="radio"
                        name={`${options.id}selectOption3`}
                        value={options.optionValue.third}
                        checked={options.selectOption3 === options.optionValue.third}
                        onChange={(e) => onOptionsChange("selectOption3", e.target.value)}
                      />
                      {options.optionName.third}
                    </label> */}
                    <label>
                      <input
                        type="radio"
                        name={`${options.id}selectOption3`}
                        value={null}
                        checked={options.selectOption3 === null}
                        onChange={() => onOptionsChange("selectOption3", null)}
                      />
                      선택 안함
                    </label>
                  </form>
                </div>
              </div>

              {/* 오른쪽 "등급" 그룹 */}
              <div className="col-span-4 border-b-2 border-gray-300 flex items-center justify-center">
                <div className="w-[30%] flex justify-center">
                  <p className="text-xl">등급</p>
                </div>
                <div className="w-[70%] border-2 flex gap-4 justify-center items-center">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={`${options.id}selectValue3`}
                      value="3"
                      checked={options.selectValue3 === "3"}
                      className="mr-1"
                      onChange={(e) => onOptionsChange("selectValue3", e.target.value)}
                    />
                    상
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={`${options.id}selectValue3`}
                      value="2"
                      checked={options.selectValue3 === "2"}
                      className="mr-1"
                      onChange={(e) => onOptionsChange("selectValue3", e.target.value)}
                    />
                    중
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={`${options.id}selectValue3`}
                      checked={options.selectValue3 === "1"}
                      value="1"
                      className="mr-1"
                      onChange={(e) => onOptionsChange("selectValue3", e.target.value)}
                    />
                    하
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={`${options.id}selectValue3`}
                      checked={options.selectValue3 === null}
                      value={null}
                      className="mr-1"
                      onChange={() => onOptionsChange("selectValue3", null)}
                    />
                    선택안함
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectOptionComp;
