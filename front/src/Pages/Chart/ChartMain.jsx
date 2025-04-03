import React from "react";
import { useMediaQuery } from "react-responsive";

import ChartItemsMain from "../../Chart/ChartItemsMain";

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
        {isMobile ? <ChartItemsMain /> : isTablet ? <ChartItemsMain /> : <ChartItemsMain />}
      </div>
    </div>
  );
}

export default ChartMain;
