import React from "react";

const Menulist = ({ img, clickAction, name }) => {
  return (
    <li
      onClick={clickAction}
      className="commonHover size-font-sm flex my-2 size-font-xl"
    >
      <img className="w-8" src={img} alt="" />
      {name}
    </li>
  );
};

export default Menulist;
