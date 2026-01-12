import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "@/store/settingsSlice.js";

import MenuDropdown from "@/common/Component/MenuDropdown";
import ModalApiKey from "@/common/Component/ModalApiKey";

function MainNav({ logSearch, getCountLog }) {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.settings.darkMode);

  const isMobile = useMediaQuery({
    query: "(max-width:800px)",
  });

  const [isMenuClick, setIsMenuClick] = useState(false);

  const sidebarRef = useRef(null); // 사이드바 영역을 참조
  const buttonRef = useRef(null); // 햄버거 버튼을 참조

  // 화면 외부 클릭 시 사이드바를 닫는 함수
  const handleClickOutside = (event) => {
    // 햄버거 버튼을 클릭한 경우 외부 클릭을 처리하지 않음
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target) &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsMenuClick(false); // 사이드바 외부 클릭 시 메뉴 닫기
    }
  };
  useEffect(() => {
    // 화면 외부 클릭 이벤트 리스너 등록
    document.addEventListener("mousedown", handleClickOutside);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    getCountLog();
  }, []);

  return (
    <div>
      <div className="fixed top-0 left-0 w-full z-50">
        {/* Main NavBar */}
        <div>
          <div className="h-16 group bg-gradient-to-r px-8 from-[#2384bc] to-[#b2ddad] dark:from-[#1B4F72] dark:to-[#5C8F5A] shadow-md transition-all duration-300">
            <div className="container mx-auto flex items-center justify-between w-full h-full text-[#2b2b2b] dark:text[#2b2b2b] font-bold">
              {/* 왼쪽에 'test' 홈페이지 링크 */}
              <span
                className=" text-lg cursor-pointer text-white dark:text-black font-a"
                onClick={() => navigate("/")}
              >
                LoaRoot <span className="size-font-xs">[Ver 2.6.3]</span>
              </span>

              {/* 오른쪽에 페이지 이동 공간 잡기 */}

              <div
                className="cursor-pointer px-4 py-2 rounded-lg transition-all duration-300 hover:scale-110 flex items-center space-x-3 bg-white/50 dark:bg-black/50 backdrop-blur-sm"
                ref={buttonRef}
                onClick={(event) => {
                  event.stopPropagation();
                  setIsMenuClick(!isMenuClick);
                }}
              >
                <div className="size-font-xs font-semibold">MENU</div>
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-current rounded-full"></div>
                  <div className="w-1 h-1 bg-current rounded-full"></div>
                  <div className="w-1 h-1 bg-current rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="flex justify-end">
        {isMobile && (
          <div
            ref={sidebarRef}
            className={`fixed top-16 right-0 w-64 bg-white shadow-lg transform transition-transform duration-500 ease-out z-50 ${
              isMenuClick ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <MenuDropdown />
          </div>
        )}
      </div>
    </div>
  );
}

export default MainNav;
