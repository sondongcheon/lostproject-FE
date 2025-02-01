import React, { useState, useEffect } from "react";
import axios from "axios";

import SideBarlist from "./SideBarlist";
import SelectBox from "../../common/Component/SelectBox";

const SelectSideBar = ({
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
      value: 10,
      content: "10개",
    },
    {
      value: 15,
      content: "15개",
    },
    {
      value: 20,
      content: "20개",
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
  ];

  return (
    <div className="h-full">
      <div className="bg-white shadow-2xl rounded-xl p-4 sticky top-20">
        <div className="border-gray-400 rounded-xl">
          <div className="flex">
            <span className="font-bold">딜러 옵션</span>
            <div className="mt-[10px] mx-2 border-t-2 border-black border-dotted w-1/2" />
          </div>

          <div className="py-2">
            <SideBarlist
              onClick={() => {
                listclick("neck", "godae", false, "");
              }}
              img="https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_215.png"
              name="&nbsp;고대 목걸이"
            />
            <SideBarlist
              onClick={() => {
                listclick("earing", "godae", false, "");
              }}
              img="https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_115.png"
              name="&nbsp;고대 귀걸이"
            />
            <SideBarlist
              onClick={() => {
                listclick("ring", "godae", false, "");
              }}
              img="https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_22.png"
              name="&nbsp;고대 반지"
            />
            <br />
            <SideBarlist
              onClick={() => {
                listclick("neck", "umuoel", false, "");
              }}
              img="https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_217.png"
              name="&nbsp;유물 목걸이"
            />
            <SideBarlist
              onClick={() => {
                listclick("earing", "umuoel", false, "");
              }}
              img="https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_117.png"
              name="&nbsp;유물 귀걸이"
            />
            <SideBarlist
              onClick={() => {
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

          <div className="py-2">
            <SideBarlist
              onClick={() => {
                listclick("neck", "godae", false, "sup_");
              }}
              img="https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_215.png"
              name="&nbsp;고대 목걸이"
            />
            <SideBarlist
              onClick={() => {
                listclick("ring", "godae", false, "sup_");
              }}
              img="https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_22.png"
              name="&nbsp;고대 반지"
            />
            <br />
            <SideBarlist
              onClick={() => {
                listclick("neck", "umuoel", false, "sup_");
              }}
              img="https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_217.png"
              name="&nbsp;유물 목걸이"
            />
            <SideBarlist
              onClick={() => {
                listclick("ring", "umuoel", false, "sup_");
              }}
              img="https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_24.png"
              name="&nbsp;유물 반지"
            />
          </div>
        </div>
        <button
          className="w-full border-2 border-gray-300 bg-[#d1d5db] hover:bg-white my-4 rounded-xl px-2 py-4"
          onClick={() => {
            setSelectCustom(true);
          }}
        >
          🔎부위 선택 보기
        </button>
        <div className="flex items-baseline  text-xs mb-4">
          <span className="">조회 시간 주기&nbsp;</span>
          <SelectBox
            options={timeList}
            value={request.time}
            name="time"
            onOptionsChange={updateOption}
            css="text-center rounded-xl border-gray-400 border-2 w-24 bg-[#F5F5F5]"
          />
        </div>
        <div className="flex items-baseline text-xs">
          <span className="">검색 지점 갯수&nbsp;</span>
          <SelectBox
            options={pointList}
            value={request.point}
            name="point"
            onOptionsChange={updateOption}
            css="text-center rounded-xl border-gray-400 border-2 w-24 bg-[#F5F5F5]"
          />
        </div>
        <div className="my-[18px] border-t-2 border-gray-400 w-full" />
        <p className="text-xs">ㆍ금일 차트 방문자 - {logSearch[1]}</p>
        <p className="text-xs">ㆍ누적 차트 방문자 - {logSearch[0]}</p>
      </div>
    </div>
  );
};

export default SelectSideBar;
