import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";

import { BsFillQuestionCircleFill } from "react-icons/bs";

function Calstat({}) {
  const [open, setOpen] = useState(false);

  const [category, setCategory] = useState(0);
  const [upgradeLevel, setUpgradeLevel] = useState(0);
  const [stat, setStat] = useState(null);

  const [statPer, setStatPer] = useState(null);
  const [statFull, setStatFull] = useState(0);

  useEffect(() => {
    if (category === "0") {
      if (upgradeLevel === "0") {
        setStatPer((((stat - 12678) / 2679) * 100).toFixed(2));
        setStatFull(parseInt(stat) + 2500);
      } else if (upgradeLevel === "1") {
        setStatPer((((stat - 13035) / 2679) * 100).toFixed(2));
        setStatFull(parseInt(stat) + 2143);
      } else if (upgradeLevel === "2") {
        setStatPer((((stat - 13749) / 2679) * 100).toFixed(2));
        setStatFull(parseInt(stat) + 1429);
      } else if (upgradeLevel === "3") {
        setStatPer((((stat - 15178) / 2679) * 100).toFixed(2));
        setStatFull(parseInt(stat));
      }
    } else if (category === "1") {
      if (upgradeLevel === "0") {
        setStatPer((((stat - 9861) / 2083) * 100).toFixed(2));
        setStatFull(parseInt(stat) + 1945);
      } else if (upgradeLevel === "1") {
        setStatPer((((stat - 10139) / 2083) * 100).toFixed(2));
        setStatFull(parseInt(stat) + 1667);
      } else if (upgradeLevel === "2") {
        setStatPer((((stat - 10695) / 2083) * 100).toFixed(2));
        setStatFull(parseInt(stat) + 1111);
      } else if (upgradeLevel === "3") {
        setStatPer((((stat - 11806) / 2083) * 100).toFixed(2));
        setStatFull(parseInt(stat));
      }
    } else if (category === "2") {
      if (upgradeLevel === "0") {
        setStatPer((((stat - 9156) / 1935) * 100).toFixed(2));
        setStatFull(parseInt(stat) + 1806);
      } else if (upgradeLevel === "1") {
        setStatPer((((stat - 9414) / 1935) * 100).toFixed(2));
        setStatFull(parseInt(stat) + 1548);
      } else if (upgradeLevel === "2") {
        setStatPer((((stat - 9930) / 1935) * 100).toFixed(2));
        setStatFull(parseInt(stat) + 1032);
      } else if (upgradeLevel === "3") {
        setStatPer((((stat - 10962) / 1935) * 100).toFixed(2));
        setStatFull(parseInt(stat));
      }
    }
  }, [stat, category, upgradeLevel]);

  return (
    <div>
      <DialogTrigger onClick={() => setOpen(true)} css="hover:underline">
        🔢 악세 스텟 계산기
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
                      좋아보이는 장신구를 드셨군요? <br />
                      그 장신구의 스텟을 입력해 보세요 <br /> 어느정도 급의
                      스텟인지 확인 할 수 있어요
                    </div>
                  </div>
                  <span className="ml-6">이 장신구는 몇?</span>
                </div>
              </DialogTitle>
            </DialogHeader>
            <div className="w-[400px] sm:w-[640px] lg:w-[800px] h-36 flex justify-center items-center border-gray-200 shadow-lg gap-x-2 border-2 rounded-2xl bgWtoB">
              <div className="w-[47%] ">
                <div className="grid grid-cols-4">
                  <div className="font-bold col-span-1 border-b-2 border-gray-300 flex items-center justify-center ">
                    장신구 부위
                  </div>
                  <div className="col-span-3 border-b-2 border-gray-300 flex items-center justify-center ">
                    <form className="grid grid-cols-3 gap-2 justify-items-center">
                      <label>
                        <input
                          type="radio"
                          name="category"
                          value="0"
                          // className="mr-1"
                          // checked={options?.upgradeLevel === null}
                          onChange={(e) => setCategory(e.target.value)}
                        />
                        <span>목걸이</span>
                      </label>

                      <label>
                        <input
                          type="radio"
                          name="category"
                          value="1"
                          // className="mr-1"
                          onChange={(e) => setCategory(e.target.value)}
                        />
                        <span>귀걸이</span>
                      </label>

                      <label>
                        <input
                          type="radio"
                          name="category"
                          value="2"
                          // className="mr-1"
                          onChange={(e) => setCategory(e.target.value)}
                        />
                        <span>반지</span>
                      </label>
                    </form>
                  </div>
                </div>
                <div className="grid grid-cols-4">
                  <div className="font-bold col-span-1 border-gray-300 flex items-center justify-center">
                    연마 단계
                  </div>
                  <div className="col-span-3  border-gray-300 flex items-center justify-center">
                    <form className="grid grid-cols-4 justify-items-center gap-x-6">
                      <label>
                        <input
                          type="radio"
                          name="upgradeLevel"
                          value="0"
                          // className="mr-1"
                          // checked={options?.upgradeLevel === null}
                          onChange={(e) => setUpgradeLevel(e.target.value)}
                        />
                        <span>0</span>
                      </label>

                      <label>
                        <input
                          type="radio"
                          name="upgradeLevel"
                          value="1"
                          // className="mr-1"
                          onChange={(e) => setUpgradeLevel(e.target.value)}
                        />
                        <span>1</span>
                      </label>

                      <label>
                        <input
                          type="radio"
                          name="upgradeLevel"
                          value="2"
                          // className="mr-1"
                          onChange={(e) => setUpgradeLevel(e.target.value)}
                        />
                        <span>2</span>
                      </label>

                      <label>
                        <input
                          type="radio"
                          name="upgradeLevel"
                          value="3"
                          // className="mr-1"
                          onChange={(e) => setUpgradeLevel(e.target.value)}
                        />
                        <span>3</span>
                      </label>
                    </form>
                  </div>
                </div>
              </div>
              <div className="w-[18%] ">
                <div className="font-bold  border-gray-300 flex items-center justify-center">
                  현재 스텟
                </div>
                <div className=" border-gray-300 flex items-center justify-center">
                  <input
                    className="border boder-gray-200 rounded-xl text-end text-gray-500"
                    placeholder="0"
                    type="number"
                    min="0"
                    max="17857"
                    onChange={(e) => setStat(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-[30%]">
                <p>
                  {" "}
                  현재 스텟% -{" "}
                  <span className="font-bold">
                    {statPer > 0 && statPer < 101 ? statPer : "0"}%{" "}
                  </span>
                </p>
                <p>
                  {" "}
                  연마 완료시 스텟 -{" "}
                  <span className="font-bold">
                    {isNaN(statFull) ? 0 : statFull}
                  </span>
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default Calstat;
