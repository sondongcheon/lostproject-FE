import React, { useState, useEffect } from "react";
import axios from "axios";

import TopMenu from "./Component/TopMenu";
import FixChartPage from "./Component/FixChartPage";
import CustomChartPage from "./Component/CustomChartPage";

import DisplayAds from "../../common/Component/DisplayAds";

function MChartMain() {
  const getCountLog = () => {
    axios
      .get(`${process.env.REACT_APP_URL}/chart/uplog`, {
        withCredentials: true,
      })
      .then(() => {})
      .catch((error) => {});
  };

  const [visualState, setVisualState] = useState(Array(12).fill(true));

  useEffect(() => {
    getCountLog();
  }, []);

  const [selectCustom, setSelectCustom] = useState(false);
  const [selectCategory, setSelectCategory] = useState("neck");
  const [selectGrade, setSelectGrade] = useState("godae");
  const [selectType, setSelectType] = useState("");

  return (
    <div>
      <div className="mainMobileBody">
        <div className="">
          <TopMenu
            setSelectCategory={setSelectCategory}
            setSelectGrade={setSelectGrade}
            setSelectCustom={setSelectCustom}
            setSelectType={setSelectType}
            type={selectType}
            category={selectCategory}
            visualState={visualState}
            setVisualState={setVisualState}
          />
        </div>
        <div className="">
          {selectCustom ? (
            <CustomChartPage />
          ) : (
            <FixChartPage
              category={selectCategory}
              grade={selectGrade}
              type={selectType}
              visualState={visualState}
            />
          )}
        </div>
      </div>
      <DisplayAds />
    </div>
  );
}

export default MChartMain;
