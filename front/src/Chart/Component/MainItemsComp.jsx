import React, { useState } from "react";
import ServiceBox from "../../Main/Component/ServiceBox";

const MainItemsComp = () => {
  const boxInfo = [
    {
      imgUrl:
        "https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_9_25.png",
      title: "유물 각인서",
      info: <></>,
      clicklink: "/chartitems/items/1",
    },
    {
      imgUrl:
        "https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_12_105.png",
      title: "4T 보석",
      info: <></>,
      clicklink: "/chartitems/jewel",
    },
    {
      imgUrl:
        "https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_12_88.png",
      title: "재련 재료",
      info: <></>,
      clicklink: "/chartitems/items/2",
    },
    {
      imgUrl:
        "https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_13_114.png",
      title: "젬",
      info: <></>,
      clicklink: "/chartitems/items/3",
    },
  ];
  return (
    <div>
      <div className="flex grid grid-cols-4">
        {boxInfo.map((box, index) => (
          <ServiceBox
            key={index}
            imgUrl={box.imgUrl}
            title={box.title}
            info={box.info}
            clicklink={box.clicklink}
            css={"mainIconHover mx-8"}
          />
        ))}
      </div>
    </div>
  );
};

export default MainItemsComp;
