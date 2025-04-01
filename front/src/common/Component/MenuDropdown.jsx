import React from "react";
import { useNavigate } from "react-router-dom";

const MenuDropdown = ({}) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="bg-[#ECEBDE] pl-4 border-l-2 border-b-2 border-gray-500 space-y-4">
        <p onClick={() => navigate("/auction")}>🔎딜러악세 검색기</p>
        <p onClick={() => navigate("/auctionsup")}>🔎서폿악세 검색기</p>
        <p onClick={() => navigate("/chart")}>🖨시세 차트(악세)</p>
        <p onClick={() => navigate("/chartitems/book")}>🖨주요 아이템 차트</p>
        <p onClick={() => navigate("/notice")}>📖공지사항</p>
        <p onClick={() => navigate("/mini")}>📃유저 코멘트</p>
      </div>
    </div>
  );
};

export default MenuDropdown;
