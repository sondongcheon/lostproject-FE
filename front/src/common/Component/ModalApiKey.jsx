import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { useSelector, useDispatch } from "react-redux";
import { setApiKey } from "../../store/settingsSlice";

import { BsFillQuestionCircleFill } from "react-icons/bs";

function ModalApiKey({}) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const apiKey = useSelector((state) => state.settings.apiKey);

  useEffect(() => {
    const cookieValue = Cookies.get("apiKey" ?? "");
    if (Cookies.get("apiKey") !== undefined) {
      //setSaveKey(true);
    }
    dispatch(setApiKey(cookieValue));
  }, []);

  return (
    <div>
      <DialogTrigger
        onClick={() => setOpen(true)}
        css="size-font-xxs hover:underline"
      >
        🔑 API KEY입력
      </DialogTrigger>

      {open && (
        <Dialog onClose={() => setOpen(false)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                <div className="size-font-xl h-full flex  pb-4 ">
                  <div className="group relative pr-4">
                    <BsFillQuestionCircleFill className="ml-4 h-6" />
                    <div className="absolute z-50 text-center w-[640%] sm:w-[940%] lg:w-[1500%] px-3 py-2 bg-gray-800 dark:bg-gray-200 text-white dark:text-black size-font-xxs sm:size-font-xxxs lg:size-font-4xs rounded-lg shadow-lg opacity-0 visibility-hidden pointer-events-none group-hover:opacity-100 group-hover:visibility-visible group-hover:pointer-events-auto transition-opacity duration-300">
                      🔥API KEY는 인게임 정보를 가져오기 위한 일종의 로아 신분증
                      입니다.🔥 <br />
                      <br />
                      API KEY를 같이 전달해야 로아측에서 정보를 주기 때문에
                      필수적인 항목입니다. <br />
                      우리 사이트에선 인게임 정보를 API KEY를 통해 전달받고 보기
                      쉽게 포장해 주는 역할을 하는것이죠 <br />
                      API KEY에는 분당 100회의 제한이 있기 때문에 개인 KEY를
                      사용할 경우 사이트 이용이 좀더 쾌적합니다!
                    </div>
                  </div>
                  왜 API KEY를 입력해야 하나요?
                </div>
              </DialogTitle>
            </DialogHeader>
            <div
              className="h-64 sm:h-60 bgWtoB rounded-xl shadow-lg 
             border-2 border-gray-300 
             outline outline-2 outline-offset-4 outline-gray-800
             flex flex-col items-center justify-center gap-2 sm:gap-2 px-4"
            >
              <div className="flex items-center ">
                🔑
                <input
                  className="border-2 w-48 sm:w-96"
                  placeholder="API KEY"
                  value={apiKey}
                  type="text"
                  onChange={(e) => {
                    dispatch(setApiKey(e.target.value));
                  }}
                />
              </div>
              <div>
                {" "}
                <button
                  className="hover:underline"
                  onClick={() => {
                    Cookies.remove("apiKey");
                    dispatch(setApiKey(""));
                    Swal.fire({
                      icon: "warning",
                      html: "저장한 API키를 삭제하였습니다.",
                      confirmButtonText: "확인",
                    });
                  }}
                >
                  저장된 API 키 삭제
                </button>
              </div>
              <a
                className="hover:underline"
                target="_blank"
                href="https://developer-lostark.game.onstove.com/"
              >
                API 키 발급 사이트 바로가기
              </a>
              <div
                className={`${
                  apiKey === "" || !apiKey
                    ? "font-bold text-center size-font-xxxs  text-red-500"
                    : "opacity-0 invisible size-font-xxxs"
                } `}
              >
                🚨 API Key가 입력되지 않았습니다 🚨 <br /> 공용키가 사용되어
                검색은 가능합니다. 분당 횟수 초과가 일어날 확률이 높습니다.
              </div>
              <button
                className="mt-4 w-[75%] px-3 py-1 bg-zinc-800 text-white rounded size-font-xs"
                onClick={() => {
                  setOpen(false);
                  Cookies.set("apiKey", apiKey, {
                    expires: 89,
                    secure: true,
                    sameSite: "Strict",
                  });
                }}
              >
                닫기 & 입력된 KEY 저장하기
              </button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default ModalApiKey;
