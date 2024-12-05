import React from "react";

const SelectSummary = ({ selectOptions, search, total }) => {
  const category200000 = selectOptions.filter((option) => option.categoryCode === 200000);
  const otherCategory = selectOptions.filter((option) => option.categoryCode !== 200000);

  const category200000Text = category200000
    .map(
      (option) =>
        `${option.accName} 는 조합하여 [${option.selectValue1}, ${option.selectValue2}] 등급을 활용합니다`
    )
    .join("\n");

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
          {category200000Text} <br />
          {otherCategoryText}는 부위를 고정합니다.
        </div>
      </div>
    </div>
  );
};

export default SelectSummary;
