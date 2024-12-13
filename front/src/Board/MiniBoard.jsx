import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";

function MiniBoard(props) {
  const [contents, setContents] = useState([]);
  const [text, setText] = useState({});

  const updateText = (key, value) => {
    setText((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), "yyyy-MM-dd HH:mm");
  };

  const loadPage = () => {
    axios
      .get(`${process.env.REACT_APP_TEST_URL}/board/mini`)
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
      });
  };

  useEffect(() => {
    loadPage();
  }, []);

  return (
    <div>
      <div className="mainbody">
        <div className="w-4/5 flex justify-center items-center">
          <span>입력하기 : </span>
          <input type="text" onChange={(e) => updateText("content", e.target.value)} />
          <button className="normalBtm" onClick={sendText}>
            {" "}
            전송하기
          </button>
        </div>
        <div className="flex justify-center items-center ">
          <div className="w-4/5 overflow-x-auto">
            <table className="border-collapse border border-gray-300 w-full text-center">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4 ">번호</th>
                  <th className="p-4 w-1/2">내용</th>
                  <th className="p-4 ">글쓴이</th>
                  <th className="p-4 ">등록일</th>
                </tr>
              </thead>
              <tbody>
                {contents.map((content, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="p-4 ">{content.number}</td>
                    <td className="p-4 ">{content.content}</td>
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
