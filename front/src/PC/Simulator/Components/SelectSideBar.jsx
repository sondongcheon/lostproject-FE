import React from "react";

import { useNavigate } from "react-router-dom";

import SideBarlist from "@/common/Component/SideBarlist";

const ItemsSideBar = ({}) => {
  const navigate = useNavigate();
  return (
    <div className="h-full">
      <div className="bg-white shadow-2xl rounded-xl p-4 sticky top-20">
        <div className="border-gray-400 rounded-xl">
          <div className="flex">
            <span className="font-bold">주요 아이템</span>
            <div className="mt-[10px] mx-2 border-t-2 border-black border-dotted w-1/3" />
          </div>

          <div className="py-2">
            <SideBarlist
              clickAction={() => navigate("/simulator/gem/1")}
              img="https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_9_25.png"
              name="&nbsp;혼돈의 젬 : 왜곡"
            />
            <SideBarlist
              clickAction={() => navigate("/simulator/gem/2")}
              img="https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_12_105.png"
              name="&nbsp;혼돈의 젬 : 침식"
            />
            <SideBarlist
              clickAction={() => navigate("/simulator/gem/3")}
              img="https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_12_88.png"
              name="&nbsp;혼돈의 젬 : 붕괴"
            />
            <SideBarlist
              clickAction={() => navigate("/simulator/gem/4")}
              img="https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_13_114.png"
              name="&nbsp;혼돈의 젬 : 불변"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemsSideBar;
