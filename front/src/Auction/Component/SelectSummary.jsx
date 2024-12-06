import React from "react";

const SelectSummary = ({ selectOptions, search, total }) => {
  const category200000 = selectOptions.filter((option) => option.categoryCode === 200000);
  const otherCategory = selectOptions.filter((option) => option.categoryCode !== 200000);

  const category200000Text = category200000.map((option) => `${option.accName}`).join(", ");

  const category = category200000
    .map((option) => `[${option.selectValue1}, ${option.selectValue2}]등급`)
    .join(", ");

  const otherCategoryText = otherCategory.map((option) => option.accName).join(", ");

  return (
    <div>
      <div className="h-40 border-black border-2 flex justify-center items-center">
        <div className="w-[30%] flex flex-col justify-center items-center">
          <h3>선택 사항 요약</h3>
          <button className="normalBtm" onClick={search}>
            검색하기
          </button>
          <p>토탈 : {total}G</p>
        </div>
        <div className="w-[70%] border-2 flex justify-center items-center text-center whitespace-pre-line">
          {category200000Text} 부위는 {category}을 조합하여 최저가 조합을 찾아봅니다. <br />
          {otherCategoryText}는 선택한 수치를 반영하여 검색합니다.
        </div>
      </div>
    </div>
  );
};

export default SelectSummary;
