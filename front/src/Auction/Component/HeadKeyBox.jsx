import React from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const HeadKeyBox = ({ apiKey, setApiKey, saveKey, setSaveKey }) => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-4">
        <div className="h-30  flex shadow-lg border-2 rounded-3xl bg-[#F5F5F5]">
          {/* <div className="col-span-2 flex flex-col justify-center items-center">
            
          </div>

           */}
          <span className="p-4">
            <span className="text-red-500 font-bold text-xl">특수 추적</span>
            <span>이란?</span>
            <br />
            연마 등급만 정하고(ex. 상단일 3개 중중 2개) 그 등급을 어느 악세서리와 매칭하는게 가장
            저렴한지 <br /> 검색합니다. 연마 옵션을 선택 하지 않고, 등급만 선택한 후 모든 경우의
            수를 비교합니다.
          </span>
        </div>
        <div className="h-30 flex shadow-lg border-2 rounded-3xl bg-[#F5F5F5] grid ">
          <div className=" flex justify-center items-center gap-x-4">
            <div className=" flex items-center">
              {/* <span className="font-bold"> {`API 키`}</span> */}
              <input
                className="border-2 "
                placeholder="API KEY"
                value={apiKey}
                type="text"
                onChange={(e) => setApiKey(e.target.value)}
              />
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              <span className="font-bold pr-1 ">저장</span>
              <input
                className="h-16"
                type="checkbox"
                checked={saveKey}
                onChange={(e) => setSaveKey(e.target.checked)}
              />
            </div>

            <div>
              {" "}
              <button
                className="hover:underline"
                onClick={() => {
                  Cookies.remove("apiKey");
                  setApiKey("");
                  Swal.fire({
                    icon: "warning",
                    html: "저장한 API키를 삭제하였습니다.",
                    confirmButtonText: "확인",
                  });
                }}
              >
                API 키 삭제
              </button>
            </div>
            <a className="hover:underline" href="https://developer-lostark.game.onstove.com/">
              {" "}
              API 키 발급 사이트{" "}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeadKeyBox;
