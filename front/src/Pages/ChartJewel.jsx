import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";

import ChartJewelPage from "../Chart/ChartJewel";
import TChartJewel from "../Tablet/Chart/TChartJewel";
import MChartJewel from "../Moblie/Chart/MChartJewel";

function ChartJewel(props) {
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
      <div className="">
        {isMobile ? (
          <MChartJewel request={request} setRequest={setRequest} />
        ) : isTablet ? (
          <TChartJewel request={request} setRequest={setRequest} />
        ) : (
          <ChartJewelPage request={request} setRequest={setRequest} />
        )}
      </div>
    </div>
  );
}

export default ChartJewel;
