import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";

import PcSimulatorGem from "@/PC/Simulator/SimulatorGem";

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
      <PcSimulatorGem />
    </div>
  );
}

export default SimulatorGem;
