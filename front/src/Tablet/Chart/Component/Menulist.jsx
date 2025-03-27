import React from "react";

const Menulist = ({ img, clickAction, name }) => {
  return (
    <li onClick={clickAction} className=" commonHover items-center flex my-1">
      <img className="w-8" src={img} alt="" />
      {name}
    </li>
  );
};

export default Menulist;
