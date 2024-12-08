import React, { useState } from "react";

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
      <div className="h-44 flex shadow-lg border-2 rounded-3xl bg-[#F5F5F5]">
        {/* 왼쪽 고정 크기 영역 */}
        <div className="w-20 flex flex-col justify-center items-center border-black">
          <p>{options.accName}</p>
          <button
            className={`text-xs ${options.categoryCode === 200000 ? "normalSelBtm" : "normalBtm"}`}
            onClick={handleCategoryCode}
          >
            탐색 <br />
            리스트 <br />
            {options.categoryCode === 200000 ? "제거" : "추가"}
          </button>
        </div>

        {/* 오른쪽 비율 영역 */}
        <div className="flex flex-1">
          {/* 3 영역: 세로로 4칸, 각 칸을 3:7로 나누기 */}
          <div className="flex-[7] grid grid-rows-4">
            <div className="grid grid-cols-4">
              <div className="col-span-1 border-b-2 border-gray-300 flex items-center justify-center">
                등급
              </div>
              <div className="col-span-3 border-b-2 border-gray-300 flex items-center justify-center">
                <form className="grid grid-cols-2 gap-10">
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
                </form>
              </div>
            </div>
            <div className="grid grid-cols-4">
              <div className="col-span-1 border-b-2 border-gray-300 flex items-center justify-center">
                품질
              </div>
              <div className="col-span-3 border-b-2 border-gray-300 flex items-center justify-center">
                <div className="w-3/4">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={options.quality || 0}
                    onChange={(e) =>
                      onOptionsChange("quality", parseInt(e.target.value, 10) || null)
                    }
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>
                <div className="w-1/4 text-center text-sm text-gray-500">
                  <input
                    className="w-full text-center rounded-3xl border border-gray-300"
                    placeholder="미지정"
                    type="number"
                    min="0"
                    max="100"
                    value={options.quality === null ? "미지정" : options.quality}
                    onChange={(e) => {
                      const value = parseInt(e.target.value, 10);
                      onOptionsChange(
                        "quality",
                        isNaN(value) ? null : Math.min(100, Math.max(0, value))
                      );
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4">
              <div className="col-span-1 border-b-2 border-gray-300 flex items-center justify-center">
                연마 단계
              </div>
              <div className="col-span-3 border-b-2 border-gray-300 flex items-center justify-center">
                <form className="grid grid-cols-4 justify-items-center">
                  <label>
                    <input
                      type="radio"
                      name={`${options.id}_upgradeLevel`}
                      value={null}
                      className="mr-1"
                      checked={options.upgradeLevel === null}
                      onChange={() => onOptionsChange("upgradeLevel", null)}
                    />
                    <span className="text-xs">미선택</span>
                  </label>

                  <label>
                    <input
                      type="radio"
                      name={`${options.id}_upgradeLevel`}
                      value="1"
                      className="mr-1"
                      onChange={(e) => onOptionsChange("upgradeLevel", e.target.value)}
                    />
                    <span className="text-sm">1단계</span>
                  </label>

                  <label>
                    <input
                      type="radio"
                      name={`${options.id}_upgradeLevel`}
                      value="2"
                      className="mr-1"
                      onChange={(e) => onOptionsChange("upgradeLevel", e.target.value)}
                    />
                    <span className="text-sm">2단계</span>
                  </label>

                  <label>
                    <input
                      type="radio"
                      name={`${options.id}_upgradeLevel`}
                      value="3"
                      className="mr-1"
                      onChange={(e) => onOptionsChange("upgradeLevel", e.target.value)}
                    />
                    <span className="text-sm">3단계</span>
                  </label>
                </form>
              </div>
            </div>
            <div className="grid grid-cols-4">
              <div className="col-span-1 flex items-center justify-center">거래 횟수</div>
              <div className="col-span-3 flex items-center justify-center">
                <form className="grid grid-cols-4 justify-items-center">
                  <label>
                    <input
                      type="radio"
                      name={`${options.id}tradeCount`}
                      value={null}
                      className="mr-1"
                      checked={options.tradeAllowCount === null}
                      onChange={() => onOptionsChange("tradeAllowCount", null)}
                    />
                    <span className="text-xs">미선택</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={`${options.id}tradeCount`}
                      value="0"
                      className="mr-1"
                      onChange={(e) => onOptionsChange("tradeAllowCount", e.target.value)}
                    />
                    <span className="text-sm">0회</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={`${options.id}tradeCount`}
                      value="1"
                      className="mr-1"
                      onChange={(e) => onOptionsChange("tradeAllowCount", e.target.value)}
                    />
                    <span className="text-sm">1회</span>
                  </label>

                  <label>
                    <input
                      type="radio"
                      name={`${options.id}tradeCount`}
                      value="2"
                      className="mr-1"
                      onChange={(e) => onOptionsChange("tradeAllowCount", e.target.value)}
                    />
                    <span className="text-sm">2회</span>
                  </label>
                </form>
              </div>
            </div>
          </div>

          {/* 6:4 비율로 나누기 */}
          <div className="flex-[13] grid grid-rows-3">
            <div className="grid grid-cols-2">
              <div className="flex items-center border-l-2">
                {/* 그룹명 "연마효과"가 20% 영역에 정중앙 배치 */}
                <div className="w-[20%] flex justify-center">
                  <p className="text-sm">연마효과</p>
                </div>

                {/* 나머지 70% 영역에 라디오 버튼들 배치 */}
                <div className="w-[80%] justify-center items-center relative">
                  {/* 옵션이 200000일 경우만 덮기 */}
                  {options.categoryCode === 200000 && (
                    <div className="absolute inset-0 bg-gray-200 z-10 flex justify-center items-center">
                      <p className="text-sm text-gray-500">조합 선택시 등급만 선택합니다</p>
                    </div>
                  )}
                  <form className="grid grid-cols-3 justify-items-center">
                    <label>
                      <input
                        type="radio"
                        name={`${options.id}selectOption1`}
                        value={options.optionValue.first}
                        checked={options.selectOption1 === options.optionValue.first}
                        disabled={options.selectOption2 === options.optionValue.first}
                        onChange={(e) => onOptionsChange("selectOption1", e.target.value)}
                      />
                      <span className="text-sm">{options.optionName.first}</span>
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
                      <span className="text-sm">{options.optionName.second}</span>
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
                      <span className="text-sm">미선택</span>
                    </label>
                  </form>
                </div>
              </div>
              <div className="flex items-center justify-center border-l-2">
                {/* 그룹명 "연마효과"가 20% 영역에 정중앙 배치 */}
                <div className="w-[20%] flex justify-center">
                  <p className="text-sm">등급</p>
                </div>

                {/* 나머지 80% 영역에 라디오 버튼들 배치 */}
                <div className="w-[80%] flex gap-4 justify-center items-center">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={`${options.id}selectValue1`}
                      value="3"
                      checked={options.selectValue1 === "3"}
                      className="mr-1"
                      onChange={(e) => onOptionsChange("selectValue1", e.target.value)}
                    />
                    <span className="text-sm">상</span>
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
                    <span className="text-sm">중</span>
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
                    <span className="text-sm">하</span>
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
                    <span className="text-sm">미선택</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="flex items-center justify-center border-l-2">
                {/* 그룹명 "연마효과"가 20% 영역에 정중앙 배치 */}
                <div className="w-[20%] flex justify-center">
                  <p className="text-sm">연마효과</p>
                </div>

                {/* 나머지 70% 영역에 라디오 버튼들 배치 */}
                <div className="w-[80%]  justify-center items-center relative">
                  {/* 옵션이 200000일 경우만 덮기 */}
                  {options.categoryCode === 200000 && (
                    <div className="absolute inset-0 bg-gray-200 z-10 flex justify-center items-center">
                      <p className="text-sm text-gray-500">조합 선택시 등급만 선택합니다</p>
                    </div>
                  )}
                  <form className="grid grid-cols-3 justify-items-center">
                    <label>
                      <input
                        type="radio"
                        name={`${options.id}selectOption2`}
                        value={options.optionValue.first}
                        checked={options.selectOption2 === options.optionValue.first}
                        disabled={options.selectOption1 === options.optionValue.first}
                        onChange={(e) => onOptionsChange("selectOption2", e.target.value)}
                      />
                      <span className="text-sm">{options.optionName.first}</span>
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
                      <span className="text-sm">{options.optionName.second}</span>
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
                      <span className="text-sm">미선택</span>
                    </label>
                  </form>
                </div>
              </div>
              <div className="flex items-center justify-center border-l-2">
                {/* 그룹명 "연마효과"가 20% 영역에 정중앙 배치 */}
                <div className="w-[20%] flex justify-center">
                  <p className="text-sm">등급</p>
                </div>
                {/* 나머지 80% 영역에 라디오 버튼들 배치 */}
                <div className="w-[80%] flex gap-4 justify-center items-center">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={`${options.id}selectValue2`}
                      value="3"
                      checked={options.selectValue2 === "3"}
                      className="mr-1"
                      onChange={(e) => onOptionsChange("selectValue2", e.target.value)}
                    />
                    <span className="text-sm">상</span>
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
                    <span className="text-sm">중</span>
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
                    <span className="text-sm">하</span>
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
                    <span className="text-sm">미선택</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 relative">
              {/* 전체를 덮는 미구현 메시지 */}
              <div className="absolute inset-0 bg-gray-200 bg-opacity-90 text-gray-500 text-sm flex justify-center items-center z-10 rounded-3xl">
                현재 미구현, 특수 옵션 2개만 활용합니다. 공용 옵션 선택 추가 예정
              </div>

              {/* 왼쪽 "연마효과" 그룹 */}
              <div className="border-gray-300 flex items-center justify-center ">
                <div className="w-[20%] flex justify-center">
                  <p className="text-sm">연마효과</p>
                </div>
                <div className="w-[80%]  justify-center items-center relative">
                  <form className="grid grid-cols-3 justify-items-center">
                    <label>
                      <input
                        type="radio"
                        name={`${options.id}selectOption3`}
                        value={options.optionValue.first}
                        checked={options.selectOption3 === options.optionValue.first}
                        disabled={options.selectOption3 === options.optionValue.first}
                        onChange={(e) => onOptionsChange("selectOption3", e.target.value)}
                      />
                      <span className="text-sm">{options.optionName.first}</span>
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
                      <span className="text-sm">{options.optionName.second}</span>
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
                      <span className="text-sm">미선택</span>
                    </label>
                  </form>
                </div>
              </div>

              {/* 오른쪽 "등급" 그룹 */}
              <div className="border-gray-300 flex items-center justify-center border-l-2">
                <div className="w-[20%] flex justify-center">
                  <p className="text-sm">등급</p>
                </div>
                <div className="w-[80%]  flex gap-4 justify-center items-center">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={`${options.id}selectValue3`}
                      value="3"
                      checked={options.selectValue3 === "3"}
                      className="mr-1"
                      onChange={(e) => onOptionsChange("selectValue3", e.target.value)}
                    />
                    <span className="text-sm">상</span>
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
                    <span className="text-sm">중</span>
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
                    <span className="text-sm">하</span>
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
                    <span className="text-sm">미선택</span>
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
