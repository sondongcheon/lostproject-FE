import React from "react";

const SideBarlist = ({ img, clickAction, name }) => {
  return (
    <li className="h-10 overflow-hidden flex items-center">
      <div onClick={clickAction} className="mx-2 commonHover flex items-center w-full">
        <img className="w-7" src={img} alt="" />
        {name}
      </div>
    </li>
  );
};

export default SideBarlist;
