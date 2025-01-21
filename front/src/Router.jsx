import { BrowserRouter, React, Route, Routes } from "react-router-dom";
import Main from "./Pages/Main.jsx";
import MainNav from "./common/MainNav";
import Auction from "./Pages/Auction.jsx";
import AuctionSup from "./Pages/AuctionSup.jsx";
import UseBasicInfo from "./Information/UseBasicInfo.jsx";
import NoticeBoard from "./Board/NoticeBoard.jsx";
import BoardDetail from "./Board/BoardDetail.jsx";
import MiniBoard from "./Board/MiniBoard.jsx";
import Chart from "./Pages/Chart.jsx";

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
        <Route path="/notice/:id" element={<BoardDetail />} />
        <Route path="/mini" element={<MiniBoard />} />
        <Route path="/chart" element={<Chart />} />

        <Route path="/test4" element={<TestFour />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
