import React from "react";
import { useMediaQuery } from "react-responsive";

import MChartMain from "../Moblie/Chart/MChartMain";
import TChartMain from "../Tablet/Chart/TChartMain";
import ChartMain from "../Chart/ChartMain";

function Chart({}) {
  const isMobile = useMediaQuery({
    query: "(max-width:468px)",
  });
  const isTablet = useMediaQuery({
    query: "(max-width:800px)",
  });

  return (
    <div>
      <div>{isMobile ? <MChartMain /> : isTablet ? <TChartMain /> : <ChartMain />}</div>
    </div>
  );
}

export default Chart;
