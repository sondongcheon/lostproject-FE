import React, { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

import ServiceBox from "./Component/ServiceBox";
import BoardContent from "../Board/Component/BoardContent";
import DisplayAds from "../common/Component/DisplayAds";

function Main(props) {
  const navigate = useNavigate();
  const [notice, setNotice] = useState("");

  const boxInfo = [
    {
      imgUrl: require("../Assets/jobIcon/gunslinger.png"),
      title: "딜러 악세 검색기",
      info: (
        <>
          인게임 경매장을 검색합니다.
          <br />
          편리하게 여러 부위를 검색할 수 있습니다.
        </>
      ),
      clicklink: "/auction",
    },
    {
      imgUrl: require("../Assets/jobIcon/bard.png"),
      title: "서폿 악세 검색기",
      info: (
        <>
          인게임 경매장을 검색합니다.
          <br />
          편리하게 여러 부위를 검색할 수 있습니다.
        </>
      ),
      clicklink: "/auctionsup",
    },
    {
      imgUrl: require("../Assets/chartIcon.png"),
      title: "시세 차트",
      info: (
        <>
          주요 옵션의 가격 변화를 확인할 수 있습니다.
          <br />
          기준은 품질 80입니다.
        </>
      ),
      clicklink: "/chart",
    },
    {
      imgUrl: "https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_9_25.png",
      title: "주요아이템 차트",
      info: (
        <>
          각인서, 보석 등 <br /> 주요 아이템의 가격 변화를 확인할 수 있습니다.
        </>
      ),
      clicklink: "/chartitems/main",
    },
  ];

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/board/notice/last`, {})
      .then((res) => {
        setNotice(res.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="flex">
      <div className="mt-32 w-[15%]">
        <DisplayAds />
      </div>
      <div className="mainbody">
        <div className="grid grid-cols-2">
          <div>
            <div className="mt-20 flex grid grid-cols-2">
              {boxInfo.map((box, index) => (
                <ServiceBox
                  imgUrl={box.imgUrl}
                  title={box.title}
                  info={box.info}
                  clicklink={box.clicklink}
                  css={"shadow-2xl mainIconHover "}
                />
              ))}
            </div>
          </div>
          <div>
            <br />
            <div className="flex justify-between">
              <span className=" m-4 text-center text-2xl border-b-4 border-[#b2ddad]">
                최신 변경 사항
              </span>
              <span
                className="m-4 text-center text-2xl border-b-4 border-[#b2ddad] cursor-pointer hover:border-black transition-all duration-500"
                onClick={() => navigate("/notice")}
              >
                공지사항 바로가기
              </span>
            </div>
            <BoardContent content={notice?.content} />
          </div>
        </div>
      </div>
      <div className="mt-32 w-[15%]">
        <DisplayAds />
      </div>
    </div>
  );
}

export default Main;
