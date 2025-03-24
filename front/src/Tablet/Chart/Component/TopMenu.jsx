import React, { useState, useEffect } from "react";
import axios from "axios";

import Menulist from "./Menulist";
import SelectBox from "../../../common/Component/SelectBox";

import { BsFillQuestionCircleFill } from "react-icons/bs";

const TopMenu = ({
  setSelectCategory,
  setSelectGrade,
  setSelectCustom,
  setSelectType,
  request,
  setRequest,
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

  const updateOption = (key, value) => {
    setRequest((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const pointList = [
    {
      value: 8,
      content: "8개",
    },
    {
      value: 10,
      content: "10개",
    },
    {
      value: 15,
      content: "15개",
    },
  ];

  const timeList = [
    {
      value: 1,
      content: "1시간 간격",
    },
    {
      value: 2,
      content: "2시간 간격",
    },
    {
      value: 4,
      content: "4시간 간격",
    },
    {
      value: 8,
      content: "8시간 간격",
    },
    {
      value: 12,
      content: "12시간 간격",
    },
    {
      value: 24,
      content: "24시간 간격",
    },
  ];

  return (
    <div className="h-full bg-white shadow-2xl rounded-xl p-4 rounded-xl">
      <div className="flex justify-center gap-x-2 p-4 top-20 size-font-2xl">
        <div className="p-4 w-1/2">
          <div className="flex mb-4">
            <span className="font-bold">딜러 옵션</span>
            <div className="mt-[10px] mx-2 border-t-2 border-black border-dotted w-1/2" />
          </div>
          <Menulist
            onClick={() => {
              listclick("neck", "godae", false, "");
            }}
            img="https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_215.png"
            name="고대 목걸이"
          />
          <Menulist
            onClick={() => {
              listclick("earing", "godae", false, "");
            }}
            img="https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_115.png"
            name="고대 귀걸이"
          />
          <Menulist
            onClick={() => {
              listclick("ring", "godae", false, "");
            }}
            img="https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_22.png"
            name="고대 반지"
          />
          <br />
          <Menulist
            onClick={() => {
              listclick("neck", "umuoel", false, "");
            }}
            img="https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_217.png"
            name="유물 목걸이"
          />
          <Menulist
            onClick={() => {
              listclick("earing", "umuoel", false, "");
            }}
            img="https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_117.png"
            name="유물 귀걸이"
          />
          <Menulist
            onClick={() => {
              listclick("ring", "umuoel", false, "");
            }}
            img="https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_24.png"
            name="유물 반지"
          />
        </div>
        <br />
        <div className="p-4 w-1/2">
          <div className="flex mb-4">
            <span className="font-bold">서포터 옵션</span>
            <div className="mt-[10px] mx-2 border-t border-t-2 border-black border-dotted w-1/2" />
          </div>
          <Menulist
            onClick={() => {
              listclick("neck", "godae", false, "sup_");
            }}
            img="https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_215.png"
            name="고대 목걸이"
          />
          <Menulist
            onClick={() => {
              listclick("ring", "godae", false, "sup_");
            }}
            img="https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_22.png"
            name="고대 반지"
          />
          <br />
          <Menulist
            onClick={() => {
              listclick("neck", "umuoel", false, "sup_");
            }}
            img="https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_217.png"
            name="유물 목걸이"
          />
          <Menulist
            onClick={() => {
              listclick("ring", "umuoel", false, "sup_");
            }}
            img="https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_24.png"
            name="유물 반지"
          />
          <button
            className="w-full border-2 border-gray-300 bg-[#d1d5db] hover:bg-white my-4 rounded-xl px-2 py-4"
            onClick={() => {
              setSelectCustom(true);
            }}
          >
            🔎부위 선택 보기
          </button>
          <div className="flex group relative items-center gap-x-1">
            <BsFillQuestionCircleFill className="h-full " /> 부위 선택 보기란?
            <div className="absolute bottom-12 w-[180%] px-3 py-2 bg-gray-800 text-white size-font-xs rounded shadow-lg opacity-0 visibility-hidden pointer-events-none group-hover:opacity-100 group-hover:visibility-visible group-hover:pointer-events-auto transition-opacity duration-300 right-0">
              이 기능은 무엇인가요 ? <br />
              <br />
              부위별로 등급을 선택하여
              <br />
              합산된 그래프를 볼 수 있는 기능입니다. <br />
              <br />
              예시로, 목걸이 상중, 귀걸이 상하, 상을 선택하면 <br /> 각 부위별로 저장된 시간별
              가격들이 합산되어
              <br />
              예전에 삿다면 얼마였을까? 를 볼수 있습니다.
            </div>
          </div>
        </div>
      </div>
      <div className=" grid grid-cols-2 font-bold">
        <div className="flex items-baseline justify-center">
          <span>조회 시간 주기&nbsp;</span>
          <SelectBox
            options={timeList}
            value={request.time}
            name="time"
            onOptionsChange={updateOption}
            css="text-center rounded-xl border-gray-400 border-2 bg-[#F5F5F5]"
          />
        </div>
        <div className="flex items-baseline justify-center">
          <span>검색 지점 갯수&nbsp;</span>
          <SelectBox
            options={pointList}
            value={request.point}
            name="point"
            onOptionsChange={updateOption}
            css="text-center rounded-xl border-gray-400 border-2 bg-[#F5F5F5]"
          />
        </div>
      </div>
      <div className="mt-4 text-center text-sm space-x-10">
        <span> 오늘의 차트 방문자 - {logSearch[1]}</span>
        <span> 누적 차트 방문자 - {logSearch[0]}</span>
      </div>
    </div>
  );
};

export default TopMenu;
