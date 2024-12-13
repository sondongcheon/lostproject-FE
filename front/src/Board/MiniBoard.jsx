import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";

function MiniBoard(props) {
  const [contents, setContents] = useState([]);
  const [text, setText] = useState({ content: "" });

  const updateText = (key, value) => {
    setText((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), "yy-MM-dd HH:mm");
  };

  const loadPage = () => {
    axios
      .get(`${process.env.REACT_APP_URL}/board/mini`)
      .then((res) => {
        console.log(res.data.data);
        setContents(res.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const sendText = () => {
    axios
      .post(`${process.env.REACT_APP_URL}/board/mini`, text)
      .then(() => {})
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        loadPage();
        setText({ content: "" });
      });
  };

  useEffect(() => {
    loadPage();
  }, []);

  return (
    <div>
      <div className="mainbody">
        <div className="w-4/5 mx-auto pt-10 pb-10">
          <span className="text-[52px] font-bold ">유저 코멘트</span>
        </div>
        <div className="w-4/5 mx-auto flex justify-center items-center gap-x-4">
          <input
            type="text"
            className="w-[90%] h-8"
            placeholder=" 버그나 신경 쓰이는 부분 혹은 원하는 추가기능을 코멘트를 남겨주세요"
            value={text.content}
            onChange={(e) => updateText("content", e.target.value)}
          />
          <button className="h-10 bg-[#40AC8D] resetBtm" onClick={sendText}>
            {" "}
            글쓰기
          </button>
        </div>
        <div className="flex justify-center items-center mt-4">
          <div className="w-4/5 overflow-x-auto">
            <table className="border-collapse border-t border-b border-gray-300 w-full text-center">
              <thead className="bg-[#b2ddad]">
                <tr>
                  <th className="p-4 w-1/10">번호</th>
                  <th className="p-4 w-1/2">내용</th>
                  <th className="p-4 w-1/5">글쓴이</th>
                  <th className="p-4 w-1/5">등록일</th>
                </tr>
              </thead>
              <tbody>
                {contents.map((content, index) => (
                  <tr
                    key={index}
                    className={`hover:bg-gray-50 ${index % 2 === 0 ? "bg-gray-100" : null}`}
                  >
                    <td className="p-4 ">{content.number}</td>
                    <td className="p-4 text-left">{content.content}</td>
                    <td className="p-4 ">{content.unknown}</td>
                    <td className="p-4 ">{formatDate(content.createAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className=""></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MiniBoard;
