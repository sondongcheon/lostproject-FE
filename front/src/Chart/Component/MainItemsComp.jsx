import React, { useState } from "react";

import HeadKeyBox from "../../Auction/Component/HeadKeyBox";
import ServiceBox from "../../Main/Component/ServiceBox";

const MainItemsComp = () => {
  const [apiKey, setApiKey] = useState("");
  const [saveKey, setSaveKey] = useState(true);

  const boxInfo = [
    {
      imgUrl: "https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_9_25.png",
      title: "유물 각인서",
      info: <></>,
      clicklink: "/chartitems/book",
    },
    {
      imgUrl: "https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_12_105.png",
      title: "4T 보석",
      info: <></>,
      clicklink: "/chartitems/jewel",
    },
    {
      imgUrl: "https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_12_88.png",
      title: "재련 재료",
      info: <></>,
      clicklink: "/chartitems/items",
    },
  ];
  return (
    <div>
      <div className="mx-auto w-4/5">
        <HeadKeyBox
          apiKey={apiKey}
          setApiKey={setApiKey}
          saveKey={saveKey}
          setSaveKey={setSaveKey}
        ></HeadKeyBox>
      </div>
      <div className="flex grid grid-cols-4">
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
};

export default MainItemsComp;
