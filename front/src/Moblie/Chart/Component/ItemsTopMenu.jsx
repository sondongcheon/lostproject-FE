import React from "react";
import { useNavigate } from "react-router-dom";

import Menulist from "./Menulist";

function ItemsTopMenu(props) {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full mb-8">
      <div className="bg-white shadow-2xl rounded-xl p-4 sticky top-20">
        <div className="border-gray-400 rounded-xl">
          <div className="flex">
            <span className="font-bold size-font-sm">주요 아이템</span>
            <div className="mt-[10px] mx-2 border-t-2 border-black border-dotted w-1/5" />
          </div>

          <div className="py-2">
            <Menulist
              clickAction={() => navigate("/chartitems/items/1")}
              img="https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_9_25.png"
              name="&nbsp;유물 각인서"
            />

            <Menulist
              clickAction={() => navigate("/chartitems/jewel")}
              img="https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_12_105.png"
              name="&nbsp;4T 보석"
            />
            <Menulist
              clickAction={() => navigate("/chartitems/items/2")}
              img="https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_12_88.png"
              name="&nbsp;재련 재료"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemsTopMenu;
