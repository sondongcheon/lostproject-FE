import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

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
        statPercentage: option.statPercentage || "",
        upgradeLevel: option.upgradeLevel || "",
        tradeAllowCount: option.tradeAllowCount || "",
        categoryCode: option.categoryCode || "",
        itemGrade: option.itemGrade || "",
        pageNo: cntPage || "",
        numberCount: cntCount || "",
        etcOptionList: [
          {
            option: option.selectOption1 || null,
            value: option.selectValue1 || null,
          },
          {
            option: option.selectOption2 || null,
            value: option.selectValue2 || null,
          },
          {
            option: option.selectOption3 || null,
            value: option.selectValue3 || null,
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
      <div className="gap-x-12 flex items-center justify-center">
        <button
          className="bg-[#40AC8D] normalBtm w-24 h-10 "
          onClick={backPage}
          disabled={currentPage === 1}
        >
          이전 페이지
        </button>
        <span>{currentPage}</span>
        <button
          className="bg-[#40AC8D] normalBtm w-24 h-10 "
          onClick={updateNextPage}
          disabled={nextPageBtm}
        >
          {nextPageBtm ? (
            <div className="h-full bg-[url('./Assets/loading.webp')] bg-contain bg-center bg-no-repeat">
              {" "}
            </div>
          ) : (
            "다음 페이지"
          )}
        </button>
      </div>
    </div>
  );
};

export default PageNation;
