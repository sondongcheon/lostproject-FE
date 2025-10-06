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
      imgUrl:
        "https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_9_25.png",
      title: "주요아이템 차트",
      info: (
        <>
          각인서, 보석, 젬 등 <br /> 주요 아이템의 가격 변화를 확인할 수
          있습니다.
        </>
      ),
      clicklink: "/chartitems/main",
    },
    {
      imgUrl:
        "https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_13_114.png",
      title: "젬 가공 시뮬레이터",
      info: (
        <>
          연습용 젬 가공 <br />
          시뮬레이터 입니다.
        </>
      ),
      clicklink: "/simulator/gem/1",
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
    <div className="min-h-screen">
      <div className="flex">
        <div className="mt-32 w-[15%]">
          <DisplayAds />
        </div>
        <div className="mainbody flex-1">
          {/* 서비스 박스 섹션 */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 mx-8 border border-slate-200 dark:border-slate-700">
            <div className="grid grid-cols-3 gap-4">
              {boxInfo.map((box, index) => (
                <ServiceBox
                  key={index}
                  imgUrl={box.imgUrl}
                  title={box.title}
                  info={box.info}
                  clicklink={box.clicklink}
                  css={
                    "shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl my-1 mx-8 "
                  }
                />
              ))}
            </div>
          </div>

          {/* 공지사항 섹션 */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 mx-8 mt-4 border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 border-b-2 border-slate-400 dark:border-slate-500 pb-1">
                최신 변경 사항
              </h2>
              <button
                className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                onClick={() => navigate("/notice")}
              >
                공지사항 바로가기
              </button>
            </div>
            <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-4 border border-slate-200 dark:border-slate-600">
              <BoardContent content={notice?.content} />
            </div>
          </div>
        </div>
        <div className="mt-32 w-[15%]">
          <DisplayAds />
        </div>
      </div>
    </div>
  );
}

export default Main;
