import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { IoCaretForwardOutline } from "react-icons/io5";
import { IoCaretBackOutline } from "react-icons/io5";
import { BsFillQuestionCircleFill } from "react-icons/bs";

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
      <div className="h-16 grid grid-cols-6">
        <div className="h-full flex pl-2 pb-2 group relative">
          <BsFillQuestionCircleFill className="self-end" />
          <div className="absolute z-50 top-full w-[500%] mt-2 px-3 py-2 bg-gray-800 text-white size-font-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            좌측, 최저가 / 우측, 추가목록 입니다. <br />
            좌측에서 부위 클릭시 우측 목록이 해당 부위에 맞게 변경됩니다. <br />
            우측 리스트에서 버튼을 통해 추가 매물을 조회할 수 있습니다. <br />
            🔥주의🔥 추가 매물 조회시 API요청이 추가로 들어갑니다. <br />
            <br />
            한번의 조회로는 한바구니에 10개만 담아올 수 있기 때문입니다. <br />
            힘민지 필터의 경우 조회 → 자체 필터를 거치기 때문에 <br />
            10개를 채우기 위해 다음페이지 요청 시 다소 시간이 소요됩니다.
          </div>
        </div>
        <div className="gap-x-6 flex items-center justify-center col-span-4">
          <button
            className="bg-[#F5F5F5] border-2 border-gray-500 rounded-xl w-20 h-1/3 flex items-center justify-center mx-auto"
            onClick={backPage}
            disabled={currentPage === 1}
          >
            <IoCaretBackOutline />
          </button>
          <span className="size-font-2xl font-bold">{currentPage}</span>
          <button
            className="bg-[#F5F5F5] border-2 border-gray-500 rounded-xl w-20 h-1/3 flex items-center justify-center mx-auto"
            onClick={updateNextPage}
            disabled={nextPageBtm}
          >
            {nextPageBtm ? (
              <div className="w-full h-full bg-[url('./Assets/loading.webp')] bg-contain bg-center bg-no-repeat">
                {" "}
              </div>
            ) : (
              <IoCaretForwardOutline />
            )}
          </button>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default PageNation;
