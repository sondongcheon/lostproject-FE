import React from "react";

const Menulist = ({ img, clickAction, name }) => {
  return (
    <li onClick={clickAction} className="commonHover flex my-2 size-font-xl">
      <img className="w-6" src={img} alt="" />
      {name}
    </li>
  );
};

export default Menulist;
