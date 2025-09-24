import { BrowserRouter, React, Route, Routes } from "react-router-dom";
import Main from "./Pages/Main.jsx";
import MainNav from "./common/MainNav";
import Footer from "./common/Footer.jsx";
import Auction from "./Pages/Auction.jsx";
import AuctionSup from "./Pages/AuctionSup.jsx";
import UseBasicInfo from "./Information/UseBasicInfo.jsx";
import NoticeBoard from "./Pages/NoticeBoard.jsx";
import NoticeBoardDetail from "./Pages/NoticeBoardDetail.jsx";
import MiniBoard from "./Pages/MiniBoard.jsx";
import Chart from "./Pages/Chart.jsx";
import SimulatorMain from "./Pages/Simulator/SimulatorMain.jsx";
import SimulatorGem from "@/Pages/Simulator/SimulatorGem.jsx";
import CustomGem from "@/Pages/Simulator/CustomGem.jsx";
import ChartItemsMain from "./Pages/Chart/ChartMain.jsx";
import ChartItems from "./Pages/Chart/ChartItems.jsx";
import ChartJewel from "./Pages/ChartJewel.jsx";

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
          path="/auction"
          element={<Auction getCountLog={getCountLog} />}
        />
        <Route
          path="/auctionsup"
          element={<AuctionSup getCountLog={getCountLog} />}
        />
        <Route path="/usebasicinfo" element={<UseBasicInfo />} />
        <Route path="/notice" element={<NoticeBoard />} />
        <Route path="/notice/:id" element={<NoticeBoardDetail />} />
        <Route path="/mini" element={<MiniBoard />} />
        <Route path="/chart" element={<Chart />} />
        <Route path="/chartitems/main" element={<ChartItemsMain />} />
        <Route path="/chartitems/items/:type" element={<ChartItems />} />
        <Route path="/chartitems/jewel" element={<ChartJewel />} />
        <Route path="/test4" element={<TestFour />} />
        <Route path="/simulator/main" element={<SimulatorMain />} />
        <Route path="/simulator/gem/:type" element={<SimulatorGem />} />
        <Route path="/simulator/gem/custom" element={<CustomGem />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Router;
