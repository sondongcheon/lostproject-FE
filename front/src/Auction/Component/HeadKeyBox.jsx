import React from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const HeadKeyBox = ({ apiKey, setApiKey, saveKey, setSaveKey }) => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-4">
        <div className="h-20  grid grid-cols-6 flex shadow-lg border-2 rounded-3xl bg-[#F5F5F5]">
          {/* <div className="col-span-2 flex flex-col justify-center items-center">
            
          </div>

           */}
        </div>
        <div className="h-20 flex shadow-lg border-2 rounded-3xl bg-[#F5F5F5] grid ">
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
              <span className="font-bold pr-2">저장</span>
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
            <a href="https://developer-lostark.game.onstove.com/"> 키 발급 사이트 바로가기 </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeadKeyBox;
