import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { BiSearchAlt } from "react-icons/bi";

const SearchBtm = ({ selectOptions, search, total, searchState, apiKey }) => {
  const [name, setName] = useState("");
  const [resultAcc, setResultAcc] = useState([]);

  function truncateString(str, maxLength) {
    if (!str) return ""; // 문자열이 null 또는 undefined인 경우 처리
    return str.length > maxLength ? str.substring(0, maxLength) + "..." : str;
  }

  const [searchCharState, setSearchCharState] = useState(false);

  const searchAcc = () => {
    const encodedApiKey = encodeURIComponent(apiKey);
    setSearchCharState(true);
    axios
      .get(`${process.env.REACT_APP_URL}/auction/equipment/${name}`, {
        headers: { apiKey: encodedApiKey },
      })
      .then((res) => {
        setResultAcc(res.data.data);
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
            return new Promise((resolve) => setTimeout(resolve, 3000));
          }
        });
      })
      .finally(() => {
        setTimeout(() => {
          setSearchCharState(false);
        }, 5000);
      });
  };

  const rankColor = (data) => {
    if (data.includes("상")) return "#E38E49";
    if (data.includes("중")) return "#7E1891";
    if (data.includes("하")) return "#0A3981";
    return "#006400"; // 기본값
  };

  return (
    <div>
      <div className="h-52 w-full border-2 rounded-3xl bg-[#F2F1E6]  shadow-lg">
        <div className="flex flex-col items-center justify-center size-font-xs gap-y-2 mt-2">
          <p>착용 악세 검색</p>
          <div className="flex justify-center items-center">
            <input
              className="w-3/4 h-4 text-center"
              placeholder="닉네임 입력"
              value={name}
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
            <button
              className="flex justify-center items-center w-4 h-4 bg-[#FF6347]"
              onClick={searchAcc}
              disabled={searchState || name.length < 3}
            >
              {searchState ? (
                <div className="h-full bg-[url('./Assets/loading.webp')] bg-contain bg-center bg-no-repeat">
                  {" "}
                </div>
              ) : (
                <BiSearchAlt />
              )}
            </button>
          </div>
          {resultAcc[0]?.itemLevel ? (
            <div>아이템 레벨 - {resultAcc[0].itemLevel}</div>
          ) : (
            <div className="text-gray-400">아이템 레벨 정보 없음</div>
          )}
        </div>

        <div className="grid grid-cols-5  flex ">
          {selectOptions
            .filter((_, index) => resultAcc[index])
            .map((option, index) => (
              <div className="h-full flex items-center">
                <div className="size-font-xxs">
                  {" "}
                  <div className="font-bold ">
                    <span
                      className="pr-4"
                      style={{
                        background: "linear-gradient(to bottom, transparent 30%, #F5FF00 70%)",
                      }}
                    >
                      <span>
                        {resultAcc[index]?.type && <>{resultAcc[index]?.type} &nbsp;</>}
                        {resultAcc[index]?.tier !== 0 && resultAcc[index]?.grade && (
                          <>
                            | &nbsp; {resultAcc[index]?.tier}T-
                            {resultAcc[index]?.grade}
                          </>
                        )}
                      </span>
                    </span>
                  </div>
                  <span
                    className={`rounded-full text-white`}
                    style={{
                      backgroundColor: (() => rankColor(resultAcc[index]?.valueLevel[0] || ""))(),
                    }}
                  >
                    {resultAcc[index]?.valueLevel[0]}
                  </span>{" "}
                  <span>
                    {truncateString(resultAcc[index]?.option[0], 7)} {resultAcc[index]?.value[0]}
                  </span>
                  <br />
                  <span
                    className={`rounded-full text-white`}
                    style={{
                      backgroundColor: (() => rankColor(resultAcc[index]?.valueLevel[1] || ""))(),
                    }}
                  >
                    {resultAcc[index]?.valueLevel[1]}
                  </span>{" "}
                  <span>
                    {truncateString(resultAcc[index]?.option[1], 7)} {resultAcc[index]?.value[1]}
                  </span>
                  <br />
                  <span
                    className={`rounded-full text-white`}
                    style={{
                      backgroundColor: (() => rankColor(resultAcc[index]?.valueLevel[2] || ""))(),
                    }}
                  >
                    {resultAcc[index]?.valueLevel[2]}
                  </span>{" "}
                  <span>
                    {truncateString(resultAcc[index]?.option[2], 7)} {resultAcc[index]?.value[2]}
                  </span>
                  <br />
                  <span
                    className={`rounded-full text-white group relative`}
                    style={{
                      backgroundColor: (() => rankColor(resultAcc[index]?.statLevel || ""))(),
                    }}
                  >
                    {/* {getLevel(result?.options[1]?. optName, result?.options[1]?.value)} -{" "} */}
                    {resultAcc[index]?.statLevel}
                    <div className="absolute top-full w-[250%] px-3 py-2 bg-gray-800 text-white size-font-5xs rounded shadow-lg opacity-0 visibility-hidden pointer-events-none group-hover:opacity-100 group-hover:visibility-visible group-hover:pointer-events-auto transition-opacity duration-300">
                      0~24% 無급 스텟 <br />
                      25~49% 하급 스텟 <br />
                      50~74% 중급 스텟 <br />
                      75~100% 상급 스텟 <br />
                    </div>
                  </span>{" "}
                  {resultAcc[index]?.statPer}%, {resultAcc[index]?.stat}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBtm;
