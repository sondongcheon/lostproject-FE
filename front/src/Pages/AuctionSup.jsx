import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";

import AuctionTierFourSup from "../Auction/AuctionTierFourSup";
import TauctionTierFourSup from "../Tablet/Auction/TacutionTierFourSup";
import MauctionTierFourSup from "../Moblie/Auction/MacutionTierFourSup";

function AuctionSup({ getCountLog }) {
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
          <MauctionTierFourSup getCountLog={getCountLog} />
        ) : isTablet ? (
          <TauctionTierFourSup getCountLog={getCountLog} />
        ) : (
          <AuctionTierFourSup getCountLog={getCountLog} />
        )}
      </div>
    </div>
  );
}

export default AuctionSup;
