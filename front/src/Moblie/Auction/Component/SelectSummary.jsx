import React from "react";

import Calstat from "./Calstat";
import CharacterSearch from "./CharacterSearch";
import loading from "@/Assets/loading.webp";

const SelectSummary = ({ search, total, searchState, apiKey }) => {
  return (
    <div>
      <div className="h-28 flex">
        <div className="w-[25%] h-full shadow-lg bg-[#F5F5F5] flex flex-col justify-center items-center rounded-2xl gap-y-2 size-font-xs">
          <span className="mb-4 border-b-4 border-gray-500"> 🛠️ 편의 도구 모음 🛠️ </span>
          <Calstat></Calstat>
          <CharacterSearch></CharacterSearch>
        </div>
        <div className="w-[5%]"></div>
        <div className="w-[70%] shadow-lg border-2 rounded-2xl bg-gray-200 flex flex-col justify-center items-center">
          <h1
            className={`${
              apiKey === "" || !apiKey
                ? "font-bold text-center size-font-xxs text-red-500"
                : "hidden"
            } `}
          >
            🚨 API Key가 입력되지 않았습니다.🚨 <br /> 공용키가 사용되어 검색되므로 분당 횟수 초과가
            일어날 확률이 높습니다.
          </h1>
          <button
            className="w-full bg-[#40AC8D] rounded-lg hover:text-white hover:bg-[#3A8F7A] hover:scale-105 transition-transform duration-300 size-font-xs h-10 mb-4"
            onClick={search}
            disabled={searchState}
          >
            {searchState ? (
              <div className="h-full bg-contain bg-center bg-no-repeat">
                <p className="h-full flex justify-center size-font-sm items-center">
                  <img src={loading} className="w-[30px]" />
                  선택한 옵션으로 검색중입니다 <img src={loading} className="w-[30px]" />
                </p>
              </div>
            ) : (
              <span>
                🔎 검색하기 🔎 <br /> 결과가 없다면 옵션 종류를 선택했는지 확인해보세요
              </span>
            )}
          </button>
          <p className="font-bold size-font-2xl">총 금액 : {total.toLocaleString()} G</p>
        </div>
      </div>
    </div>
  );
};

export default SelectSummary;
