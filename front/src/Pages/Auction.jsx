import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";

import AuctionTierFour from "../Auction/AuctionTierFour";
import TauctionTierFour from "../Tablet/Auction/TauctionTierFour";
import MauctionTierFour from "../Moblie/Auction/MauctionTierFour";

function Auction({ getCountLog }) {
  const isMobile = useMediaQuery({
    query: "(max-width:468px)",
  });
  const isTablet = useMediaQuery({
    query: "(max-width:800px)",
  });

  return (
    <div>
      <div>
        {isMobile ? (
          <MauctionTierFour getCountLog={getCountLog} />
        ) : isTablet ? (
          <TauctionTierFour getCountLog={getCountLog} />
        ) : (
          <AuctionTierFour getCountLog={getCountLog} />
        )}
      </div>
    </div>
  );
}

export default Auction;
