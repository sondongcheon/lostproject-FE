import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";

import PcNoticeBoard from "../Board/NoticeBoard";
import TNoticeBoard from "../Tablet/Board/TNoticeBoard";
import MNoticeBoard from "../Moblie/Board/MNoticeBoard";

function NoticeBoard({}) {
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
          <MNoticeBoard />
        ) : isTablet ? (
          <TNoticeBoard />
        ) : (
          <PcNoticeBoard />
        )}
      </div>
    </div>
  );
}

export default NoticeBoard;
