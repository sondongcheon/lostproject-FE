import React from "react";

const SideBarlist = ({ img, clickAction, name }) => {
  return (
    <li onClick={clickAction} className="commonHover items-center flex my-1">
      <img className="w-7" src={img} alt="" />
      {name}
    </li>
  );
};

export default SideBarlist;
