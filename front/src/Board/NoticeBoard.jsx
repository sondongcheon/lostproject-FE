import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";

function NoticeBoard(props) {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    return format(new Date(dateString), "yyyy-MM-dd HH:mm");
  };

  const [contents, setContents] = useState(null);

  const loadPage = () => {
    axios
      .get(`${process.env.REACT_APP_TEST_URL}/board/notice/main`, {
        params: { page: 0 },
      })
      .then((res) => {
        console.log(res);
        setContents(res.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    loadPage();
  }, []);

  return (
    <div className="mainbody">
      <div className="flex justify-center items-center ">
        <div className="w-4/5">
          <table className="border-collapse border border-gray-300 w-full text-center">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 ">번호</th>
                <th className="p-4 ">카테고리</th>
                <th className="p-4 ">제목</th>
                <th className="p-4 ">글쓴이</th>
                <th className="p-4 ">등록일</th>
              </tr>
            </thead>
            <tbody>
              {contents?.contentList.map((content, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50"
                  onClick={() => navigate(`/notice/${content.number}`)}
                >
                  <td className="p-4 ">{content.number}</td>
                  <td className="p-4 ">{content.category || "미분류"}</td>
                  <td className="p-4 ">{content.title}</td>
                  <td className="p-4 ">{content.writer}</td>
                  <td className="p-4 ">{formatDate(content.createAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className=""></div>
        </div>
      </div>
    </div>
  );
}

export default NoticeBoard;
