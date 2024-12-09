import { BrowserRouter, React, Route, Routes } from "react-router-dom";
import Main from "./Main/Main.jsx";
import MainNav from "./common/MainNav";
import Test from "./Main/Test.jsx";
import TestTwo from "./Main/TestTwo.jsx";
import TestThree from "./Main/TestThree.jsx";
import AuctionTierFour from "./Auction/AuctionTierFour.jsx";
import AuctionTierFourSup from "./Auction/AuctionTierFourSup.jsx";
import UseBasicInfo from "./Information/UseBasicInfo.jsx";
import NoticeBoard from "./Board/NoticeBoard.jsx";

function Router() {
  return (
    <BrowserRouter>
      <MainNav />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/test" element={<Test />}></Route>
        <Route path="/test2" element={<TestTwo />}></Route>
        <Route path="/test3" element={<TestThree />}></Route>
        <Route path="/auctiontier4" element={<AuctionTierFour />}></Route>
        <Route path="/auctiontier4sup" element={<AuctionTierFourSup />}></Route>
        <Route path="/usebasicinfo" element={<UseBasicInfo />}></Route>
        <Route path="/notice" element={<NoticeBoard />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
