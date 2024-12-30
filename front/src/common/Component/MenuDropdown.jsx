import React from "react";
import { useNavigate } from "react-router-dom";

const MenuDropdown = ({}) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="bg-white">
        <li onClick={() => navigate("/auctiontier4")}>딜러악세 검색기</li>
        <li onClick={() => navigate("/auctiontier4sup")}>서폿악세 검색기</li>
        <li onClick={() => navigate("/notice")}>개발일지</li>
        <li onClick={() => navigate("/mini")}>유저 코멘트</li>
      </div>
    </div>
  );
};

export default MenuDropdown;
