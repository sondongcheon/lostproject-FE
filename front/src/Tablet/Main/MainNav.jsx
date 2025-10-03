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

  useEffect(() => {
    if (!isMobile) {
      // 애니메이션 실행 없이 즉시 닫기
      setIsMenuClick(false);
    }
  }, [isMobile]);

  const navigate = useNavigate();

  useEffect(() => {
    getCountLog();
  }, []);

  return (
    <div>
      <div className="fixed top-0 left-0 w-full z-50">
        {/* Main NavBar */}
        <div>
          <div className="h-16 group bg-gradient-to-r from-[#2384bc] to-[#b2ddad] dark:from-[#1B4F72] dark:to-[#5C8F5A] shadow-md transition-all duration-300">
            <div className="container mx-auto px-2 py-1 flex items-center w-full h-full text-[#2b2b2b] dark:text[#2b2b2b] font-bold">
              {/* 왼쪽에 'test' 홈페이지 링크 */}
              <span
                className="w-72 text-3xl cursor-pointer text-white dark:text-black font-a "
                onClick={() => navigate("/")}
              >
                LoaRoot <span className="size-font-xxxs">[Ver 2.6.1]</span>
              </span>

              {/* 오른쪽에 페이지 이동 공간 잡기 */}
              {isMobile ? (
                <div
                  className=""
                  ref={buttonRef}
                  onClick={(event) => {
                    event.stopPropagation();
                    setIsMenuClick(!isMenuClick);
                  }}
                >
                  ☰
                </div>
              ) : (
                <div>
                  <div className="w-full">
                    <div className=" grid grid-cols-6 px-12 gap-x-4">
                      <div className="flex items-center justify-center transition-all duration-300 hover:underline group-hover:scale-110">
                        <ModalApiKey />
                      </div>

                      {/* 검색 도구 카테고리 */}
                      <div
                        className="cursor-pointer text-base hover:underline size-font-xxs transition-all duration-300 group-hover:scale-110 py-2 rounded-lg flex items-center justify-center"
                        onClick={() => navigate("/auction")}
                      >
                        🔍 검색 도구
                      </div>

                      {/* 차트 도구 카테고리 */}
                      <div
                        className="cursor-pointer text-base hover:underline size-font-xxs transition-all duration-300 group-hover:scale-110 py-2 rounded-lg flex items-center justify-center"
                        onClick={() => navigate("/chart")}
                      >
                        📊 차트 도구
                      </div>

                      {/* 시뮬레이터 카테고리 */}
                      <div
                        className="cursor-pointer text-base hover:underline size-font-xxs transition-all duration-300 group-hover:scale-110 py-2 rounded-lg flex items-center justify-center"
                        onClick={() => navigate("/simulator/gem/1")}
                      >
                        ⚙️ 시뮬레이터
                      </div>

                      {/* 커뮤니티 카테고리 */}
                      <div
                        className="cursor-pointer text-base hover:underline size-font-xxs transition-all duration-300 group-hover:scale-110 py-2 rounded-lg flex items-center justify-center"
                        onClick={() => navigate("/notice")}
                      >
                        👥 커뮤니티
                      </div>

                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => dispatch(toggleDarkMode())}
                          className="size-font-xxs transition-all duration-300 group-hover:scale-110 hover:underline"
                        >
                          {darkMode ? "🌞 라이트(BETA)" : "🌙 다크(BETA)"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="w-full transition-all duration-500 hidden group-hover:block hover:block">
              <div className="container  mx-auto flex justify-between items-center">
                <div className="container mx-auto py-4 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm shadow-lg hover:block">
                  <div className="grid grid-cols-6 w-full px-12 gap-x-4">
                    {/* API Settings Section */}
                    <div className="space-y-3 px-2">
                      <h3 className="size-font-xxs font-bold text-gray-800 dark:text-white border-b-2 border-gray-500 pb-2">
                        🔑 API KEY 설정
                      </h3>
                      <div className="space-y-2">
                        <div className="cursor-pointer p-3 rounded-lg bg-gray-50 dark:bg-gray-900/30 hover:bg-gray-100 dark:hover:bg-gray-900/50 transition-all duration-200 hover:scale-105">
                          <div className="font-semibold text-gray-800 dark:text-white">
                            API KEY 관리
                          </div>
                          <div className="size-font-xxxs text-gray-600 dark:text-gray-300">
                            로아 API KEY 설정
                          </div>
                        </div>

                        <div className="cursor-pointer p-3 rounded-lg bg-gray-50 dark:bg-gray-900/30 hover:bg-gray-100 dark:hover:bg-gray-900/50 transition-all duration-200 hover:scale-105">
                          <div className="font-semibold text-gray-800 dark:text-white">
                            검색 통계
                          </div>
                          <div className="size-font-xxxs text-gray-600 dark:text-gray-300 grid grid-rows-2">
                            <span>TodaySearch : {logSearch[1]} </span>
                            <span>TotalSearch : {logSearch[0]}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Search Tools Section */}
                    <div className="space-y-3 px-2">
                      <h3 className="size-font-xxs font-bold text-gray-800 dark:text-white border-b-2 border-blue-500 pb-2">
                        🔍 검색 도구
                      </h3>
                      <div className="space-y-2">
                        <div
                          className="cursor-pointer p-3 rounded-lg bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all duration-200 hover:scale-105"
                          onClick={() => navigate("/auction")}
                        >
                          <div className="font-semibold text-gray-800 dark:text-white">
                            딜러악세 검색기
                          </div>
                          <div className="size-font-xxxs text-gray-600 dark:text-gray-300">
                            딜러용 악세사리 검색
                          </div>
                        </div>
                        <div
                          className="cursor-pointer p-3 rounded-lg bg-green-50 dark:bg-green-900/30 hover:bg-green-100 dark:hover:bg-green-900/50 transition-all duration-200 hover:scale-105"
                          onClick={() => navigate("/auctionsup")}
                        >
                          <div className="font-semibold text-gray-800 dark:text-white">
                            서폿악세 검색기
                          </div>
                          <div className="size-font-xxxs text-gray-600 dark:text-gray-300">
                            서포터용 악세사리 검색
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Chart Tools Section */}
                    <div className="space-y-3 px-2">
                      <h3 className="size-font-xxs font-bold text-gray-800 dark:text-white border-b-2 border-purple-500 pb-2">
                        📊 차트 도구
                      </h3>
                      <div className="space-y-2">
                        <div
                          className="cursor-pointer p-3 rounded-lg bg-purple-50 dark:bg-purple-900/30 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-all duration-200 hover:scale-105"
                          onClick={() => navigate("/chart")}
                        >
                          <div className="font-semibold text-gray-800 dark:text-white">
                            시세 차트(악세)
                          </div>
                          <div className="size-font-xxxs text-gray-600 dark:text-gray-300">
                            악세사리 가격 추이
                          </div>
                        </div>
                        <div
                          className="cursor-pointer p-3 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-all duration-200 hover:scale-105"
                          onClick={() => navigate("/chartitems/main")}
                        >
                          <div className="font-semibold text-gray-800 dark:text-white">
                            주요 아이템 차트
                          </div>
                          <div className="size-font-xxxs text-gray-600 dark:text-gray-300">
                            주요 아이템 가격 추이
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Simulator Section */}
                    <div className="space-y-3 px-2">
                      <h3 className="size-font-xxs font-bold text-gray-800 dark:text-white border-b-2 border-orange-500 pb-2">
                        ⚙️ 시뮬레이터
                      </h3>
                      <div className="space-y-2">
                        <div
                          className="cursor-pointer p-3 rounded-lg bg-orange-50 dark:bg-orange-900/30 hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-all duration-200 hover:scale-105"
                          onClick={() => navigate("/simulator/gem/1")}
                        >
                          <div className="font-semibold text-gray-800 dark:text-white">
                            젬 가공 시뮬레이터
                          </div>
                          <div className="size-font-xxxs text-gray-600 dark:text-gray-300">
                            젬 가공 시뮬레이션
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Community Section */}
                    <div className="space-y-3 px-2">
                      <h3 className="size-font-xxs font-bold text-gray-800 dark:text-white border-b-2 border-pink-500 pb-2">
                        👥 커뮤니티
                      </h3>
                      <div className="space-y-2">
                        <div
                          className="cursor-pointer p-3 rounded-lg bg-pink-50 dark:bg-pink-900/30 hover:bg-pink-100 dark:hover:bg-pink-900/50 transition-all duration-200 hover:scale-105"
                          onClick={() => navigate("/notice")}
                        >
                          <div className="font-semibold text-gray-800 dark:text-white">
                            공지사항
                          </div>
                          <div className="size-font-xxxs text-gray-600 dark:text-gray-300">
                            최신 공지 및 업데이트
                          </div>
                        </div>
                        <div
                          className="cursor-pointer p-3 rounded-lg bg-cyan-50 dark:bg-cyan-900/30 hover:bg-cyan-100 dark:hover:bg-cyan-900/50 transition-all duration-200 hover:scale-105"
                          onClick={() => navigate("/mini")}
                        >
                          <div className="font-semibold text-gray-800 dark:text-white">
                            유저 코멘트
                          </div>
                          <div className="size-font-xxxs text-gray-600 dark:text-gray-300">
                            사용자 의견 및 피드백
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Settings Section */}
                    <div className="space-y-3 px-2">
                      <h3 className="size-font-xxs font-bold text-gray-800 dark:text-white border-b-2 border-gray-500 pb-2">
                        ⚙️ 설정
                      </h3>
                      <div className="space-y-2">
                        <div
                          className="cursor-pointer p-3 rounded-lg bg-gray-50 dark:bg-gray-900/30 hover:bg-gray-100 dark:hover:bg-gray-900/50 transition-all duration-200 hover:scale-105"
                          onClick={() => dispatch(toggleDarkMode())}
                        >
                          <div className="font-semibold text-gray-800 dark:text-white">
                            테마 설정
                          </div>
                          <div className="size-font-xxxs text-gray-600 dark:text-gray-300">
                            {darkMode ? "🌞 라이트 모드로 전환" : "🌙 다크 모드로 전환"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
            className={`fixed top-16 right-0 w-64 bg-white shadow-lg transform transition-transform duration-500 ease-out ${
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
