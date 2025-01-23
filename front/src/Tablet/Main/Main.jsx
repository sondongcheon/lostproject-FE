import React from "react";

import ServiceBox from "./Component/ServiceBox";

function Main(props) {
  const boxInfo = [
    {
      imgUrl: require("../../Assets/jobIcon/gunslinger.png"),
      title: "딜러 악세 검색기",
      info: (
        <>
          인게임 경매장 매물을 검색합니다.
          <br />
          편리하게 여러 부위를 검색할 수 있습니다.
        </>
      ),
      clicklink: "/auction",
    },
    {
      imgUrl: require("../../Assets/jobIcon/bard.png"),
      title: "서폿 악세 검색기",
      info: (
        <>
          인게임 경매장 매물을 검색합니다.
          <br />
          편리하게 여러 부위를 검색할 수 있습니다.
        </>
      ),
      clicklink: "/auctionsup",
    },
    {
      imgUrl: require("../../Assets/chartIcon.png"),
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
  ];

  return (
    <div className="mainMobileBody">
      <div>
        <br />
        <h1 className="text-center text-3xl">주요 서비스</h1>
      </div>
      <div className="">
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
