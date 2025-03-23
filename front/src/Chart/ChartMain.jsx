import React, { useState, useEffect } from "react";
import axios from "axios";

import SelectSideBar from "./Component/SelectSideBar";
import FixChartPage from "./Component/FixChartPage";
import CustomChartPage from "./Component/CustomChartPage";
import { type } from "@testing-library/user-event/dist/type";

import DisplayAds from "../common/Component/DisplayAds";

function ChartMain({ request, setRequest }) {
  const getCountLog = () => {
    axios
      .get(`${process.env.REACT_APP_URL}/chart/uplog`, {
        withCredentials: true,
      })
      .then(() => {})
      .catch((error) => {});
  };

  useEffect(() => {
    getCountLog();
  }, []);

  const [selectCustom, setSelectCustom] = useState(false);
  const [selectCategory, setSelectCategory] = useState("neck");
  const [selectGrade, setSelectGrade] = useState("godae");
  const [selectType, setSelectType] = useState("");

  return (
    <div className="flex">
      <div className="mt-32 w-[15%]">
        <DisplayAds />
      </div>
      <div className="mainbody flex">
        <div className="w-[15%]">
          <SelectSideBar
            setSelectCategory={setSelectCategory}
            setSelectGrade={setSelectGrade}
            setSelectCustom={setSelectCustom}
            setSelectType={setSelectType}
            request={request}
            setRequest={setRequest}
          />
        </div>
        <div className="w-[85%]">
          {selectCustom ? (
            <CustomChartPage />
          ) : (
            <FixChartPage
              category={selectCategory}
              grade={selectGrade}
              type={selectType}
              request={request}
              setRequest={setRequest}
            />
          )}
        </div>
      </div>
      <div className="mt-32 w-[15%]">
        <DisplayAds />
      </div>
    </div>
  );
}

export default ChartMain;
