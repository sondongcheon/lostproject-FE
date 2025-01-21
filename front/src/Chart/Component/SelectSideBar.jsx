import React, { useState, useEffect } from "react";
import axios from "axios";

import SideBarlist from "./SideBarlist";

const SelectSideBar = ({ setSelectCategory, setSelectGrade, setSelectCustom, setSelectType }) => {
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
    <div className="h-full">
      <div className="border-2 border-gray-500 rounded-xl p-4 sticky top-32">
        <p className="text-center text-xs"> 오늘의 차트 방문자 - {logSearch[0]}</p>
        <p className="text-center text-xs"> 누적 차트 방문자 - {logSearch[1]}</p>
        <br />
        <li
          className="commonHover"
          onClick={() => {
            setSelectCustom(true);
          }}
        >
          직접 선택
        </li>
        <br />
        <div className="p-4 border-t-2 border-b-2 border-gray-400 rounded-xl">
          <h1 className="text-center">딜러 옵션</h1>
          <br />
          <SideBarlist
            onClick={() => {
              listclick("neck", "godae", false, "");
            }}
            img="https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_215.png"
            name="고대 목걸이"
          />
          <SideBarlist
            onClick={() => {
              listclick("earing", "godae", false, "");
            }}
            img="https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_115.png"
            name="고대 귀걸이"
          />
          <SideBarlist
            onClick={() => {
              listclick("ring", "godae", false, "");
            }}
            img="https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_22.png"
            name="고대 반지"
          />
          <br />
          <SideBarlist
            onClick={() => {
              listclick("neck", "umuoel", false, "");
            }}
            img="https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_217.png"
            name="유물 목걸이"
          />
          <SideBarlist
            onClick={() => {
              listclick("earing", "umuoel", false, "");
            }}
            img="https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_117.png"
            name="유물 귀걸이"
          />
          <SideBarlist
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
          <br />
          <SideBarlist
            onClick={() => {
              listclick("neck", "godae", false, "sup_");
            }}
            img="https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_215.png"
            name="고대 목걸이"
          />
          <SideBarlist
            onClick={() => {
              listclick("ring", "godae", false, "sup_");
            }}
            img="https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_22.png"
            name="고대 반지"
          />
          <br />
          <SideBarlist
            onClick={() => {
              listclick("neck", "umuoel", false, "sup_");
            }}
            img="https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_217.png"
            name="유물 목걸이"
          />
          <SideBarlist
            onClick={() => {
              listclick("ring", "umuoel", false, "sup_");
            }}
            img="https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_24.png"
            name="유물 반지"
          />
        </div>
      </div>
    </div>
  );
};

export default SelectSideBar;
