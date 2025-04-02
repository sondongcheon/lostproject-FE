import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { BsFillQuestionCircleFill } from "react-icons/bs";

import leftBtm from "../../../Assets/leftBtm.png";
import rightBtm from "../../../Assets/rightBtm.png";
import loading from "../../../Assets/loading.webp";

const PageNation = ({
  dataLength,
  setResult,
  setResultList,
  option,
  cntPage,
  cntCount,
  apiKey,
  type,
  selAcc,
  currentPage,
  setCurrentPage,
}) => {
  const [selectOptionReq, setSelectOptionReq] = useState([]);

  const [hasMounted, setHasMounted] = useState(true);
  const [nextPageBtm, setNextPageBtm] = useState(false);

  const updateCntPageAndCount = (selAcc, newCntPage, newCntCount) => {
    setResult((prev) => {
      const updatedList = [...prev];
      updatedList[selAcc] = {
        ...updatedList[selAcc],
        cntPage: newCntPage,
        cntCount: newCntCount,
      };
      return updatedList;
    });
  };

  const updateNextPage = () => {
    if (dataLength > currentPage) {
      setCurrentPage((prev) => {
        const updatedPage = [...prev];
        updatedPage[selAcc] += 1;
        return updatedPage;
      });
    } else {
      const newSelectOptionReq = {
        tier: option.tier || "",
        quality: option.quality || "",
        statPer: option.statPer || "",
        upgradeLevel: option.upgradeLevel || "",
        tradeAllowCount: option.trdCnt || "",
        categoryCode: option.categoryCode || "",
        itemGrade: option.itemGrade || "",
        pageNo: cntPage || "",
        numberCount: cntCount || "",
        etcOptionList: [
          {
            option: option.selOpt1 || null,
            value: option.selVal1 || null,
          },
          {
            option: option.selOpt2 || null,
            value: option.selVal2 || null,
          },
          {
            option: option.selOpt3 || null,
            value: option.selVal3 || null,
          },
        ],
      };
      setSelectOptionReq(newSelectOptionReq);
    }
  };

  useEffect(() => {
    if (hasMounted) {
      // selectOptionReq 상태가 변경된 후에 실행
      setHasMounted(false);
    } else {
      const encodedApiKey = encodeURIComponent(apiKey);
      setNextPageBtm(true);
      axios
        .post(`${process.env.REACT_APP_URL}/auction/page`, selectOptionReq, {
          headers: { apiKey: encodedApiKey },
          params: { type },
        })
        .then((res) => {
          if (res.data.data.length > 0) {
            setResultList((prev) => {
              const updatedList = [...prev];
              updatedList[selAcc] = [...updatedList[selAcc], res.data.data]; // 데이터 추가
              return updatedList;
            });
            setCurrentPage((prev) => {
              const updatedPage = [...prev];
              updatedPage[selAcc] += 1;
              return updatedPage;
            });
            updateCntPageAndCount(selAcc, res.data.data[0]?.cntPage, res.data.data[0]?.cntCount);
          } else {
            return Swal.fire({
              icon: "warning",
              html: "다음 매물이 없습니다.",
              confirmButtonText: "확인",
            });
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
            // 30초 대기
            if (error.response.data.code === "API-001") {
              return new Promise((resolve) => setTimeout(resolve, 30000));
            } else {
              return new Promise((resolve) => setTimeout(resolve, 3000));
            }
          });
        })
        .finally(() => {
          setTimeout(() => {
            setNextPageBtm(false);
          }, 3000);
        });
    }
  }, [selectOptionReq]); // selectOptionReq가 변경될 때마다 실행

  const backPage = () => {
    setCurrentPage((prev) => {
      const updatedPage = [...prev];
      updatedPage[selAcc] -= 1;
      return updatedPage;
    });
  };

  return (
    <div>
      <div className="h-16 grid grid-cols-6">
        <div className="h-full flex pl-2 pb-2 group relative">
          <BsFillQuestionCircleFill className="self-end" />
          <div className="absolute z-50 top-full w-[500%] mt-2 px-3 py-2 bg-gray-800 text-white size-font-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            🔥주의🔥 다음 페이지 조회시 API요청이 추가로 들어갑니다. <br />
            <br />
            추가 요청 → '없어? 다음 또봐' 를 반복하기 때문에 10개를 채우기 위해 다음페이지 요청 시
            다소 시간이 소요됩니다.
          </div>
        </div>
        <div className="flex items-center justify-center col-span-4">
          <button
            className="h-8 flex items-center justify-center mx-auto"
            onClick={backPage}
            disabled={currentPage === 1}
          >
            <img src={leftBtm} className="w-full h-full" />
          </button>
          <span className="text-center w-8 size-font-2xl font-bold text-[#2384bc]">
            {nextPageBtm ? <img src={loading} className="h-8" /> : currentPage}
          </span>
          <button
            className="h-8 flex items-center justify-center mx-auto"
            onClick={updateNextPage}
            disabled={nextPageBtm}
          >
            <img src={rightBtm} className="w-full h-full" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageNation;
