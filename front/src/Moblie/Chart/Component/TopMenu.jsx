import React, { useState, useEffect } from "react";
import axios from "axios";

import Menulist from "./Menulist";

const TopMenu = ({ setSelectCategory, setSelectGrade, setSelectCustom, setSelectType }) => {
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
    <div className="h-full border-2 border-gray-500 rounded-xl">
      <div className="flex justify-center gap-x-2 p-4 top-20 size-font-sm">
        <div className="p-4 border-t-2 border-b-2 border-gray-400 rounded-xl">
          <h1 className="text-center">딜러 옵션</h1>
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
        <div className="p-4 border-t-2 border-b-2 border-gray-400 rounded-xl">
          <h1 className="text-center">서포터 옵션</h1>
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
          <br />
          <button
            className="w-full normalBtm mb-4"
            onClick={() => {
              setSelectCustom(true);
            }}
          >
            🔎부위 선택 보기
          </button>
        </div>
      </div>
      <br />
      <p className="text-center text-xs"> 오늘의 차트 방문자 - {logSearch[1]}</p>
      <p className="text-center text-xs"> 누적 차트 방문자 - {logSearch[0]}</p>
    </div>
  );
};

export default TopMenu;
