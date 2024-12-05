import { BrowserRouter, React, Route, Routes } from "react-router-dom";
import Main from "./Main/Main.jsx";
import Test from "./Main/Test.jsx";
import TestTwo from "./Main/TestTwo.jsx";
import TestThree from "./Main/TestThree.jsx";
import AuctionTierFour from "./Auction/AuctionTierFour.jsx";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/test" element={<Test />}></Route>
        <Route path="/test2" element={<TestTwo />}></Route>
        <Route path="/test3" element={<TestThree />}></Route>
        <Route path="/auctiontier4" element={<AuctionTierFour />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
