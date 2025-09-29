import React, { useState, useEffect } from "react";

import axios from "axios";
import Swal from "sweetalert2";

import ItemsTopMenu from "./Component/ItemsTopMenu";
import FixChartItemsPage from "./Component/FixChartItemsPage";
import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";

import DisplayAds from "../../common/Component/DisplayAds";

function TChartItems(props) {
  const [data, setData] = useState(null);
  const apiKey = useSelector((state) => state.settings.apiKey);
  const [hasTimeMounted, setTimeHasMounted] = useState(true);
  const [hasPointMounted, setPointHasMounted] = useState(true);
  const [hasVisualMounted, setHasVisualMounted] = useState(true);

  const [hasKeyMounted, setHasKeyMounted] = useState(true);

  const [visualState, setVisualState] = useState(null);
  const [time, setTime] = useState(1);
  const [point, setPoint] = useState(10);
  const { type } = useParams();

  const pointList = [
    {
      value: 8,
      content: "8개",
    },
    {
      value: 10,
      content: "10개",
    },
    {
      value: 15,
      content: "15개",
    },
  ];

  const timeList = [
    {
      value: 1,
      content: "1일 간격",
    },
    {
      value: 2,
      content: "2일 간격",
    },
    {
      value: 3,
      content: "3일 간격",
    },
    {
      value: 4,
      content: "4일 간격",
    },
    {
      value: 5,
      content: "5일 간격",
    },
    {
      value: 7,
      content: "7일 간격",
    },
  ];

  const loadData = (key, timeParam, pointParam) => {
    const encodedApiKey = encodeURIComponent(key);

    axios
      .get(`${process.env.REACT_APP_URL}/chart/items/info/${type}`, {
        headers: { apiKey: encodedApiKey },
        params: {
          time: timeParam,
          point: pointParam,
        },
      })
      .then((res) => {
        setData(res.data.data);
        const savedState = localStorage.getItem("ItemsChartSetting");
        if (savedState) {
          try {
            const parsed = JSON.parse(savedState);
            if (parsed[type]) {
              setVisualState(
                parsed[type].visualState !== null
                  ? parsed[type].visualState
                  : Array(res.data.data.length).fill(true)
              );
            } else {
              setVisualState(Array(res.data.data.length).fill(true));
            }
          } catch (err) {}
        } else {
          setVisualState(Array(res.data.data.length).fill(true));
        }
      })
      .catch((error) => {
        const handleError = () => {
          if (error.response.data.code.includes("API-")) {
            return Swal.fire({
              icon: "warning",
              html: error.response.data.message,
              confirmButtonText: "확인",
            });
          } else {
            return Swal.fire({
              icon: "warning",
              title: "예측되지 못한 오류입니다.",
              html: error.response.data.message,
              confirmButtonText: "확인",
            });
          }
        };

        return handleError().then(() => {
          // 60초 대기
          if (error.response.data.code === "API-001") {
            return new Promise((resolve) => setTimeout(resolve, 60000));
          } else {
            return new Promise((resolve) => setTimeout(resolve, 5000));
          }
        });
      });
  };

  const grapeControll = (index) => {
    setVisualState((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  function truncateString(str, maxLength) {
    if (!str) return ""; // 문자열이 null 또는 undefined인 경우 처리
    if (str.includes("의 젬"))
      return str.length > maxLength
        ? str.substring(0, 2) +
            " " +
            str.substring(3, 5) +
            " : " +
            str.substring(11, 13)
        : str;
    return str.length > maxLength ? str.substring(0, maxLength) + "..." : str;
  }

  const setAll = (bool) => {
    const newState = Array(data.length).fill(bool);
    setVisualState(newState);
  };

  useEffect(() => {
    const stored = localStorage.getItem("ItemsChartSetting");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed[type]) {
          const { time, point, visualState } = parsed[type];
          setTime(time);
          setPoint(point);
          setVisualState(visualState);
          loadData(apiKey, time, point);
          return;
        } else {
          loadData(apiKey, 1, 10);
        }
      } catch (err) {}
    } else {
      loadData(apiKey, 1, 10);
    }
  }, []);

  useEffect(() => {
    if (hasTimeMounted) {
      setTimeHasMounted(false);
    } else {
      const stored = JSON.parse(
        localStorage.getItem("ItemsChartSetting") || "{}"
      );
      if (stored[type].time === time) return;
      stored[type] = {
        time,
        point,
        visualState,
      };
      localStorage.setItem("ItemsChartSetting", JSON.stringify(stored));
      loadData(apiKey, stored[type].time, stored[type].point);
    }
  }, [time]);

  useEffect(() => {
    if (hasPointMounted) {
      setPointHasMounted(false);
    } else {
      const stored = JSON.parse(
        localStorage.getItem("ItemsChartSetting") || "{}"
      );
      if (stored[type].point === point) return;
      stored[type] = {
        time,
        point,
        visualState,
      };
      localStorage.setItem("ItemsChartSetting", JSON.stringify(stored));
      loadData(apiKey, stored[type].time, stored[type].point);
    }
  }, [point]);

  useEffect(() => {
    if (hasVisualMounted) {
      setHasVisualMounted(false);
    } else {
      const stored = JSON.parse(
        localStorage.getItem("ItemsChartSetting") || "{}"
      );
      if ((stored[type]?.visualState || null) === visualState) return;
      stored[type] = {
        time,
        point,
        visualState,
      };
      localStorage.setItem("ItemsChartSetting", JSON.stringify(stored));
    }
  }, [visualState]);

  useEffect(() => {
    if (hasKeyMounted) {
      setHasKeyMounted(false);
    } else {
      setData(null);
      setTimeHasMounted(true);
      setPointHasMounted(true);
      setHasVisualMounted(true);
      const stored = localStorage.getItem("ItemsChartSetting");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed[type]) {
            setTime(parsed[type].time);
            setPoint(parsed[type].point);
            setVisualState(parsed[type].visualState);
            loadData(apiKey, parsed[type].time, parsed[type].point);
          } else {
            setTime(1);
            setPoint(8);
            setVisualState(null);
            loadData(apiKey, 1, 8);
          }
        } catch (err) {}
      } else {
        loadData(apiKey, 1, 8);
      }
    }
  }, [type]);

  return (
    <div>
      <div className="mainMobileBody">
        <div className="flex ">
          <div className="mx-auto w-[25%]">
            <ItemsTopMenu />
          </div>
          <div className="w-[70%] max-h-60 mx-auto flex px-4 py-2 bg-[#e0dedf] rounded-2xl inset-shadow-sm shadow-inset-indigo">
            <div className="w-[25%]">
              <h1 className="font-bold size-font-xs my-auto">
                | 이 물건만 볼래요
              </h1>
              <div className=" grid grid-rows-4 size-font-xs">
                <button
                  className="scaleBtm m-2 rounded-lg bg-[#b2ddad]"
                  onClick={() => {
                    setAll(true);
                  }}
                >
                  ✅ 전체 선택
                </button>
                <button
                  className="scaleBtm m-2 rounded-lg bg-[#b2ddad]"
                  onClick={() => {
                    setAll(false);
                  }}
                >
                  🗑️ 전체 해제
                </button>
                <div className="flex flex-col  items-center justify-center">
                  <span className="">조회 시간 주기&nbsp;</span>
                  <select
                    value={time}
                    onChange={(e) => {
                      setTime(e.target.value);
                    }}
                    className="text-center size-font-xs rounded-xl border-gray-400 border-2 w-24 bg-[#F5F5F5]"
                  >
                    <option value="" disabled>
                      옵션선택
                    </option>
                    {timeList.map((time) => (
                      <option value={time.value}>{time.content}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <span className="">조회 지점 갯수&nbsp;</span>
                  <select
                    value={point}
                    onChange={(e) => setPoint(e.target.value)}
                    className="text-center size-font-xs rounded-xl border-gray-400 border-2 w-24 bg-[#F5F5F5]"
                  >
                    <option value="" disabled>
                      옵션선택
                    </option>
                    {pointList.map((pointList) => (
                      <option value={pointList.value}>
                        {pointList.content}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="w-[75%] overflow-scroll grid grid-cols-2 size-font-xs gap-y-2">
              {visualState &&
                data?.map((item, index) => (
                  <button
                    className={`m-2 px-4 py-2 w-[90%] justify-between scaleBtm rounded-lg flex m-auto items-center text-center bg-white text-gray-500 font-bold ${
                      visualState[index]
                        ? "inset-shadow-sm shadow-inset-indigo"
                        : ""
                    }`}
                    onClick={() => grapeControll(index)}
                  >
                    <img className="w-6" src={item.iconUrl} />
                    &nbsp; {truncateString(item.name, 6)}
                  </button>
                ))}
            </div>
          </div>
        </div>
        <div className="">
          <FixChartItemsPage data={data} visualState={visualState} />
        </div>
        <DisplayAds />
      </div>
    </div>
  );
}

export default TChartItems;
