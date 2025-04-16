import React, { useState, useEffect } from "react";
import axios from "axios";

import Menulist from "./Menulist";
import { useSelector, useDispatch } from "react-redux";
import { setAccChartSetting } from "@/store/settingsSlice";

import { BsFillQuestionCircleFill } from "react-icons/bs";

const TopMenu = ({
  setSelectCategory,
  setSelectGrade,
  setSelectCustom,
  setSelectType,
  visualState,
  setVisualState,
  type,
  category,
}) => {
  const accChartSetting = useSelector((state) => state.settings.accChartSetting);
  const [logSearch, setLogSearch] = useState([]);
  const dispatch = useDispatch();

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
      content: "1일 간격",
    },
    {
      value: 2,
      content: "2일 간격",
    },
    {
      value: 3,
      content: "3일 간격",
    },
    {
      value: 4,
      content: "4일 간격",
    },
    {
      value: 5,
      content: "5일 간격",
    },
    {
      value: 7,
      content: "7일 간격",
    },
  ];

  const [optionName, setOptionName] = useState({});

  const selectOptionName = () => {
    //폿딜 구분 -> 카테고리 구분
    if (type === "sup_") {
      if (category === "neck")
        setOptionName({
          first: "아덴+",
          secound: "낙인+",
        });
      if (category === "ring")
        setOptionName({
          first: "아공+",
          secound: "아피+",
        });
    } else {
      if (category === "neck")
        setOptionName({
          first: "추피",
          secound: "적주피",
        });
      if (category === "earing")
        setOptionName({
          first: "공%",
          secound: "무공%",
        });
      if (category === "ring")
        setOptionName({
          first: "치적",
          secound: "치피",
        });
    }
  };

  const grapeControll = (index) => {
    setVisualState((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      localStorage.setItem("grapeVisualState", JSON.stringify(newState));
      return newState;
    });
  };

  const setAll = (bool) => {
    const newState = Array(12).fill(bool);
    setVisualState(newState);
    localStorage.setItem("grapeVisualState", JSON.stringify(newState));
  };

  useEffect(() => {
    const savedState = localStorage.getItem("grapeVisualState");
    if (savedState) {
      setVisualState(JSON.parse(savedState));
    }
  }, []);

  useEffect(() => {
    selectOptionName();
  }, [category, type]);

  return (
    <div>
      <div className="flex justify-center  top-20 size-font-2xl">
        <div className="p-4 w-[25%] max-h-64 mx-auto bg-white shadow-2xl rounded-xl overflow-scroll">
          <div className="flex mb-4">
            <span className="font-bold">딜러 옵션</span>
            <div className="mt-[10px] mx-2 border-t-2 border-black border-dotted w-[35%]" />
          </div>
          <Menulist
            clickAction={() => {
              listclick("neck", "godae", false, "");
            }}
            img="https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_215.png"
            name="고대 목걸이"
          />
          <Menulist
            clickAction={() => {
              listclick("earing", "godae", false, "");
            }}
            img="https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_115.png"
            name="고대 귀걸이"
          />
          <Menulist
            clickAction={() => {
              listclick("ring", "godae", false, "");
            }}
            img="https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_22.png"
            name="고대 반지"
          />
          <br />
          <Menulist
            clickAction={() => {
              listclick("neck", "umuoel", false, "");
            }}
            img="https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_217.png"
            name="유물 목걸이"
          />
          <Menulist
            clickAction={() => {
              listclick("earing", "umuoel", false, "");
            }}
            img="https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_117.png"
            name="유물 귀걸이"
          />
          <Menulist
            clickAction={() => {
              listclick("ring", "umuoel", false, "");
            }}
            img="https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_24.png"
            name="유물 반지"
          />
          <div className="flex mb-4">
            <span className="font-bold">서포터 옵션</span>
            <div className="mt-[10px] mx-2 border-t border-t-2 border-black border-dotted w-[25%]" />
          </div>
          <Menulist
            clickAction={() => {
              listclick("neck", "godae", false, "sup_");
            }}
            img="https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_215.png"
            name="고대 목걸이"
          />
          <Menulist
            clickAction={() => {
              listclick("ring", "godae", false, "sup_");
            }}
            img="https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_22.png"
            name="고대 반지"
          />
          <br />
          <Menulist
            clickAction={() => {
              listclick("neck", "umuoel", false, "sup_");
            }}
            img="https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_217.png"
            name="유물 목걸이"
          />
          <Menulist
            clickAction={() => {
              listclick("ring", "umuoel", false, "sup_");
            }}
            img="https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_24.png"
            name="유물 반지"
          />
          <button
            className="w-full border-2 border-gray-300 size-font-xs bg-[#d1d5db] hover:bg-white my-4 rounded-xl px-2 py-4"
            clickAction={() => {
              setSelectCustom(true);
            }}
          >
            🔎부위 선택 보기
          </button>
          <div className="flex group relative items-center gap-x-1 size-font-xs">
            <BsFillQuestionCircleFill className="h-full " /> 부위 선택 보기란?
            <div className="fixed top-80 z-10 w-[50%] px-3 py-2 bg-gray-800 text-white size-font-xs rounded shadow-lg opacity-0 visibility-hidden pointer-events-none group-hover:opacity-100 group-hover:visibility-visible group-hover:pointer-events-auto transition-opacity duration-300">
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
          <br />
          <h1 className="size-font-xs text-center"> 오늘의 차트 방문자 - {logSearch[1]}</h1>
          <h1 className="size-font-xs text-center"> 누적 차트 방문자 - {logSearch[0]}</h1>
        </div>
        <br />
        <div className="p-4 w-[70%] flex max-h-64 mx-auto bg-[#e0dedf] rounded-xl inset-shadow-sm shadow-inset-indigo overflow-scroll">
          {/* <div className="flex items-baseline justify-center">
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
          </div> */}
          <div className="w-[25%]">
            <h1 className="font-bold size-font-xs my-auto">| 이 물건만 볼래요</h1>
            <div className=" grid grid-rows-4 size-font-xs">
              <button
                className="presetBtm m-2 rounded-lg bg-[#b2ddad]"
                onClick={() => {
                  setAll(true);
                }}
              >
                ✅ 전체 선택
              </button>
              <button
                className="presetBtm m-2 rounded-lg bg-[#b2ddad]"
                onClick={() => {
                  setAll(false);
                }}
              >
                🗑️ 전체 해제
              </button>
              <div className="flex flex-col  items-center justify-center">
                <span className="">조회 시간 주기&nbsp;</span>
                <select
                  value={accChartSetting.time}
                  onChange={(e) => dispatch(setAccChartSetting({ time: e.target.value }))}
                  className="text-center size-font-xs rounded-xl border-gray-400 border-2 w-24 bg-[#F5F5F5]"
                >
                  <option value="" disabled>
                    옵션선택
                  </option>
                  {timeList.map((time) => (
                    <option value={time.value}>{time.content}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col items-center justify-center">
                <span className="">조회 지점 갯수&nbsp;</span>
                <select
                  value={accChartSetting.point}
                  onChange={(e) => dispatch(setAccChartSetting({ point: e.target.value }))}
                  className="text-center size-font-xs rounded-xl border-gray-400 border-2 w-24 bg-[#F5F5F5]"
                >
                  <option value="" disabled>
                    옵션선택
                  </option>
                  {pointList.map((pointList) => (
                    <option value={pointList.value}>{pointList.content}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="w-[75%] overflow-scroll grid grid-cols-2 size-font-xs gap-y-2">
            <button
              className={`m-2 p-1 w-[90%] justify-center presetBtm rounded-lg flex m-auto items-baseline text-center bg-white text-gray-500 font-bold ${
                visualState[0] ? "inset-shadow-sm shadow-inset-indigo" : ""
              }`}
              onClick={() => grapeControll(0)}
            >
              {optionName.first}
              <span className=" text-xl text-[#E38E49]">상</span> {optionName.secound}
              <span className=" text-xl text-[#E38E49]">상</span>
            </button>
            <button
              className={`m-2 p-1 w-[90%] justify-center presetBtm rounded-lg flex m-auto items-baseline text-center bg-white text-gray-500 font-bold ${
                visualState[1] ? "inset-shadow-sm shadow-inset-indigo" : ""
              }`}
              onClick={() => grapeControll(1)}
            >
              {optionName.first}
              <span className=" text-xl text-[#E38E49]">상</span> {optionName.secound}
              <span className=" text-xl text-[#7E1891]">중</span>
            </button>
            <button
              className={`m-2 p-1 w-[90%] justify-center presetBtm rounded-lg flex m-auto items-baseline text-center bg-white text-gray-500 font-bold ${
                visualState[2] ? "inset-shadow-sm shadow-inset-indigo" : ""
              }`}
              onClick={() => grapeControll(2)}
            >
              {optionName.first}
              <span className=" text-xl text-[#7E1891]">중</span> {optionName.secound}
              <span className=" text-xl text-[#E38E49]">상</span>
            </button>
            <button
              className={`m-2 p-1 w-[90%] justify-center presetBtm rounded-lg flex m-auto items-baseline text-center bg-white text-gray-500 font-bold ${
                visualState[3] ? "inset-shadow-sm shadow-inset-indigo" : ""
              }`}
              onClick={() => grapeControll(3)}
            >
              {optionName.first}
              <span className=" text-xl text-[#E38E49]">상</span> {optionName.secound}
              <span className=" text-xl text-[#0A3981]">하</span>
            </button>
            <button
              className={`m-2 p-1 w-[90%] justify-center presetBtm rounded-lg flex m-auto items-baseline text-center bg-white text-gray-500 font-bold ${
                visualState[4] ? "inset-shadow-sm shadow-inset-indigo" : ""
              }`}
              onClick={() => grapeControll(4)}
            >
              {optionName.first}
              <span className=" text-xl text-[#0A3981]">하</span> {optionName.secound}
              <span className=" text-xl text-[#E38E49]">상</span>
            </button>
            <button
              className={`m-2 p-1 w-[90%] justify-center presetBtm rounded-lg flex m-auto items-baseline text-center bg-white text-gray-500 font-bold ${
                visualState[5] ? "inset-shadow-sm shadow-inset-indigo" : ""
              }`}
              onClick={() => grapeControll(5)}
            >
              {optionName.first}
              <span className=" text-xl text-[#E38E49]">상</span>
            </button>
            <button
              className={`m-2 p-1 w-[90%] justify-center presetBtm rounded-lg flex m-auto items-baseline text-center bg-white text-gray-500 font-bold ${
                visualState[6] ? "inset-shadow-sm shadow-inset-indigo" : ""
              }`}
              onClick={() => grapeControll(6)}
            >
              {optionName.secound}
              <span className=" text-xl text-[#E38E49]">상</span>
            </button>
            <button
              className={`m-2 p-1 w-[90%] justify-center presetBtm rounded-lg flex m-auto items-baseline text-center bg-white text-gray-500 font-bold ${
                visualState[7] ? "inset-shadow-sm shadow-inset-indigo" : ""
              }`}
              onClick={() => grapeControll(7)}
            >
              {optionName.first}
              <span className=" text-xl text-[#7E1891]">중</span> {optionName.secound}
              <span className=" text-xl text-[#7E1891]">중</span>
            </button>
            <button
              className={`m-2 p-1 w-[90%] justify-center presetBtm rounded-lg flex m-auto items-baseline text-center bg-white text-gray-500 font-bold ${
                visualState[8] ? "inset-shadow-sm shadow-inset-indigo" : ""
              }`}
              onClick={() => grapeControll(8)}
            >
              {optionName.first}
              <span className=" text-xl text-[#7E1891]">중</span> {optionName.secound}
              <span className=" text-xl text-[#0A3981]">하</span>
            </button>
            <button
              className={`m-2 p-1 w-[90%] justify-center presetBtm rounded-lg flex m-auto items-baseline text-center bg-white text-gray-500 font-bold ${
                visualState[9] ? "inset-shadow-sm shadow-inset-indigo" : ""
              }`}
              onClick={() => grapeControll(9)}
            >
              {optionName.first}
              <span className=" text-xl text-[#0A3981]">하</span> {optionName.secound}
              <span className=" text-xl text-[#7E1891]">중</span>
            </button>
            <button
              className={`m-2 p-1 w-[90%] justify-center presetBtm rounded-lg flex m-auto items-baseline text-center bg-white text-gray-500 font-bold ${
                visualState[10] ? "inset-shadow-sm shadow-inset-indigo" : ""
              }`}
              onClick={() => grapeControll(10)}
            >
              {optionName.first}
              <span className=" text-xl text-[#7E1891]">중</span>
            </button>
            <button
              className={`m-2 p-1 w-[90%] justify-center presetBtm rounded-lg flex m-auto items-baseline text-center bg-white text-gray-500 font-bold ${
                visualState[11] ? "inset-shadow-sm shadow-inset-indigo" : ""
              }`}
              onClick={() => grapeControll(11)}
            >
              {optionName.secound}
              <span className=" text-xl text-[#7E1891]">중</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopMenu;
