import { BrowserRouter, React, Route, Routes } from "react-router-dom";
import Main from "./Main/Main.jsx";
import MainNav from "./common/MainNav";
import AuctionTierFour from "./Auction/AuctionTierFour.jsx";
import AuctionTierFourSup from "./Auction/AuctionTierFourSup.jsx";
import UseBasicInfo from "./Information/UseBasicInfo.jsx";
import NoticeBoard from "./Board/NoticeBoard.jsx";
import BoardDetail from "./Board/BoardDetail.jsx";
import MiniBoard from "./Board/MiniBoard.jsx";

function Router() {
  return (
    <BrowserRouter>
      <MainNav />
      <Routes>
        <Route path="/" element={<AuctionTierFour />}></Route>

        <Route path="/auctiontier4" element={<AuctionTierFour />}></Route>
        <Route path="/auctiontier4sup" element={<AuctionTierFourSup />}></Route>
        <Route path="/usebasicinfo" element={<UseBasicInfo />}></Route>
        <Route path="/notice" element={<NoticeBoard />}></Route>
        <Route path="/notice/:id" element={<BoardDetail />}></Route>
        <Route path="/mini" element={<MiniBoard />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
