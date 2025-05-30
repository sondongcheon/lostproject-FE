import React from "react";
import { useMediaQuery } from "react-responsive";

import ResultMain from "@/Raid/Result/ResultMain";

function Result(props) {
  const isMobile = useMediaQuery({
    query: "(max-width:468px)",
  });
  const isTablet = useMediaQuery({
    query: "(max-width:800px)",
  });

  return (
    <div>
      <div>{isMobile ? <ResultMain /> : isTablet ? <ResultMain /> : <ResultMain />}</div>
    </div>
  );
}

export default Result;
