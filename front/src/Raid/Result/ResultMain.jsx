import React, { useState } from "react";
import SideBar from "../Components/SideBar";
import ResultCard from "../Components/ResultCard";

// import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";

import { BiSearchAlt } from "react-icons/bi";

function ResultMain(props) {
  // const apiKey = useSelector((state) => state.settings.apiKey);
  const [name, setName] = useState("");
  const [searchState, setSearchState] = useState(false);
  const [data, setData] = useState(null);

  const loadData = () => {
    // const encodedApiKey = encodeURIComponent(apiKey);
    setSearchState(true);
    setData(null);
    axios
      .get(`${process.env.REACT_APP_URL}/raid/result/get/${name}`, {
        // headers: { apiKey: encodedApiKey },
      })
      .then((res) => {
        setData(res.data.data);
        console.log(res.data.data);
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

  return (
    <div className="flex">
      <div className="w-[15%] mt-32 border-2 border-red">광고</div>
      <div className="mainbody flex">
        <div className="w-[15%]">
          <SideBar />
        </div>
        <div className="w-[80%] bg-white shadow-2xl rounded-lg mx-auto pt-12">
          <div className="flex justify-center items-center ">
            <input
              className="w-1/2 h-10 text-center border-2 border-black"
              placeholder="닉네임 입력"
              value={name}
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
            <button
              className="flex justify-center items-center w-10 h-10 bg-[#FF6347]"
              onClick={() => loadData()}
              disabled={searchState || name.length < 3}
            >
              {searchState ? (
                <div className="w-full h-full bg-[url('./Assets/loading.webp')] bg-contain bg-center bg-no-repeat">
                  {" "}
                </div>
              ) : (
                <BiSearchAlt />
              )}
            </button>
          </div>

          {data !== null &&
            data.raids
              .filter((data) => data.raidCode !== 0)
              .map((data, index) => <ResultCard key={index} data={data} />)}
        </div>
      </div>
      <div className="w-[15%] mt-32 border-2 border-red">광고</div>
    </div>
  );
}

export default ResultMain;
