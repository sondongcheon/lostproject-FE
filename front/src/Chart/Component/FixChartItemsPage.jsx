import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

import ItemsLineChartComp from "./ItemsLineChartComp";
import { setItemsChartSetting } from "@/store/settingsSlice";

const FixChartItemsPage = () => {
  const dispatch = useDispatch();
  const ItemsChartSetting = useSelector((state) => state.settings.ItemsChartSetting);
  const [data, setData] = useState(null);
  const apiKey = useSelector((state) => state.settings.apiKey);
  const [hasKeyMounted, setHasKeyMounted] = useState(true);
  const [hasMounted, setHasMounted] = useState(true);

  const [visualState, setVisualState] = useState(null);

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
      localStorage.setItem("ItemGrapeVisualState_" + type, JSON.stringify(newState));
      return newState;
    });
  };

  const setAllTrue = () => {
    const newState = Array(data.length).fill(true);
    setVisualState(newState);
    localStorage.setItem("ItemGrapeVisualState_" + type, JSON.stringify(newState));
  };

  const setAllFalse = () => {
    const newState = Array(data.length).fill(false);
    setVisualState(newState);
    localStorage.setItem("ItemGrapeVisualState_" + type, JSON.stringify(newState));
  };

  const loadData = (key) => {
    const encodedApiKey = encodeURIComponent(key);
    axios
      .get(`${process.env.REACT_APP_URL}/chart/items/info/${type}`, {
        headers: { apiKey: encodedApiKey },
        params: {
          time: ItemsChartSetting[type]?.time || 1,
          point: ItemsChartSetting[type]?.point || 15,
        },
      })
      .then((res) => {
        setData(res.data.data);
        const savedState = localStorage.getItem("ItemGrapeVisualState_" + type);
        if (savedState) {
          setVisualState(JSON.parse(savedState));
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
    loadData(apiKey);

    const stored = localStorage.getItem("ItemsChartSetting");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed[type])
          dispatch(
            setItemsChartSetting({
              [type]: {
                time: parsed[type].time,
                point: parsed[type].point,
              },
            })
          );
      } catch (err) {}
    }
  }, []);

  useEffect(() => {
    loadData(apiKey);
    if (hasMounted) {
      setHasMounted(false);
    } else {
      loadData(apiKey);
    }
  }, [ItemsChartSetting]);

  useEffect(() => {
    setData(null);
    if (hasKeyMounted) {
      setHasKeyMounted(false);
    } else {
      loadData(apiKey);
    }
  }, [type]);

  return (
    <div>
      <div className="mb-10 space-y-10">
        <div className="mx-auto w-[95%] flex px-6 py-2 bg-[#e0dedf] rounded-2xl inset-shadow-sm shadow-inset-indigo">
          <div className="w-[15%] my-auto">
            <h1 className="font-bold text-xl">| 이 물건만 볼래요</h1>
            <div className="grid grid-rows-2 text-sm">
              <button className="presetBtm m-1 mx-4 rounded-lg bg-[#b2ddad]" onClick={setAllTrue}>
                ✅ 전체 선택
              </button>
              <button className="presetBtm m-1 mx-4 rounded-lg bg-[#b2ddad]" onClick={setAllFalse}>
                🗑️ 전체 해제
              </button>
              <div className="flex flex-col items-center justify-center">
                <span className="">조회 시간 주기&nbsp;</span>
                <select
                  value={ItemsChartSetting[type]?.time || ""}
                  onChange={(e) =>
                    dispatch(
                      setItemsChartSetting({
                        [type]: {
                          time: e.target.value,
                        },
                      })
                    )
                  }
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
                  value={ItemsChartSetting[type]?.point || ""}
                  onChange={(e) =>
                    dispatch(
                      setItemsChartSetting({
                        [type]: {
                          point: e.target.value,
                        },
                      })
                    )
                  }
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
          <div className="w-[85%] grid grid-cols-4 text-sm gap-y-2">
            {data?.map((item, index) => (
              <button
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
        {data?.map((item, index) => (
          <div> {visualState[index] && <ItemsLineChartComp key={index} data={item} />}</div>
        ))}
      </div>
    </div>
  );
};

export default FixChartItemsPage;
