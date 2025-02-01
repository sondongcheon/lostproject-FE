import React from "react";

const Menulist = ({ img, onClick, name }) => {
  return (
    <li onClick={onClick} className="commonHover flex">
      <img className="w-4" src={img} alt="" />
      {name}
    </li>
  );
};

export default Menulist;
