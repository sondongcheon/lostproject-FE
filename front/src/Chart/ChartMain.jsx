import React, { useState, useEffect } from "react";
import axios from "axios";

import SelectSideBar from "./Component/SelectSideBar";
import FixChartPage from "./Component/FixChartPage";
import CustomChartPage from "./Component/CustomChartPage";

function ChartMain() {
  const getCountLog = () => {
    axios
      .get(`${process.env.REACT_APP_URL}/chart/uplog`, {
        withCredentials: true,
      })
      .then(() => {})
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    // getCountLog();
  }, []);

  const [selectCustom, setSelectCustom] = useState(false);
  const [selectCategory, setSelectCategory] = useState("neck");
  const [selectGrade, setSelectGrade] = useState("godae");

  return (
    <div>
      <div className="mainbody flex">
        <div className="w-[15%]">
          <SelectSideBar
            setSelectCategory={setSelectCategory}
            setSelectGrade={setSelectGrade}
            setSelectCustom={setSelectCustom}
          />
        </div>
        <div className="w-[85%]">
          {selectCustom ? (
            <CustomChartPage />
          ) : (
            <FixChartPage category={selectCategory} grade={selectGrade} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ChartMain;
