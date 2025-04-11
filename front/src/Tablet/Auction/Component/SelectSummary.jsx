import React from "react";

import loading from "@/Assets/loading.webp";
//PC버전 재활용
import Calstat from "@/Auction/Component/Calstat";
import CharacterSearch from "./CharacterSearch";

const SelectSummary = ({ search, total, searchState, apiKey }) => {
  return (
    <div>
      <div className="h-36 flex mx-8 ">
        <div className="w-[25%] h-full shadow-lg bg-[#F5F5F5] flex flex-col justify-center items-center rounded-2xl gap-y-4">
          <span className="mb-4 border-b-4 border-gray-500"> 🛠️ 편의 도구 모음 🛠️ </span>
          <Calstat></Calstat>
          <CharacterSearch></CharacterSearch>
        </div>
        <div className="w-[5%]"></div>
        <div className="w-[70%] flex flex-col justify-center items-center shadow-lg border-2 rounded-2xl bg-gray-200">
          <h1
            className={`h-1/3 ${
              !apiKey === "" || apiKey
                ? "font-bold text-center size-font-xxs text-red-500"
                : "invisible"
            } `}
          >
            🚨 API Key가 입력되지 않았습니다.🚨 <br /> 공용키가 사용되어 검색되므로 분당 횟수 초과가
            일어날 확률이 높습니다.
          </h1>
          <div className="w-full flex items-center justify-center gap-x-12">
            <button
              className="items-center bg-[#40AC8D] w-1/3 rounded-lg hover:text-white hover:bg-[#3A8F7A] hover:scale-105 transition-transform duration-300 text-xs h-16"
              onClick={search}
              disabled={searchState}
            >
              {searchState ? (
                <div className="h-full bg-contain bg-center bg-no-repeat">
                  <p className="h-full flex justify-center size-font-xs items-center">
                    <img src={loading} className="w-[27px]" />
                    선택한 옵션으로 검색중입니다 <img src={loading} className="w-[27px]" />
                  </p>
                </div>
              ) : (
                <span>
                  🔎 검색하기 🔎 <br /> 결과가 없다면 옵션 종류를 <br />
                  선택했는지 확인해보세요
                </span>
              )}
            </button>
            <span className="w-1/3 text-center font-bold text-xl">
              총 금액 <br /> {total.toLocaleString()} G
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectSummary;
