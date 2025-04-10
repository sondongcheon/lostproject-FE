import React from "react";
import { useMediaQuery } from "react-responsive";

import ChartItemsMain from "../../Chart/ChartItemsMain";
import TChartItemsMain from "../../Tablet/Chart/TChartItemsMain";
import MChartItemsMain from "../../Moblie/Chart/MChartItemsMain";

function ChartMain(props) {
  const isMobile = useMediaQuery({
    query: "(max-width:468px)",
  });
  const isTablet = useMediaQuery({
    query: "(max-width:800px)",
  });

  return (
    <div>
      <div className="">
        {isMobile ? <MChartItemsMain /> : isTablet ? <TChartItemsMain /> : <ChartItemsMain />}
      </div>
    </div>
  );
}

export default ChartMain;
