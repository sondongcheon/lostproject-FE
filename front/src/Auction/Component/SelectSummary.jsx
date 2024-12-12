import React from "react";

const SelectSummary = ({ selectOptions, search, total, searchState }) => {
  const category200000 = selectOptions.filter((option) => option.categoryCode === 200000);
  const otherCategory = selectOptions.filter((option) => option.categoryCode !== 200000);

  const category200000Text = category200000.map((option) => `${option.accName}`).join(", ");

  const category = category200000
    .map(
      (option) =>
        `[${option.selectValue1 == null ? "미선택" : option.selectValue1}, ${
          option.selectValue2 == null ? "미선택" : option.selectValue2
        }]등급`
    )
    .join(", ");

  const otherCategoryText = otherCategory
    .filter((option) => option.selectOption1 !== null || option.selectOption2 !== null) // 유효한 항목만 필터링
    .map((option) => option.accName) // accName만 추출
    .join(", ");

  return (
    <div>
      <div className="h-28 flex justify-center items-center shadow-lg border-2 rounded-3xl bg-gray-200">
        <div className="w-[27%] flex flex-col justify-center items-center">
          <button
            className="bg-[#40AC8D] resetBtm h-10 mb-4"
            onClick={search}
            disabled={searchState}
          >
            {searchState ? (
              <div className="h-full bg-[url('./Assets/loading.webp')] bg-contain bg-center bg-no-repeat">
                {" "}
              </div>
            ) : (
              "검색하기"
            )}
          </button>
          <p className="font-bold text-xl">총 금액 : {total} G</p>
        </div>
        <div className="w-[15%] flex flex-col justify-center items-center">
          <h3>선택 사항 요약</h3>
        </div>
        <div className="w-[58%] border-2 flex justify-center items-center text-center whitespace-pre-line">
          {`${
            category200000Text === ""
              ? ""
              : `${category200000Text} 부위는 \n ${category}을 조합하여 최저가 조합을 찾아봅니다. \n`
          } `}
          {`${
            otherCategoryText.length > 0
              ? otherCategoryText + " 부위는 선택한 수치를 반영하여 검색합니다."
              : ""
          } `}
        </div>
      </div>
    </div>
  );
};

export default SelectSummary;
