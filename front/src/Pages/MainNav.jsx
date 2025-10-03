import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";

import NavPC from "@/PC/Main/MainNav";
import NavTablet from "@/Tablet/Main/MainNav";
import NavMobile from "@/Moblie/Main/MainNav";

function MainNav({ logSearch, getCountLog }) {
  const isMobile = useMediaQuery({
    query: "(max-width:468px)",
  });
  const isTablet = useMediaQuery({
    query: "(max-width:800px)",
  });

  return (
    <div>
      <div>
        {isMobile ? (
          <NavMobile logSearch={logSearch} getCountLog={getCountLog} />
        ) : isTablet ? (
          <NavTablet logSearch={logSearch} getCountLog={getCountLog} />
        ) : (
          <NavPC logSearch={logSearch} getCountLog={getCountLog} />
        )}
      </div>
    </div>
  );
}

export default MainNav;
