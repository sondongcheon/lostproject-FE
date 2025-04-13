import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

import ItemsLineChartComp from "./ItemsLineChartComp";
import { useSelector, useDispatch } from "react-redux";

const FixChartItemsPage = () => {
  const [data, setData] = useState(null);
  const apiKey = useSelector((state) => state.settings.apiKey);
  const [hasKeyMounted, setHasKeyMounted] = useState(true);
  const { type } = useParams();

  const loadData = (key) => {
    const encodedApiKey = encodeURIComponent(key);

    axios
      .get(`${process.env.REACT_APP_URL}/chart/items/info/${type}`, {
        headers: { apiKey: encodedApiKey },
      })
      .then((res) => {
        setData(res.data.data);
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
  }, []);

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
        {data?.map((item, index) => (
          <ItemsLineChartComp key={index} data={item} />
        ))}
      </div>
    </div>
  );
};

export default FixChartItemsPage;
