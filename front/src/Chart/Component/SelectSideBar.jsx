import React, { useState, useEffect } from "react";
import axios from "axios";

import SideBarlist from "./SideBarlist";

const SelectSideBar = ({
  setSelectCategory,
  setSelectGrade,
  setSelectCustom,
  setSelectType,
}) => {
  const [logSearch, setLogSearch] = useState([]);

  const getCountLog = () => {
    axios
      .get(`${process.env.REACT_APP_URL}/log/3`)
      .then((res) => {
        setLogSearch(res.data.data);
      })
      .catch((error) => {});
  };

  const listclick = (category, grade, custom, type) => {
    setSelectCategory(category);
    setSelectGrade(grade);
    setSelectCustom(custom);
    setSelectType(type);
  };

  useEffect(() => {
    getCountLog();
  }, []);

  return (
    <div className="">
      <div className="bgWtoB shadow-2xl rounded-xl p-4 sticky top-20">
        <div className="border-gray-400 dark:border-gray-800 rounded-xl">
          <div className="flex">
            <span className="font-bold">딜러 옵션</span>
            <div className="mt-[10px] mx-2 border-t-2 border-black dark:border-white border-dotted w-1/2" />
          </div>

          <div className="py-2 ">
            <SideBarlist
              clickAction={() => {
                listclick("neck", "godae", false, "");
              }}
              img="https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_215.png"
              name="&nbsp;고대 목걸이"
            />
            <SideBarlist
              clickAction={() => {
                listclick("earing", "godae", false, "");
              }}
              img="https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_115.png"
              name="&nbsp;고대 귀걸이"
            />
            <SideBarlist
              clickAction={() => {
                listclick("ring", "godae", false, "");
              }}
              img="https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_22.png"
              name="&nbsp;고대 반지"
            />
            <br />
            <SideBarlist
              clickAction={() => {
                listclick("neck", "umuoel", false, "");
              }}
              img="https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_217.png"
              name="&nbsp;유물 목걸이"
            />
            <SideBarlist
              clickAction={() => {
                listclick("earing", "umuoel", false, "");
              }}
              img="https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_117.png"
              name="&nbsp;유물 귀걸이"
            />
            <SideBarlist
              clickAction={() => {
                listclick("ring", "umuoel", false, "");
              }}
              img="https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_24.png"
              name="&nbsp;유물 반지"
            />
          </div>
        </div>
        <div className=" border-gray-400 rounded-xl">
          <div className="flex">
            <span className="font-bold">서포터 옵션</span>
            <div className="mt-[10px] mx-2 border-t border-t-2 border-black border-dotted w-2/5" />
          </div>

          <div className="pt-2">
            <SideBarlist
              clickAction={() => {
                listclick("neck", "godae", false, "sup_");
              }}
              img="https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_215.png"
              name="&nbsp;고대 목걸이"
            />
            <SideBarlist
              clickAction={() => {
                listclick("ring", "godae", false, "sup_");
              }}
              img="https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_22.png"
              name="&nbsp;고대 반지"
            />
            <br />
            <SideBarlist
              clickAction={() => {
                listclick("neck", "umuoel", false, "sup_");
              }}
              img="https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_217.png"
              name="&nbsp;유물 목걸이"
            />
            <SideBarlist
              clickAction={() => {
                listclick("ring", "umuoel", false, "sup_");
              }}
              img="https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_24.png"
              name="&nbsp;유물 반지"
            />
          </div>
        </div>
        <button
          className="w-full border-2 border-gray-300 dark:border-gray-600 bg-[#d1d5db] dark:bg-[#2a2d31] hover:bg-white dark:hover:bg-black my-4 rounded-xl px-2 py-4 group relative"
          onClick={() => {
            setSelectCustom(true);
          }}
        >
          🔎부위 선택 보기
          <div className="absolute z-50 top-full w-[200%] px-3 py-2 bg-gray-800 text-white size-font-xxxs rounded shadow-lg opacity-0 visibility-hidden pointer-events-none group-hover:opacity-100 group-hover:visibility-visible group-hover:pointer-events-auto transition-opacity duration-300 right-0">
            이 기능은 무엇인가요 ? <br />
            <br />
            부위별로 등급을 선택하여
            <br />
            합산된 그래프를 볼 수 있는 기능입니다. <br />
            <br />
            예시로, 목걸이 상중, 귀걸이 상하, 상을 선택하면 <br /> 각 부위별로
            저장된 시간별 가격들이 합산되어
            <br />
            예전에 삿다면 얼마였을까? 를 볼수 있습니다.
          </div>
        </button>
        <div className="my-[18px] border-t-2 border-gray-400 w-full" />
        <p className="text-xs">ㆍ금일 차트 방문자 - {logSearch[1]}</p>
        <p className="text-xs">ㆍ누적 차트 방문자 - {logSearch[0]}</p>
      </div>
    </div>
  );
};

export default SelectSideBar;
