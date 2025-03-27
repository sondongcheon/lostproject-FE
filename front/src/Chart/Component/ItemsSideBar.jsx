import React, { useState, useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

import SideBarlist from "./SideBarlist";
import SelectBox from "../../common/Component/SelectBox";

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
              clickAction={() => navigate("/chartitems/book")}
              img="https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_9_25.png"
              name="&nbsp;유물 각인서"
            />
            <SideBarlist
              clickAction={() => navigate("/chartitems/jewel")}
              img="https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_12_105.png"
              name="&nbsp;보석(데이터수집중)"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemsSideBar;
