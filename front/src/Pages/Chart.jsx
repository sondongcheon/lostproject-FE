import React, { useState } from "react";
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

  const [request, setRequest] = useState({
    time: 1,
    point: 15,
  });

  return (
    <div>
      <div>
        {isMobile ? (
          <MChartMain request={request} setRequest={setRequest} />
        ) : isTablet ? (
          <TChartMain request={request} setRequest={setRequest} />
        ) : (
          <ChartMain request={request} setRequest={setRequest} />
        )}
      </div>
    </div>
  );
}

export default Chart;
