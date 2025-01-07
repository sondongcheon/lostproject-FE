import React from "react";

import ServiceBox from "./Component/ServiceBox";

function Main(props) {
  const boxInfo = [
    {
      imgUrl: require("../Assets/jobIcon/gunslinger.png"),
      title: "딜러 악세 검색기",
      info: (
        <>
          인게임 경매장 매물을 검색합니다.
          <br />
          편리하게 여러 부위를 검색할 수 있습니다.
        </>
      ),
      clicklink: "/auctiontier4",
    },
    {
      imgUrl: require("../Assets/jobIcon/bard.png"),
      title: "서폿 악세 검색기",
      info: (
        <>
          인게임 경매장 매물을 검색합니다.
          <br />
          편리하게 여러 부위를 검색할 수 있습니다.
        </>
      ),
      clicklink: "/auctiontier4sup",
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
    // {
    //   imgUrl: require("../Assets/noticeIcon.png"),
    //   title: "개발 일지",
    //   info: "",
    //   clicklink: "/notice",
    // },
    // {
    //   imgUrl: "",
    //   title: "유저 코멘트",
    //   info: "",
    //   clicklink: "/mini",
    // },
    // {
    //   imgUrl: "",
    //   title: "",
    //   info: "",
    // },
  ];

  return (
    <div className="mainbody">
      <div>
        <br />
        <h1 className="mt-24 text-center text-3xl">주요 서비스</h1>
      </div>
      <div className="flex grid grid-cols-3">
        {boxInfo.map((box, index) => (
          <ServiceBox
            imgUrl={box.imgUrl}
            title={box.title}
            info={box.info}
            clicklink={box.clicklink}
          />
        ))}
      </div>
    </div>
  );
}

export default Main;
