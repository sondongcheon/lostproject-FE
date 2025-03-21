import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";

import ChartBook from "../Chart/ChartBook";
import TChartBook from "../Tablet/Chart/TChartBook";
import MChartBook from "../Moblie/Chart/MChartBook";

function ChartItems(props) {
  const isMobile = useMediaQuery({
    query: "(max-width:468px)",
  });
  const isTablet = useMediaQuery({
    query: "(max-width:800px)",
  });

  return (
    <div>
      <div className="">
        {isMobile ? <MChartBook /> : isTablet ? <TChartBook /> : <ChartBook />}
      </div>
    </div>
  );
}

export default ChartItems;
