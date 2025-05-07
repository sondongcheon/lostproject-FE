import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

import ItemsLineChartComp from "./ItemsLineChartComp";

const FixChartItemsPage = () => {
  const [data, setData] = useState(null);
  const apiKey = useSelector((state) => state.settings.apiKey);

  const [hasTimeMounted, setTimeHasMounted] = useState(true);
  const [hasPointMounted, setPointHasMounted] = useState(true);
  const [hasVisualMounted, setHasVisualMounted] = useState(true);

  const [hasKeyMounted, setHasKeyMounted] = useState(true);

  const [visualState, setVisualState] = useState(null);
  const [time, setTime] = useState(1);
  const [point, setPoint] = useState(15);

  const { type } = useParams();

  const pointList = [
    {
      value: 10,
      content: "10개",
    },
    {
      value: 15,
      content: "15개",
    },
    {
      value: 20,
      content: "20개",
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

  const grapeControll = (index) => {
    setVisualState((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const setAll = (bool) => {
    const newState = Array(data.length).fill(bool);
    setVisualState(newState);
  };

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
          loadData(apiKey, 1, 15);
        }
      } catch (err) {}
    } else {
      loadData(apiKey, 1, 15);
    }
  }, []);

  useEffect(() => {
    if (hasTimeMounted) {
      setTimeHasMounted(false);
    } else {
      const stored = JSON.parse(localStorage.getItem("ItemsChartSetting") || "{}");
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
      const stored = JSON.parse(localStorage.getItem("ItemsChartSetting") || "{}");
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
      const stored = JSON.parse(localStorage.getItem("ItemsChartSetting") || "{}");
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
            setPoint(15);
            setVisualState(null);
            loadData(apiKey, 1, 15);
          }
        } catch (err) {}
      } else {
        loadData(apiKey, 1, 15);
      }
    }
  }, [type]);

  return (
    <div>
      <div className="mb-10 space-y-10">
        <div className="mx-auto w-[95%] max-h-48 flex px-6 py-2 bg-[#e0dedf] rounded-2xl inset-shadow-sm shadow-inset-indigo">
          <div className="w-[15%] my-auto">
            <h1 className="font-bold text-xl">| 이 물건만 볼래요</h1>
            <div className="grid grid-rows-2 text-sm">
              <button
                className="presetBtm m-1 mx-4 rounded-lg bg-[#b2ddad]"
                onClick={() => {
                  setAll(true);
                }}
              >
                ✅ 전체 선택
              </button>
              <button
                className="presetBtm m-1 mx-4 rounded-lg bg-[#b2ddad]"
                onClick={() => {
                  setAll(false);
                }}
              >
                🗑️ 전체 해제
              </button>
              <div className="flex flex-col items-center justify-center">
                <span className="">조회 시간 주기&nbsp;</span>
                <select
                  value={time || ""}
                  onChange={(e) => {
                    setTime(e.target.value);
                  }}
                  className="text-center rounded-xl border-gray-400 border-2 w-24 bg-[#F5F5F5]"
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
                  value={point || ""}
                  onChange={(e) => setPoint(e.target.value)}
                  className="text-center rounded-xl border-gray-400 border-2 w-24 bg-[#F5F5F5]"
                >
                  <option value="" disabled>
                    옵션선택
                  </option>
                  {pointList.map((pointList) => (
                    <option value={pointList.value}>{pointList.content}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="w-[85%] grid grid-cols-4 text-sm gap-y-2 overflow-y-scroll slim-scrollbar">
            {visualState &&
              data?.map((item, index) => (
                <button
                  key={index}
                  className={`m-2 px-4 py-2 w-[90%] justify-between presetBtm rounded-lg flex m-auto items-center text-center bg-white text-gray-500 font-bold ${
                    visualState[index] ? "inset-shadow-sm shadow-inset-indigo" : ""
                  }`}
                  onClick={() => grapeControll(index)}
                >
                  <img className="w-6" src={item.iconUrl} />
                  &nbsp; {item.name}
                </button>
              ))}
          </div>
        </div>
        <div className="flex m-10 border-b-2 border-red-200 justify-center items-center bg-opacity-75 bg-white rounded-2xl size-font-xl">
          <img className="w-8" src={data !== null && data[0].iconUrl} />
          &nbsp; 골두껍이 실시간 기댓값 : &nbsp;{" "}
          <p className="font-bold text-3xl">
            {data !== null && data[0].goldoEvent.avgPrice.toLocaleString()} G
          </p>
        </div>
        {visualState &&
          data?.map((item, index) => (
            <div key={index}>{visualState[index] && <ItemsLineChartComp data={item} />}</div>
          ))}
      </div>
    </div>
  );
};

export default FixChartItemsPage;
