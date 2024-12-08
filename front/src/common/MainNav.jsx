import React from "react";

function MainNav(props) {
  return (
    <div>
      <div className="h-16 fixed top-0 left-0 w-full bg-gradient-to-r from-[#2384bc] to-[#b2ddad] shadow-md z-50">
        <div className="container mx-auto px-2 py-1 flex justify-between items-center h-full text-[#2b2b2b] font-bold">
          {/* 왼쪽에 'test' 홈페이지 링크 */}
          <h1 className="text-3xl cursor-pointer text-white">LostRoot</h1>

          {/* 오른쪽에 페이지 이동 공간 잡기 */}
          <div className="flex gap-4">
            <div className="cursor-pointer text-lg  hover:underline">딜러악세 검색기</div>
            <div className="cursor-pointer text-lg hover:underline">
              서폿악세 검색기(지금은 안됨)
            </div>
            <div className="cursor-pointer text-lg  hover:underline">
              사용방법 상세보기(지금은 안됨)
            </div>
            <div className="cursor-pointer text-lg hover:underline">
              시세 통계 확인하기(지금은 안됨)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainNav;
