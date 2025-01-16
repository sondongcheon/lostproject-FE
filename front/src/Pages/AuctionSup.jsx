import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";

import AuctionTierFourSup from "../Auction/AuctionTierFourSup";
import MauctionTierFourSup from "../Moblie/Auction/MacutionTierFourSup";

function AuctionSup({ getCountLog }) {
  const isMobile = useMediaQuery({
    query: "(max-width:468px)",
  });

  return (
    <div>
      <div>
        {isMobile ? (
          <MauctionTierFourSup getCountLog={getCountLog} />
        ) : (
          <AuctionTierFourSup getCountLog={getCountLog} />
        )}
      </div>
    </div>
  );
}

export default AuctionSup;
