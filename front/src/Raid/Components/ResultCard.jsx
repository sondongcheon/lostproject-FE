import React, { useState } from "react";

import moredom from "@/Assets/raid/moredom.webp";
import moredom2 from "@/Assets/raid/moredom.png";

import CardDetailGate from "./CardDetailGate";

import { FaCrown } from "react-icons/fa6";
import { TbSwords } from "react-icons/tb";
import { TbSword } from "react-icons/tb";

const ResultCard = ({ data }) => {
  const [detail, setDetail] = useState(false);
  return (
    <div>
      <div className="mx-16 my-4 border-2 rounded-xl">
        <div className="flex">
          <img
            className="rounded-tl-xl"
            src={require(`@/Assets/raid/${data.raidCode}.png`)}
            alt="이미지"
          />
          <div className="m-auto space-y-4 text-xl" onClick={() => setDetail(!detail)}>
            <div className="flex items-center">
              <FaCrown />
              MVP {data.mvp}회
            </div>
            {Object.entries(data.resultKind).map(([key, value], index) => (
              <div key={index} className="flex items-center">
                <TbSwords /> {key} {value}회
              </div>
            ))}
          </div>
        </div>

        {detail && <CardDetailGate data={data.gateDetail} />}
      </div>
    </div>
  );
};

export default ResultCard;
