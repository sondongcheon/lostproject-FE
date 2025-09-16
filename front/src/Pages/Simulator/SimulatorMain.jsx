import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";

import PcSimulatorMain from "@/PC/Simulator/SimulatorMain";

function SimulatorMain({}) {
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
      <PcSimulatorMain />
    </div>
  );
}

export default SimulatorMain;
