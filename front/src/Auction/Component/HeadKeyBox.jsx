import React from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const HeadKeyBox = ({ apiKey, setApiKey, saveKey, setSaveKey }) => {
  return (
    <div>
      <div className="h-20 flex shadow-lg border-2 rounded-3xl bg-[#F5F5F5] grid grid-cols-10">
        <div className="col-span-1 flex flex-col justify-center items-center">
          <div>
            <input
              type="checkbox"
              checked={saveKey}
              onChange={(e) => setSaveKey(e.target.checked)}
            />
            저장하기
          </div>
          <div>
            {" "}
            <button
              className="normalBtm"
              onClick={() => {
                Cookies.remove("apiKey");
                Swal.fire({
                  html: "저장한 API KEY가 삭제되었습니다.",
                  confirmButtonText: "확인",
                });
              }}
            >
              저장값삭제하기
            </button>
          </div>
        </div>
        <div className="col-span-1 flex justify-center items-center">
          <span> {`API KEY ->`}</span>
        </div>
        <div className="col-span-8 flex items-center">
          <input
            className="border-2"
            value={apiKey}
            type="text"
            onChange={(e) => setApiKey(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default HeadKeyBox;
