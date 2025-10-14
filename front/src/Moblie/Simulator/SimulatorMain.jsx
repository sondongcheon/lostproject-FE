import React from "react";

import DisplayAds from "@/common/Component/DisplayAds";

function SimulatorMain(props) {
  return (
    <div className="mainMobileBody">
      <div className="text-center py-4">
        <h1 className="text-2xl font-bold">젬 시뮬레이터</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          BETA 버전입니다. 오류 확인, 가시성 개선 작업 진행중
        </p>
      </div>
      <DisplayAds />
    </div>
  );
}

export default SimulatorMain;
