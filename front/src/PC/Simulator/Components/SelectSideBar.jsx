import React from "react";

import { useNavigate } from "react-router-dom";

import SideBarlist from "@/common/Component/SideBarlist";

const ItemsSideBar = ({}) => {
  const navigate = useNavigate();
  return (
    <div className="h-full">
      <div className="bgWtoB shadow-2xl rounded-xl p-4 sticky top-20">
        <div className="border-gray-400 rounded-xl">
          <div className="flex">
            <span className="font-bold">젬 종류 선택</span>
            <div className="mt-[10px] mx-2 border-t-2 border-black border-dotted w-1/3" />
          </div>

          <div className="py-2 space-y-2">
            <SideBarlist
              clickAction={() => navigate("/simulator/gem/1")}
              img="https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_13_112.png"
              name={
                <>
                  &nbsp;혼돈의 젬 : 왜곡
                  <br />
                  &nbsp;질서의 젬 : 견고
                </>
              }
            />
            <br />
            <SideBarlist
              clickAction={() => navigate("/simulator/gem/2")}
              img="https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_13_113.png"
              name={
                <>
                  &nbsp;혼돈의 젬 : 침식
                  <br />
                  &nbsp;질서의 젬 : 안정
                </>
              }
            />
            <br />
            <SideBarlist
              clickAction={() => navigate("/simulator/gem/3")}
              img="https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_13_114.png"
              name={
                <>
                  &nbsp;혼돈의 젬 : 붕괴
                  <br />
                  &nbsp;질서의 젬 : 불변
                </>
              }
            />
            <br />
            <SideBarlist
              clickAction={() => navigate("/simulator/gem/custom")}
              img="https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_13_111.png"
              name={<>&nbsp; 옵션 커스텀</>}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemsSideBar;
