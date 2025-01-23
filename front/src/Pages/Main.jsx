import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";

import MainPC from "../Main/Main";
import MainTablet from "../Tablet/Main/Main";
import MainMobile from "../Moblie/Main/Main";

function Main({}) {
  const isMobile = useMediaQuery({
    query: "(max-width:468px)",
  });
  const isTablet = useMediaQuery({
    query: "(max-width:800px)",
  });

  return (
    <div>
      <div>
        {isMobile ? <MainMobile /> : isTablet ? <MainTablet /> : <MainPC />}
      </div>
    </div>
  );
}

export default Main;
