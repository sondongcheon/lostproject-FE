import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const ServiceBox = ({ imgUrl, title, info, clicklink, css }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div
        className={`flex flex-col items-center justify-center rounded-lg h-[200px] my-4 mx-auto p-4 lg:m-8 lg:p-8 bg-white ${css}`}
        onClick={() => navigate(clicklink)}
      >
        <img className="w-8 h-8 lg:w-10 lg:h-10" src={imgUrl} alt="" />
        <p className="text-center text-xl border-b-2 border-gray-500"> {title}</p>
        <p className="text-center">{info}</p>
      </div>
    </div>
  );
};

export default ServiceBox;
