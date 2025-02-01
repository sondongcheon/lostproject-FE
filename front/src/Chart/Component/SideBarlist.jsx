import React from "react";

const SideBarlist = ({ img, onClick, name }) => {
  return (
    <li onClick={onClick} className="commonHover flex">
      <img className="w-7" src={img} alt="" />
      {name}
    </li>
  );
};

export default SideBarlist;
