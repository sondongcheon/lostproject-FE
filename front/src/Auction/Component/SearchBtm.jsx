import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Calstat from "./Calstat";
import CharacterSearch from "./CharacterSearch";

import loading from "../../Assets/loading.webp";

const SearchBtm = ({ search, total, searchState }) => {
  const apiKey = useSelector((state) => state.settings.apiKey);

  return (
    <div>
      <div className="h-44 flex justify-center items-center w-full">
        <div className="w-[25%] h-full shadow-lg bg-[#F5F5F5] flex flex-col justify-center items-center rounded-2xl gap-y-4">
          <span className="mb-4 border-b-4 border-gray-500"> 🛠️ 편의 도구 모음 🛠️ </span>
          <Calstat></Calstat>
          <CharacterSearch></CharacterSearch>
        </div>
        <div className="w-[5%]"></div>
        <div className="w-[70%] h-full flex flex-col justify-center items-center shadow-lg bg-gray-200 rounded-2xl ">
          <h1
            className={`${
              apiKey === "" || !apiKey ? "font-bold text-center text-xs text-red-500" : "hidden"
            } `}
          >
            🚨 API Key가 입력되지 않았습니다.🚨 <br /> 공용키가 사용되어 검색되므로 <br /> 분당 횟수
            초과가 일어날 확률이 높습니다.
          </h1>
          <button
            className="w-3/4 h-[40%] bg-[#40AC8D] rounded-lg hover:text-white hover:bg-[#3A8F7A] hover:scale-105 transition-transform duration-300 h-10 mb-4"
            onClick={search}
            disabled={searchState}
          >
            {searchState ? (
              <div className="h-full bg-contain bg-center bg-no-repeat">
                <p className="h-full flex justify-center text-xl items-center">
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
          <p className="font-bold text-xl text-center">
            최저가 총 금액 <br /> {total.toLocaleString()} G
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchBtm;
