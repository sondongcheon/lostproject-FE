import React from "react";

const ServiceBox = ({ imgUrl, title, info }) => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center rounded-3xl h-[200px] m-8 p-8 bg-white commonHover">
        <img className="w-10 h-10" src={imgUrl} alt="" />
        <p className="text-center text-xl border-b-2 border-gray-500">
          {" "}
          {title}
        </p>
        <p className="text-center">{info}</p>
      </div>
    </div>
  );
};

export default ServiceBox;
