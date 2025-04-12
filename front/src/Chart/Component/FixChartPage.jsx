import React, { useEffect, useState } from "react";

import LineChartComp from "./LineChartComp";

const FixChartPage = ({ category, grade, type, request, setRequest }) => {
  const SectionDivider = ({ title, color }) => {
    const colorMap = {
      orange: "bg-[#f97316] text-white",
      purple: "bg-[#7E1891] text-white",
    };

    const colorClass = colorMap[color] || "bg-gray-100 text-gray-700 border-gray-300";
    return (
      <div className="flex items-center m-10 ">
        <div className="flex-1 border-t-4 border-gray-300" />
        <h2 className={`mx-4 px-4 py-1 text-lg font-bold ${colorClass} rounded-full`}>{title}</h2>
        <div className="flex-1 border-t-4 border-gray-300" />
      </div>
    );
  };

  const [optionName, setOptionName] = useState({});

  const selectOptionName = () => {
    //폿딜 구분 -> 카테고리 구분
    if (type === "sup_") {
      if (category === "neck")
        setOptionName({
          first: "아덴+",
          secound: "낙인+",
        });
      if (category === "ring")
        setOptionName({
          first: "아공+",
          secound: "아피+",
        });
    } else {
      if (category === "neck")
        setOptionName({
          first: "추피",
          secound: "적주피",
        });
      if (category === "earing")
        setOptionName({
          first: "공%",
          secound: "무공%",
        });
      if (category === "ring")
        setOptionName({
          first: "치피",
          secound: "치적",
        });
    }
  };

  const [visualState, setVisualState] = useState(Array(12).fill(true));

  const grapeControll = (index) => {
    setVisualState((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      localStorage.setItem("grapeVisualState", JSON.stringify(newState));
      return newState;
    });
  };

  const setAllTrue = () => {
    const newState = Array(12).fill(true);
    setVisualState(newState);
    localStorage.setItem("grapeVisualState", JSON.stringify(newState));
  };

  const setAllFalse = () => {
    const newState = Array(12).fill(false);
    setVisualState(newState);
    localStorage.setItem("grapeVisualState", JSON.stringify(newState));
  };

  const updateOption = (key, value) => {
    setRequest((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  useEffect(() => {
    updateOption("time", 1);
    updateOption("point", 15);
    const savedState = localStorage.getItem("grapeVisualState");
    if (savedState) {
      setVisualState(JSON.parse(savedState));
    }
  }, []);

  useEffect(() => {
    selectOptionName();
  }, [category, type]);

  return (
    <div>
      <div className="mx-auto w-[95%] flex h-28 px-6 py-2 bg-[#e0dedf] rounded-2xl inset-shadow-sm shadow-inset-indigo">
        <div className="w-[15%] my-auto">
          <h1 className="font-bold text-xl">| 이 옵션만 볼래요</h1>
          <div className="grid grid-rows-2 text-sm">
            <button className="presetBtm m-1 mx-4 rounded-lg bg-[#b2ddad]" onClick={setAllTrue}>
              ✅ 전체 선택
            </button>
            <button className="presetBtm m-1 mx-4 rounded-lg bg-[#b2ddad]" onClick={setAllFalse}>
              🗑️ 전체 해제
            </button>
          </div>
        </div>
        <div className="w-[85%] grid grid-cols-7 grid-rows-2 text-sm">
          <button
            className={`m-2 p-1 w-[90%] justify-center presetBtm rounded-lg flex m-auto items-baseline text-center bg-white text-gray-500 font-bold ${
              visualState[0] ? "inset-shadow-sm shadow-inset-indigo" : ""
            }`}
            onClick={() => grapeControll(0)}
          >
            {optionName.first}
            <span className=" text-xl text-[#E38E49]">상</span> {optionName.secound}
            <span className=" text-xl text-[#E38E49]">상</span>
          </button>
          <button
            className={`m-2 p-1 w-[90%] justify-center presetBtm rounded-lg flex m-auto items-baseline text-center bg-white text-gray-500 font-bold ${
              visualState[1] ? "inset-shadow-sm shadow-inset-indigo" : ""
            }`}
            onClick={() => grapeControll(1)}
          >
            {optionName.first}
            <span className=" text-xl text-[#E38E49]">상</span> {optionName.secound}
            <span className=" text-xl text-[#7E1891]">중</span>
          </button>
          <button
            className={`m-2 p-1 w-[90%] justify-center presetBtm rounded-lg flex m-auto items-baseline text-center bg-white text-gray-500 font-bold ${
              visualState[2] ? "inset-shadow-sm shadow-inset-indigo" : ""
            }`}
            onClick={() => grapeControll(2)}
          >
            {optionName.first}
            <span className=" text-xl text-[#7E1891]">중</span> {optionName.secound}
            <span className=" text-xl text-[#E38E49]">상</span>
          </button>
          <button
            className={`m-2 p-1 w-[90%] justify-center presetBtm rounded-lg flex m-auto items-baseline text-center bg-white text-gray-500 font-bold ${
              visualState[3] ? "inset-shadow-sm shadow-inset-indigo" : ""
            }`}
            onClick={() => grapeControll(3)}
          >
            {optionName.first}
            <span className=" text-xl text-[#E38E49]">상</span> {optionName.secound}
            <span className=" text-xl text-[#0A3981]">하</span>
          </button>
          <button
            className={`m-2 p-1 w-[90%] justify-center presetBtm rounded-lg flex m-auto items-baseline text-center bg-white text-gray-500 font-bold ${
              visualState[4] ? "inset-shadow-sm shadow-inset-indigo" : ""
            }`}
            onClick={() => grapeControll(4)}
          >
            {optionName.first}
            <span className=" text-xl text-[#0A3981]">하</span> {optionName.secound}
            <span className=" text-xl text-[#E38E49]">상</span>
          </button>
          <button
            className={`m-2 p-1 w-[90%] justify-center presetBtm rounded-lg flex m-auto items-baseline text-center bg-white text-gray-500 font-bold ${
              visualState[5] ? "inset-shadow-sm shadow-inset-indigo" : ""
            }`}
            onClick={() => grapeControll(5)}
          >
            {optionName.first}
            <span className=" text-xl text-[#E38E49]">상</span>
          </button>
          <button
            className={`m-2 p-1 w-[90%] justify-center presetBtm rounded-lg flex m-auto items-baseline text-center bg-white text-gray-500 font-bold ${
              visualState[6] ? "inset-shadow-sm shadow-inset-indigo" : ""
            }`}
            onClick={() => grapeControll(6)}
          >
            {optionName.secound}
            <span className=" text-xl text-[#E38E49]">상</span>
          </button>

          <button
            className={`m-2 p-1 w-[90%] justify-center presetBtm rounded-lg flex m-auto items-baseline text-center bg-white text-gray-500 font-bold ${
              visualState[7] ? "inset-shadow-sm shadow-inset-indigo" : ""
            }`}
            onClick={() => grapeControll(7)}
          >
            {optionName.first}
            <span className=" text-xl text-[#7E1891]">중</span> {optionName.secound}
            <span className=" text-xl text-[#7E1891]">중</span>
          </button>
          <button
            className={`m-2 p-1 w-[90%] justify-center presetBtm rounded-lg flex m-auto items-baseline text-center bg-white text-gray-500 font-bold ${
              visualState[8] ? "inset-shadow-sm shadow-inset-indigo" : ""
            }`}
            onClick={() => grapeControll(8)}
          >
            {optionName.first}
            <span className=" text-xl text-[#7E1891]">중</span> {optionName.secound}
            <span className=" text-xl text-[#0A3981]">하</span>
          </button>
          <button
            className={`m-2 p-1 w-[90%] justify-center presetBtm rounded-lg flex m-auto items-baseline text-center bg-white text-gray-500 font-bold ${
              visualState[9] ? "inset-shadow-sm shadow-inset-indigo" : ""
            }`}
            onClick={() => grapeControll(9)}
          >
            {optionName.first}
            <span className=" text-xl text-[#0A3981]">하</span> {optionName.secound}
            <span className=" text-xl text-[#7E1891]">중</span>
          </button>
          <button
            className={`m-2 p-1 w-[90%] justify-center presetBtm rounded-lg flex m-auto items-baseline text-center bg-white text-gray-500 font-bold ${
              visualState[10] ? "inset-shadow-sm shadow-inset-indigo" : ""
            }`}
            onClick={() => grapeControll(10)}
          >
            {optionName.first}
            <span className=" text-xl text-[#7E1891]">중</span>
          </button>
          <button
            className={`m-2 p-1 w-[90%] justify-center presetBtm rounded-lg flex m-auto items-baseline text-center bg-white text-gray-500 font-bold ${
              visualState[11] ? "inset-shadow-sm shadow-inset-indigo" : ""
            }`}
            onClick={() => grapeControll(11)}
          >
            {optionName.secound}
            <span className=" text-xl text-[#7E1891]">중</span>
          </button>
        </div>
      </div>

      <div className="mb-10 space-y-10">
        <SectionDivider title="상" color="orange" />
        {visualState[0] && (
          <LineChartComp
            category={category}
            grade={grade}
            type={type}
            value="h"
            value2="h"
            request={request}
          />
        )}
        {visualState[1] && (
          <LineChartComp
            category={category}
            grade={grade}
            type={type}
            value="h"
            value2="m"
            request={request}
          />
        )}
        {visualState[2] && (
          <LineChartComp
            category={category}
            grade={grade}
            type={type}
            value="m"
            value2="h"
            request={request}
          />
        )}
        {visualState[3] && (
          <LineChartComp
            category={category}
            grade={grade}
            type={type}
            value="h"
            value2="l"
            request={request}
          />
        )}
        {visualState[4] && (
          <LineChartComp
            category={category}
            grade={grade}
            type={type}
            value="l"
            value2="h"
            request={request}
          />
        )}
        {visualState[5] && (
          <LineChartComp
            category={category}
            grade={grade}
            type={type}
            value="h"
            value2="x"
            request={request}
          />
        )}
        {visualState[6] && (
          <LineChartComp
            category={category}
            grade={grade}
            type={type}
            value="x"
            value2="h"
            request={request}
          />
        )}
        <SectionDivider title="중" color="purple" />
        {visualState[7] && (
          <LineChartComp
            category={category}
            grade={grade}
            type={type}
            value="m"
            value2="m"
            request={request}
          />
        )}
        {visualState[8] && (
          <LineChartComp
            category={category}
            grade={grade}
            type={type}
            value="m"
            value2="l"
            request={request}
          />
        )}
        {visualState[9] && (
          <LineChartComp
            category={category}
            grade={grade}
            type={type}
            value="l"
            value2="m"
            request={request}
          />
        )}
        {visualState[10] && (
          <LineChartComp
            category={category}
            grade={grade}
            type={type}
            value="m"
            value2="x"
            request={request}
          />
        )}
        {visualState[11] && (
          <LineChartComp
            category={category}
            grade={grade}
            type={type}
            value="x"
            value2="m"
            request={request}
          />
        )}
      </div>
    </div>
  );
};

export default FixChartPage;
