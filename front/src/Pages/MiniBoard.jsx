import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";

import PcMiniBoard from "../Board/MiniBoard";
import TMiniBoard from "../Tablet/Board/TMiniBoard";
import MMiniBoard from "../Moblie/Board/MMiniBoard";

function MiniBoard({}) {
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
          <MMiniBoard />
        ) : isTablet ? (
          <TMiniBoard />
        ) : (
          <PcMiniBoard />
        )}
      </div>
    </div>
  );
}

export default MiniBoard;
