import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { set } from "date-fns";

const HeadKeyBox = ({ apiKey, setApiKey, saveKey, setSaveKey }) => {
  return (
    <div>
      <div className="h-24 shadow-lg border-2 rounded-3xl bg-[#F5F5F5]">
        <div className="flex justify-center items-center gap-x-4">
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
          <a
            className="hover:underline"
            target="_blank"
            href="https://developer-lostark.game.onstove.com/"
          >
            {" "}
            API 키 발급 사이트{" "}
          </a>
        </div>
        <div
          className={`${
            apiKey === "" || !apiKey
              ? "font-bold text-center text-xs text-red-500"
              : "opacity-0 invisible text-xs"
          } `}
        >
          🚨 API Key가 입력되지 않았습니다.🚨 <br /> 공용키가 사용되어 검색은 가능합니다. 분당 횟수
          초과가 일어날 확률이 높습니다.
        </div>
      </div>
    </div>
  );
};

export default HeadKeyBox;
