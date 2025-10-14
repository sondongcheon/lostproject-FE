import React from "react";
import { useNavigate } from "react-router-dom";

import Menulist from "./Menulist";

function SelectTopMenu(props) {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full mb-4">
      <div className="bg-white dark:bg-slate-800 shadow-2xl rounded-xl px-8 py-2 mx-2">
        <div className="border-gray-400 rounded-xl">
          <div className="flex items-center justify-center">
            <span className="font-bold size-font-sm">젬 종류 선택</span>
            <div className="mt-[10px] mx-2 border-t-2 border-black dark:border-white border-dotted w-1/4" />
          </div>

          <div className="py-2 grid grid-cols-2 gap-2">
            <Menulist
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
            <Menulist
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
            <Menulist
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
            <Menulist
              clickAction={() => navigate("/simulator/gem/custom")}
              img="https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_13_111.png"
              name={<>&nbsp; 옵션 커스텀</>}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectTopMenu;
