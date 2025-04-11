import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const ServiceBox = ({ imgUrl, title, info, clicklink }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div
        className="flex flex-col items-center justify-center rounded-2xl h-[200px] m-8 p-8 bg-white commonHover"
        onClick={() => navigate(clicklink)}
      >
        <img className="w-10 h-10" src={imgUrl} alt="" />
        <p className="text-center text-xl border-b-2 border-gray-500"> {title}</p>
        <p className="text-center">{info}</p>
      </div>
    </div>
  );
};

export default ServiceBox;
