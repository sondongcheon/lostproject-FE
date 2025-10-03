import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "@/store/settingsSlice.js";

import MenuDropdown from "../../common/Component/MenuDropdown";
import ModalApiKey from "../../common/Component/ModalApiKey";

function MainNav({ logSearch, getCountLog }) {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.settings.darkMode);
  const navigate = useNavigate();

  // 각 메뉴별 hover 상태 관리
  const [hoveredMenu, setHoveredMenu] = useState(null);

  useEffect(() => {
    getCountLog();
  }, []);

  // 각 메뉴별 드롭다운 컴포넌트
  const DropdownMenu = ({ menuType, isVisible }) => {
    if (!isVisible) return null;

    const menuItems = {
      api: (
        <div className="p-4">
          <h3 className="text-sm font-bold text-gray-800 dark:text-white border-b-2 border-gray-500 pb-2 mb-3">
            🔑 API KEY 설정
          </h3>
          <div className="space-y-2">
            <div className="cursor-pointer p-3 rounded-lg bg-gray-50 dark:bg-gray-900/30 hover:bg-gray-100 dark:hover:bg-gray-900/50 transition-all duration-200">
              <div className="font-semibold text-gray-800 dark:text-white text-sm">
                API KEY 관리
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-300">로아 API KEY 설정</div>
            </div>
            <div className="cursor-pointer p-3 rounded-lg bg-gray-50 dark:bg-gray-900/30 hover:bg-gray-100 dark:hover:bg-gray-900/50 transition-all duration-200">
              <div className="font-semibold text-gray-800 dark:text-white text-sm">검색 통계</div>
              <div className="text-xs text-gray-600 dark:text-gray-300">
                <div>TodaySearch : {logSearch[1] || 0}</div>
                <div>TotalSearch : {logSearch[0] || 0}</div>
              </div>
            </div>
          </div>
        </div>
      ),
      search: (
        <div className="p-4">
          <h3 className="text-sm font-bold text-gray-800 dark:text-white border-b-2 border-blue-500 pb-2 mb-3">
            🔍 검색 도구
          </h3>
          <div className="space-y-2">
            <div
              className="cursor-pointer p-3 rounded-lg bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all duration-200"
              onClick={() => navigate("/auction")}
            >
              <div className="font-semibold text-gray-800 dark:text-white text-sm">
                딜러악세 검색기
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-300">딜러용 악세사리 검색</div>
            </div>
            <div
              className="cursor-pointer p-3 rounded-lg bg-green-50 dark:bg-green-900/30 hover:bg-green-100 dark:hover:bg-green-900/50 transition-all duration-200"
              onClick={() => navigate("/auctionsup")}
            >
              <div className="font-semibold text-gray-800 dark:text-white text-sm">
                서폿악세 검색기
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-300">서포터용 악세사리 검색</div>
            </div>
          </div>
        </div>
      ),
      chart: (
        <div className="p-4">
          <h3 className="text-sm font-bold text-gray-800 dark:text-white border-b-2 border-purple-500 pb-2 mb-3">
            📊 차트 도구
          </h3>
          <div className="space-y-2">
            <div
              className="cursor-pointer p-3 rounded-lg bg-purple-50 dark:bg-purple-900/30 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-all duration-200"
              onClick={() => navigate("/chart")}
            >
              <div className="font-semibold text-gray-800 dark:text-white text-sm">
                시세 차트(악세)
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-300">악세사리 가격 추이</div>
            </div>
            <div
              className="cursor-pointer p-3 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-all duration-200"
              onClick={() => navigate("/chartitems/main")}
            >
              <div className="font-semibold text-gray-800 dark:text-white text-sm">
                주요 아이템 차트
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-300">주요 아이템 가격 추이</div>
            </div>
          </div>
        </div>
      ),
      simulator: (
        <div className="p-4">
          <h3 className="text-sm font-bold text-gray-800 dark:text-white border-b-2 border-orange-500 pb-2 mb-3">
            ⚙️ 시뮬레이터
          </h3>
          <div className="space-y-2">
            <div
              className="cursor-pointer p-3 rounded-lg bg-orange-50 dark:bg-orange-900/30 hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-all duration-200"
              onClick={() => navigate("/simulator/gem/1")}
            >
              <div className="font-semibold text-gray-800 dark:text-white text-sm">
                젬 가공 시뮬레이터
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-300">젬 가공 시뮬레이션</div>
            </div>
          </div>
        </div>
      ),
      community: (
        <div className="p-4">
          <h3 className="text-sm font-bold text-gray-800 dark:text-white border-b-2 border-pink-500 pb-2 mb-3">
            👥 커뮤니티
          </h3>
          <div className="space-y-2">
            <div
              className="cursor-pointer p-3 rounded-lg bg-pink-50 dark:bg-pink-900/30 hover:bg-pink-100 dark:hover:bg-pink-900/50 transition-all duration-200"
              onClick={() => navigate("/notice")}
            >
              <div className="font-semibold text-gray-800 dark:text-white text-sm">공지사항</div>
              <div className="text-xs text-gray-600 dark:text-gray-300">최신 공지 및 업데이트</div>
            </div>
            <div
              className="cursor-pointer p-3 rounded-lg bg-cyan-50 dark:bg-cyan-900/30 hover:bg-cyan-100 dark:hover:bg-cyan-900/50 transition-all duration-200"
              onClick={() => navigate("/mini")}
            >
              <div className="font-semibold text-gray-800 dark:text-white text-sm">유저 코멘트</div>
              <div className="text-xs text-gray-600 dark:text-gray-300">사용자 의견 및 피드백</div>
            </div>
          </div>
        </div>
      ),
      settings: (
        <div className="p-4">
          <h3 className="text-sm font-bold text-gray-800 dark:text-white border-b-2 border-gray-500 pb-2 mb-3">
            ⚙️ 설정
          </h3>
          <div className="space-y-2">
            <div
              className="cursor-pointer p-3 rounded-lg bg-gray-50 dark:bg-gray-900/30 hover:bg-gray-100 dark:hover:bg-gray-900/50 transition-all duration-200"
              onClick={() => dispatch(toggleDarkMode())}
            >
              <div className="font-semibold text-gray-800 dark:text-white text-sm">테마 설정</div>
              <div className="text-xs text-gray-600 dark:text-gray-300">
                {darkMode ? "🌞 라이트 모드로 전환" : "🌙 다크 모드로 전환"}
              </div>
            </div>
          </div>
        </div>
      ),
    };

    return (
      <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
        {menuItems[menuType]}
      </div>
    );
  };

  return (
    <div>
      <div className="fixed top-0 left-0 w-full z-50">
        {/* Main NavBar */}
        <div>
          <div className="h-full group transition-all duration-300">
            <div className="container h-16 mx-auto px-2 py-1 flex items-center w-full bg-gradient-to-r from-[#2384bc] to-[#b2ddad] dark:from-[#1B4F72] dark:to-[#5C8F5A] shadow-md text-[#2b2b2b] dark:text[#2b2b2b] font-bold">
              {/* 왼쪽에 'test' 홈페이지 링크 */}
              <span
                className="w-72 text-3xl cursor-pointer text-white dark:text-black font-a "
                onClick={() => navigate("/")}
              >
                LoaRoot <span className="size-font-xxxs">[Ver 2.6.1]</span>
              </span>

              <div className="w-full relative">
                <div className="grid grid-cols-6 px-12 gap-x-4">
                  {/* API KEY 메뉴 */}
                  <div
                    className="relative flex items-center justify-center transition-all duration-300 hover:underline hover:scale-110"
                    onMouseEnter={() => setHoveredMenu("api")}
                  >
                    <ModalApiKey />
                    <div onMouseLeave={() => setHoveredMenu(null)}>
                      <DropdownMenu menuType="api" isVisible={hoveredMenu === "api"} />
                    </div>
                  </div>

                  {/* 검색 도구 카테고리 */}
                  <div
                    className="relative cursor-pointer text-base hover:underline size-font-xxs transition-all duration-300 hover:scale-110 py-2 rounded-lg flex items-center justify-center"
                    onMouseEnter={() => setHoveredMenu("search")}
                  >
                    🔍 검색 도구
                    <div onMouseLeave={() => setHoveredMenu(null)}>
                      <DropdownMenu menuType="search" isVisible={hoveredMenu === "search"} />
                    </div>
                  </div>

                  {/* 차트 도구 카테고리 */}
                  <div
                    className="relative cursor-pointer text-base hover:underline size-font-xxs transition-all duration-300 hover:scale-110 py-2 rounded-lg flex items-center justify-center"
                    onMouseEnter={() => setHoveredMenu("chart")}
                  >
                    📊 차트 도구
                    <div onMouseLeave={() => setHoveredMenu(null)}>
                      <DropdownMenu menuType="chart" isVisible={hoveredMenu === "chart"} />
                    </div>
                  </div>

                  {/* 시뮬레이터 카테고리 */}
                  <div
                    className="relative cursor-pointer text-base hover:underline size-font-xxs transition-all duration-300 hover:scale-110 py-2 rounded-lg flex items-center justify-center"
                    onMouseEnter={() => setHoveredMenu("simulator")}
                  >
                    ⚙️ 시뮬레이터
                    <div onMouseLeave={() => setHoveredMenu(null)}>
                      <DropdownMenu menuType="simulator" isVisible={hoveredMenu === "simulator"} />
                    </div>
                  </div>

                  {/* 커뮤니티 카테고리 */}
                  <div
                    className="relative cursor-pointer text-base hover:underline size-font-xxs transition-all duration-300 hover:scale-110 py-2 rounded-lg flex items-center justify-center"
                    onMouseEnter={() => setHoveredMenu("community")}
                  >
                    👥 커뮤니티
                    <div onMouseLeave={() => setHoveredMenu(null)}>
                      <DropdownMenu menuType="community" isVisible={hoveredMenu === "community"} />
                    </div>
                  </div>

                  {/* 설정 메뉴 */}
                  <div
                    className="relative flex items-center justify-center"
                    onMouseEnter={() => setHoveredMenu("settings")}
                  >
                    <button
                      onClick={() => dispatch(toggleDarkMode())}
                      className="size-font-xxs transition-all duration-300 hover:underline hover:scale-110"
                    >
                      {darkMode ? "🌞 라이트(BETA)" : "🌙 다크(BETA)"}
                    </button>
                    <div onMouseLeave={() => setHoveredMenu(null)}>
                      <DropdownMenu menuType="settings" isVisible={hoveredMenu === "settings"} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainNav;
