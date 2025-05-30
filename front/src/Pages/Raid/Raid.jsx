import React from "react";
import { useMediaQuery } from "react-responsive";

import RaidMain from "@/Raid/RaidMain";

function Raid(props) {
  const isMobile = useMediaQuery({
    query: "(max-width:468px)",
  });
  const isTablet = useMediaQuery({
    query: "(max-width:800px)",
  });

  return (
    <div>
      <div>{isMobile ? <RaidMain /> : isTablet ? <RaidMain /> : <RaidMain />}</div>
    </div>
  );
}

export default Raid;
