import React from "react";

import { useNavigate } from "react-router-dom";

import SideBarlist from "./SideBarlist";

const SideBar = ({}) => {
  const navigate = useNavigate();
  return (
    <div className="h-full">
      <div className="bg-white shadow-2xl rounded-xl p-4 sticky top-20">
        <div className="border-gray-400 rounded-xl">
          <div className="flex">
            <span className="font-bold">레이드 </span>
            <div className="mt-[10px] mx-2 border-t-2 border-black border-dotted w-1/2" />
          </div>

          <div className="py-2">
            <SideBarlist
              clickAction={() => navigate("/raid")}
              img="https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_12_105.png"
              name="&nbsp;메인 화면"
            />
            <SideBarlist
              clickAction={() => navigate("/raid/result")}
              img="https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_9_25.png"
              name="&nbsp;결과 확인"
            />
            <SideBarlist
              clickAction={() => navigate("/raid/save")}
              img="https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_24.png"
              name="&nbsp;결과 저장"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
