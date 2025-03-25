import React, { useEffect, useState } from "react";
import axios from "axios";
import { TbZoomReset } from "react-icons/tb";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

import HeadKeyBox from "../../Auction/Component/HeadKeyBox";
import ItemsLineChartComp from "./ItemsLineChartComp";

const FixChartItemsPage = () => {
  const [data, setData] = useState(null);
  const [apiKey, setApiKey] = useState("");
  const [saveKey, setSaveKey] = useState(true);
  const [hasMounted, setHasMounted] = useState(true);
  const [hasKeyMounted, setHasKeyMounted] = useState(true);
  const [searchState, setSearchState] = useState(false);

  const loadData = () => {
    const encodedApiKey = encodeURIComponent(apiKey);
    setSearchState(true);

    axios
      .get(`${process.env.REACT_APP_URL}/chart/book/info`, {
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
      })
      .finally(() => {
        setTimeout(() => {
          setSearchState(false);
        }, 5000);
      });
  };

  useEffect(() => {
    const cookieValue = Cookies.get("apiKey");
    if (Cookies.get("apiKey") === undefined || cookieValue === "") {
      setSaveKey(false);
    }
    setApiKey(cookieValue);
    loadData();
  }, []);

  useEffect(() => {
    if (hasKeyMounted) {
      setHasKeyMounted(false);
    } else if (!searchState) {
      loadData();
    }
  }, [apiKey]);

  useEffect(() => {
    if (hasMounted) {
      setHasMounted(false);
    } else {
      if (saveKey) {
        Cookies.set("apiKey", apiKey, {
          expires: 89,
          secure: true,
          sameSite: "Strict",
        });
        Swal.fire({
          icon: "success",
          html: "API KEY 저장이 완료되었습니다.",
          confirmButtonText: "확인",
        });
      }
    }
  }, [saveKey]);

  return (
    <div>
      <div className="flex w-full px-10">
        <div className="mx-auto w-4/5">
          <HeadKeyBox
            apiKey={apiKey}
            setApiKey={setApiKey}
            saveKey={saveKey}
            setSaveKey={setSaveKey}
          ></HeadKeyBox>
        </div>

        <div className="group relative">
          <button
            className="w-28 h-full shadow-lg border-2 rounded-3xl bg-[#F5F5F5] "
            onClick={loadData}
            disabled={searchState}
          >
            {searchState ? (
              <div className="w-28 h-full bg-[url('./Assets/loading.webp')] bg-contain bg-center bg-no-repeat">
                {" "}
              </div>
            ) : (
              <TbZoomReset className="w-28 h-20" />
            )}
          </button>
          <div className="absolute top-full w-[270px] mt-2 px-3 py-2 bg-gray-800 text-white text-sm rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            실시간 가격을 다시 불러옵니다. <br />
            API키가 없거나 반복해서 누르는 경우
            <br />
            요청 횟수가 초과 될 수 있습니다.
          </div>
        </div>
      </div>
      <div className="mb-10 space-y-10">
        {" "}
        {data?.map((item, index) => (
          <ItemsLineChartComp data={item} />
        ))}
      </div>
    </div>
  );
};

export default FixChartItemsPage;
