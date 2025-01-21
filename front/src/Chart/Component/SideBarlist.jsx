import React from "react";

const SideBarlist = ({ img, onClick, name }) => {
  return (
    <li onClick={onClick} className="commonHover flex">
      <img className="w-8" src={img} alt="" />
      {name}
    </li>
  );
};

export default SideBarlist;
