import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";

import MChartMain from "../Moblie/Chart/MChartMain";
import ChartMain from "../Chart/ChartMain";

function Chart({}) {
  const isMobile = useMediaQuery({
    query: "(max-width:468px)",
  });

  return (
    <div>
      <div>{isMobile ? <MChartMain /> : <ChartMain />}</div>
    </div>
  );
}

export default Chart;
