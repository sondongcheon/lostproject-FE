import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import MenuDropdown from "./Component/MenuDropdown";

function MainNav({ logSearch, getCountLog }) {
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
      <div className="h-16 fixed top-0 left-0 w-full bg-gradient-to-r from-[#2384bc] to-[#b2ddad] shadow-md z-50">
        <div className="container mx-auto px-2 py-1 flex justify-between items-center h-full text-[#2b2b2b] font-bold ">
          {/* 왼쪽에 'test' 홈페이지 링크 */}
          <span className="text-3xl cursor-pointer text-white font-a" onClick={() => navigate("/")}>
            LoaRoot <span className="size-font-xxxs">[Ver 2.3.2]</span>
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
            <div className="flex gap-10">
              <div
                className="cursor-pointer text-base hover:underline size-font-xxxs"
                onClick={() => navigate("/auction")}
              >
                딜러악세 검색기
              </div>
              <div
                className="cursor-pointer text-base hover:underline size-font-xxxs"
                onClick={() => navigate("/auctionsup")}
              >
                서폿악세 검색기
              </div>
              <div
                className="cursor-pointer text-base hover:underline size-font-xxxs"
                onClick={() => navigate("/chart")}
              >
                시세 차트(악세)
              </div>
              <div
                className="cursor-pointer text-base hover:underline size-font-xxxs"
                onClick={() => navigate("/chartitems/main")}
              >
                주요 아이템 차트
              </div>
              <div
                className="cursor-pointer text-base hover:underline size-font-xxxs"
                onClick={() => navigate("/notice")}
              >
                공지사항
              </div>
              <div
                className="cursor-pointer text-base hover:underline size-font-xxxs"
                onClick={() => navigate("/mini")}
              >
                유저 코멘트
              </div>
            </div>
          )}
        </div>
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
          <div className="container mx-auto sm:px-28 px-8 py-4 flex justify-end h-full text-[#191919] sm:text-sm text-[12px] font-a gap-x-10 z-49">
            <span>TodaySearch : {logSearch[1]} </span>
            <span>TotalSearch : {logSearch[0]}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainNav;
