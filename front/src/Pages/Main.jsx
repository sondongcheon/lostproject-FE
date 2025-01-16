import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";

import MainPC from "../Main/Main";
import MainMobile from "../Moblie/Main/Main";

function Main({}) {
  const isMobile = useMediaQuery({
    query: "(max-width:468px)",
  });

  return (
    <div>
      <div>{isMobile ? <MainMobile /> : <MainPC />}</div>
    </div>
  );
}

export default Main;
