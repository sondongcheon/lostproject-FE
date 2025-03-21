import React from "react";

import Menulist from "./Menulist";

function ItemsTopMenu(props) {
  return (
    <div className="w-full h-full">
      <div className="bg-white shadow-2xl rounded-xl p-4 sticky top-20">
        <div className="border-gray-400 rounded-xl">
          <div className="flex">
            <span className="font-bold size-font-sm">주요 아이템</span>
            <div className="mt-[10px] mx-2 border-t-2 border-black border-dotted w-2/5" />
          </div>

          <div className="py-2">
            <Menulist
              img="https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_9_25.png"
              name="&nbsp;유물 각인서"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemsTopMenu;
