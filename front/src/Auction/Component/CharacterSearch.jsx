import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";

import { useSelector, useDispatch } from "react-redux";

import { BiSearchAlt } from "react-icons/bi";

import { BsFillQuestionCircleFill } from "react-icons/bs";

function CharacterSearch({}) {
  const [open, setOpen] = useState(false);

  const apiKey = useSelector((state) => state.settings.apiKey);
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
            return new Promise((resolve) => setTimeout(resolve, 5000));
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
      <DialogTrigger onClick={() => setOpen(true)} css="hover:underline">
        🔍 착용 악세 간이검색
      </DialogTrigger>

      {open && (
        <Dialog onClose={() => setOpen(false)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                <div className="size-font-xl h-full flex  pb-4 ">
                  <div className="group relative w-4 h-8">
                    <BsFillQuestionCircleFill className=" h-full"></BsFillQuestionCircleFill>
                    <div className="absolute z-10 top-full w-[2000%] px-3 py-2 bg-gray-800 text-white size-font-xxxs rounded shadow-lg opacity-0 visibility-hidden pointer-events-none group-hover:opacity-100 group-hover:visibility-visible group-hover:pointer-events-auto transition-opacity duration-300">
                      현재 사용중인 악세를 가볍게 확인해 보세요
                    </div>
                  </div>
                  <span className="ml-6">캐릭터 착용 악세 검색</span>
                </div>
              </DialogTitle>
            </DialogHeader>
            <div>
              <div className="h-32 flex justify-center items-center w-full">
                <div className="grid grid-cols-6 h-full bg-[#F2F1E6] flex rounded-3xl bg-gray-200 shadow-lg">
                  <div className="h-full flex flex-col items-center justify-center gap-y-2">
                    <p>착용 악세 간편 확인</p>
                    <div className="flex justify-center items-center ">
                      <input
                        className="w-3/4 h-6 text-center"
                        placeholder="닉네임 입력"
                        value={name}
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                      />
                      <button
                        className="flex justify-center items-center w-6 h-6 bg-[#FF6347]"
                        onClick={searchAcc}
                        disabled={searchCharState || name.length < 3}
                      >
                        {searchCharState ? (
                          <div className="w-full h-full bg-[url('./Assets/loading.webp')] bg-contain bg-center bg-no-repeat">
                            {" "}
                          </div>
                        ) : (
                          <BiSearchAlt />
                        )}
                      </button>
                    </div>
                    {resultAcc[0]?.itemLevel ? (
                      <div>아이템 레벨 {resultAcc[0].itemLevel}</div>
                    ) : (
                      <div className="text-gray-400">아이템 레벨 정보 없음</div>
                    )}
                  </div>
                  {resultAcc
                    .filter((item) => item?.option?.length > 0)
                    .map((item, index) => (
                      <div key={index} className="h-full flex items-center">
                        <div className="text-sm">
                          <div className="font-bold">
                            <span
                              className="pr-4"
                              style={{
                                background:
                                  "linear-gradient(to bottom, transparent 30%, #F5FF00 70%)",
                              }}
                            >
                              {item?.type && <>{item.type} &nbsp;</>}
                              {item?.tier !== 0 && item?.grade && (
                                <>
                                  | &nbsp; {item.tier}T-{item.grade}
                                </>
                              )}
                            </span>
                          </div>
                          {[0, 1, 2].map((i) =>
                            item?.option[i] ? (
                              <div key={i}>
                                <span
                                  className="rounded-full text-white px-1"
                                  style={{ backgroundColor: rankColor(item?.valueLevel[i] || "") }}
                                >
                                  {item?.valueLevel[i]}
                                </span>{" "}
                                <span>
                                  {truncateString(item?.option[i], 9)} {item?.value[i]}
                                </span>
                                <br />
                              </div>
                            ) : null
                          )}
                          <span
                            className="rounded-full text-white px-1 group relative"
                            style={{
                              backgroundColor: rankColor(item?.statLevel || ""),
                            }}
                          >
                            {item?.statLevel}
                            <div className="absolute top-full w-[250%] px-3 py-2 bg-gray-800 text-white text-[10px] rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                              0~24% 無급 스텟 <br />
                              25~49% 하급 스텟 <br />
                              50~74% 중급 스텟 <br />
                              75~100% 상급 스텟
                            </div>
                          </span>{" "}
                          {item?.statPer}%, {item?.stat}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default CharacterSearch;
