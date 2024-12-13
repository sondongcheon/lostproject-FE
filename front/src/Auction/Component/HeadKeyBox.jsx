import React from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const HeadKeyBox = ({ apiKey, setApiKey, saveKey, setSaveKey }) => {
  return (
    <div>
      <div className="h-20 flex shadow-lg border-2 rounded-3xl bg-[#F5F5F5] grid grid-cols-10">
        <div className="col-span-2 flex flex-col justify-center items-center">
          <div>
            <input
              type="checkbox"
              checked={saveKey}
              onChange={(e) => setSaveKey(e.target.checked)}
            />
            <span className="font-bold">{` API 키 저장하기`}</span>
          </div>
        </div>
        {/* <div className="col-span-1 flex justify-center items-center"></div> */}
        <div className="col-span-4 flex items-center">
          <span className="font-bold"> {`API 키`}</span>
          <input
            className="border-2 w-[70%]"
            value={apiKey}
            type="text"
            onChange={(e) => setApiKey(e.target.value)}
          />
        </div>
        <div className="col-span-3 gap-x-10 flex justify-end items-center ">
          <div>
            {" "}
            <button
              className=""
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
          <a href="https://developer-lostark.game.onstove.com/"> API 발급 사이트 바로가기 </a>
        </div>
      </div>
    </div>
  );
};

export default HeadKeyBox;
