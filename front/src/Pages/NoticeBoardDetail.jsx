import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";

import PcBoardDetail from "../Board/BoardDetail";
import TBoardDetail from "../Tablet/Board/TBoardDetail";
import MBoardDetail from "../Moblie/Board/MBoardDetail";

function NoticeBoardDetail({}) {
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
          <MBoardDetail />
        ) : isTablet ? (
          <TBoardDetail />
        ) : (
          <PcBoardDetail />
        )}
      </div>
    </div>
  );
}

export default NoticeBoardDetail;
