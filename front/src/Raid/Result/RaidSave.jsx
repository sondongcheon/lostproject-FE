import React, { useState } from "react";
import SideBar from "../Components/SideBar";
import axios from "axios";
import Swal from "sweetalert2";

import { useSelector } from "react-redux";

function RaidSave(props) {
  const [searchState, setSearchState] = useState(false);
  const [flags, setFlags] = useState([false, false, false, false]);
  const apiKey = useSelector((state) => state.settings.apiKey);

  const [files, setFiles] = useState([]);

  const handleFilesChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    const isJpg = selectedFile.type === "image/jpeg";
    const isLt5MB = selectedFile.size <= 5 * 1024 * 1024;

    if (!isJpg) {
      alert("JPG 파일만 업로드 가능합니다.");
      return;
    }

    if (!isLt5MB) {
      alert("파일 크기는 5MB 이하여야 합니다.");
      return;
    }

    // 조건을 만족하는 경우에만 state에 저장
    setFiles([selectedFile]);
  };

  const handleFlagChange = (index) => {
    console.log(apiKey);
    const newFlags = [...flags];
    newFlags[index] = !newFlags[index];
    setFlags(newFlags);
  };

  const SaveData = () => {
    if (files.length === 0) {
      alert("파일을 먼저 선택해주세요.");
      return;
    }
    const queryString = flags.map((flag) => `flags=${flag}`).join("&");
    const formData = new FormData();
    formData.append("mvp", files[0]);

    const encodedApiKey = encodeURIComponent(apiKey);
    setSearchState(true);
    axios
      .post(`${process.env.REACT_APP_URL}/raid/result/mvpimg?${queryString}`, formData, {
        headers: { apiKey: encodedApiKey },
      })
      .then((res) => {
        console.log(res.data.data);
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
          // 60초 대기
          if (error.response.data.code === "API-001") {
            return new Promise((resolve) => setTimeout(resolve, 60000));
          } else {
            return new Promise((resolve) => setTimeout(resolve, 5000));
          }
        });
      })
      .finally(() => {
        setTimeout(() => {
          setSearchState(false);
        }, 5000);
      });
  };

  return (
    <div>
      <div className="mainbody flex">
        <div className="w-[15%]">
          <SideBar />
        </div>
        <div className="w-[85%]">
          <form>
            <input className="file-input" type="file" accept=".jpg" onChange={handleFilesChange} />
            <div className="mb-4 space-y-2">
              {flags.map((flag, index) => (
                <div key={index}>
                  <label>
                    <input
                      type="checkbox"
                      checked={flag}
                      onChange={() => handleFlagChange(index)}
                    />{" "}
                    Flag {index + 1}
                  </label>
                </div>
              ))}
            </div>
            <button type="button" onClick={SaveData}>
              요청 보내기
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RaidSave;
