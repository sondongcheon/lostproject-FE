import React from "react";
import { useMediaQuery } from "react-responsive";

import ResultSave from "@/Raid/Result/RaidSave";

function RaidSave(props) {
  const isMobile = useMediaQuery({
    query: "(max-width:468px)",
  });
  const isTablet = useMediaQuery({
    query: "(max-width:800px)",
  });

  return (
    <div>
      <div>{isMobile ? <ResultSave /> : isTablet ? <ResultSave /> : <ResultSave />}</div>
    </div>
  );
}

export default RaidSave;
