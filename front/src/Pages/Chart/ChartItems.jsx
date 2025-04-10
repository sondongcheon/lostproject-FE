import React from "react";
import { useMediaQuery } from "react-responsive";

import ChartItemsPage from "../../Chart/ChartItems";
import TChartItems from "../../Tablet/Chart/TChartItems";
import MChartItems from "../../Moblie/Chart/MChartItems";

function ChartItems(props) {
  const isMobile = useMediaQuery({
    query: "(max-width:468px)",
  });
  const isTablet = useMediaQuery({
    query: "(max-width:800px)",
  });

  return <div>{isMobile ? <MChartItems /> : isTablet ? <TChartItems /> : <ChartItemsPage />}</div>;
}

export default ChartItems;
