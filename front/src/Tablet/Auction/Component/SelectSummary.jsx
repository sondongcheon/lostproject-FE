import React from "react";

const SelectSummary = ({ search, total, searchState, apiKey }) => {
  return (
    <div>
      <div className="h-36 flex justify-center items-center shadow-lg border-2 rounded-3xl bg-gray-200">
        <div className="flex flex-col justify-center items-center">
          <h1
            className={`${
              apiKey === "" || !apiKey
                ? "font-bold text-center size-font-xxs text-red-500"
                : "hidden"
            } `}
          >
            🚨 API Key가 입력되지 않았습니다.🚨 <br /> 공용키가 사용되어
            검색되므로 분당 횟수 초과가 일어날 확률이 높습니다.
          </h1>
          <button
            className="bg-[#40AC8D] resetBtm text-xs h-10 mb-4"
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
          <p className="font-bold text-xl">
            총 금액 : {total.toLocaleString()} G
          </p>
        </div>
      </div>
    </div>
  );
};

export default SelectSummary;
