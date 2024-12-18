import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function TestFour(props) {
  const [request, setRequest] = useState({});

  const updateRequest = (key, value) => {
    setRequest((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const sendText = () => {
    if (request.content.length > 2) {
      axios
        .post(`${process.env.REACT_APP_URL}/board/notice`, request)
        .then(() => {})
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          Swal.fire({
            icon: "success",
            html: "완료요",
            confirmButtonText: "확인",
          });
          setRequest({});
        });
    } else {
      Swal.fire({
        icon: "warning",
        html: "내용을 입력해주세요.",
        confirmButtonText: "확인",
      });
    }
  };
  return (
    <div>
      <div className="mainbody">
        <label>카테고리</label>
        <select
          value={request.category}
          onChange={(e) => updateRequest("category", e.target.value)}
        >
          <option value="">-- Select an option --</option>
          <option value="개발일지">개발일지</option>
          <option value="공지사항">공지사항</option>
          <option value="스몰토크">스몰토크</option>
        </select>
        <label> 제목 </label>
        <input
          type="text"
          value={request.title}
          onChange={(e) => updateRequest("title", e.target.value)}
        ></input>
        <br />
        <label> 비번 </label>
        <input
          type="text"
          value={request.password}
          onChange={(e) => updateRequest("password", e.target.value)}
        ></input>
        <br />
        <label> 내용 </label> <br />
        <textarea
          value={request.content}
          onChange={(e) => updateRequest("content", e.target.value)}
          className="w-full min-h-[60vh] p-2 resize-none overflow-auto"
          placeholder="내용을 입력하세요..."
        />{" "}
        <br />
        <button className="normalBtm" onClick={sendText}>
          보내기
        </button>
      </div>
    </div>
  );
}

export default TestFour;
