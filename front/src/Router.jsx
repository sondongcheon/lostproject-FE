import { BrowserRouter, React, Route, Routes } from "react-router-dom";
import Main from "./Main/Main.jsx";
import MainNav from "./common/MainNav";
import AuctionTierFour from "./Auction/AuctionTierFour.jsx";
import MauctionTierFour from "./Moblie/Auction/MauctionTierFour.jsx";
import AuctionTierFourSup from "./Auction/AuctionTierFourSup.jsx";
import UseBasicInfo from "./Information/UseBasicInfo.jsx";
import NoticeBoard from "./Board/NoticeBoard.jsx";
import BoardDetail from "./Board/BoardDetail.jsx";
import MiniBoard from "./Board/MiniBoard.jsx";
import ChartMain from "./Chart/ChartMain.jsx";

import TestFour from "./Main/TestFour.jsx";
import { useState } from "react";
import axios from "axios";

function Router() {
  const [logSearch, setLogSearch] = useState([]);

  const getCountLog = () => {
    axios
      .get(`${process.env.REACT_APP_URL}/log/1`)
      .then((res) => {
        setLogSearch(res.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <BrowserRouter>
      <MainNav logSearch={logSearch} getCountLog={getCountLog} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/auctiontier4"
          element={<AuctionTierFour getCountLog={getCountLog} />}
        />
        <Route
          path="/mauctiontier4"
          element={<MauctionTierFour getCountLog={getCountLog} />}
        />
        <Route
          path="/auctiontier4sup"
          element={<AuctionTierFourSup getCountLog={getCountLog} />}
        />
        <Route path="/usebasicinfo" element={<UseBasicInfo />} />
        <Route path="/notice" element={<NoticeBoard />} />
        <Route path="/notice/:id" element={<BoardDetail />} />
        <Route path="/mini" element={<MiniBoard />} />
        <Route path="/chart" element={<ChartMain />} />

        <Route path="/test4" element={<TestFour />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
