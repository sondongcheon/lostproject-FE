import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";

import PcCustomGem from "@/PC/Simulator/CustomGem";
import MCustomGem from "@/Moblie/Simulator/CustomGem";

function SimulatorGem({}) {
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
          <MCustomGem />
        ) : isTablet ? (
          <PcCustomGem />
        ) : (
          <PcCustomGem />
        )}
      </div>
    </div>
  );
}

export default SimulatorGem;
