import React from "react";
import { useMediaQuery } from "react-responsive";

import ChartItemsPage from "../../Chart/ChartItems";

function ChartItems(props) {
  const isMobile = useMediaQuery({
    query: "(max-width:468px)",
  });
  const isTablet = useMediaQuery({
    query: "(max-width:800px)",
  });

  return (
    <div>{isMobile ? <ChartItemsPage /> : isTablet ? <ChartItemsPage /> : <ChartItemsPage />}</div>
  );
}

export default ChartItems;
