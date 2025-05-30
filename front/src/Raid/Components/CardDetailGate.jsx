import React, { useState } from "react";

import { FaCrown } from "react-icons/fa6";
import { TbSwords } from "react-icons/tb";
import { TbSword } from "react-icons/tb";

import GateDetailDate from "./GateDetailDate";

const CardDetailGate = ({ data }) => {
  const [detail, setDetail] = useState(false);
  return (
    <div className="border-double border-t-4">
      <div className="flex justify-center items-center text-sm">
        {data.map(
          (data, index) =>
            Object.keys(data.resultKind).length > 0 && (
              <div>
                <div
                  className="flex items-center justify-center"
                  onClick={() => {
                    setDetail(!detail);
                    console.log(data);
                  }}
                >
                  {index}관문 - <FaCrown /> MVP {data.mvp} 회 &nbsp;| &nbsp;{" "}
                  {Object.entries(data.resultKind).map(([key, value], index) => (
                    <div key={index} className="flex items-center">
                      <TbSwords /> {key} {value}회 &nbsp;| &nbsp;{" "}
                    </div>
                  ))}
                </div>
                {detail &&
                  data.resultDetailList.map((data, index) => (
                    <GateDetailDate key={index} data={data} />
                  ))}
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default CardDetailGate;
