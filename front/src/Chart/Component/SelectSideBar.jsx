import React, { useState, useEffect } from "react";
import axios from "axios";

const SelectSideBar = ({
  setSelectCategory,
  setSelectGrade,
  setSelectCustom,
}) => {
  const [logSearch, setLogSearch] = useState([]);

  const getCountLog = () => {
    axios
      .get(`${process.env.REACT_APP_URL}/log/3`)
      .then((res) => {
        setLogSearch(res.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getCountLog();
  }, []);

  return (
    <div className="h-full">
      <div className="border-2 border-gray-500 rounded-xl p-8 sticky top-32">
        <p className="text-center text-xs">
          {" "}
          오늘의 차트 방문자 - {logSearch[0]}
        </p>
        <p className="text-center text-xs">
          {" "}
          누적 차트 방문자 - {logSearch[1]}
        </p>
        <br />
        <li
          className="commonHover"
          onClick={() => {
            setSelectCategory("neck");
            setSelectGrade("godae");
            setSelectCustom(false);
          }}
        >
          고대 목걸이
        </li>
        <li
          className="commonHover"
          onClick={() => {
            setSelectCategory("earing");
            setSelectGrade("godae");
            setSelectCustom(false);
          }}
        >
          고대 귀걸이
        </li>
        <li
          className="commonHover"
          onClick={() => {
            setSelectCategory("ring");
            setSelectGrade("godae");
            setSelectCustom(false);
          }}
        >
          고대 반지
        </li>
        <br />
        <li
          className="commonHover"
          onClick={() => {
            setSelectCategory("neck");
            setSelectGrade("umuoel");
            setSelectCustom(false);
          }}
        >
          유물 목걸이
        </li>
        <li
          className="commonHover"
          onClick={() => {
            setSelectCategory("earing");
            setSelectGrade("umuoel");
            setSelectCustom(false);
          }}
        >
          유물 귀걸이
        </li>
        <li
          className="commonHover"
          onClick={() => {
            setSelectCategory("ring");
            setSelectGrade("umuoel");
            setSelectCustom(false);
          }}
        >
          유물 반지
        </li>

        <br />
        <li
          className="commonHover"
          onClick={() => {
            // setSelectCategory("ring");
            //   setSelectGrade("umuoel");
            setSelectCustom(true);
          }}
        >
          직접 선택
        </li>
      </div>
    </div>
  );
};

export default SelectSideBar;
