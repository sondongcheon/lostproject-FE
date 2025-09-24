import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";

import PcCustomGem from "@/PC/Simulator/CustomGem";

function SimulatorGem({}) {
  const isMobile = useMediaQuery({
    query: "(max-width:468px)",
  });
  const isTablet = useMediaQuery({
    query: "(max-width:800px)",
  });

  return (
    <div>
      {/* <div>
        {isMobile ? (
          <MNoticeBoard />
        ) : isTablet ? (
          <TNoticeBoard />
        ) : (
          <PcNoticeBoard />
        )}
      </div> */}
      <PcCustomGem />
    </div>
  );
}

export default SimulatorGem;
