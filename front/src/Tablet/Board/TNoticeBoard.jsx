import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";

function TNoticeBoard(props) {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    return format(new Date(dateString), "yy-MM-dd");
  };

  const formatDateTime = (dateString) => {
    return format(new Date(dateString), "HH:mm");
  };

  const [contents, setContents] = useState(null);

  const loadPage = () => {
    axios
      .get(`${process.env.REACT_APP_URL}/board/notice/main`, {
        params: { page: 0 },
      })
      .then((res) => {
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
    <div className="">
      <div className="mainMobileBody">
        <div className="flex justify-center items-center ">
          <div className="w-[90%]">
            <table className="border-collapse border border-gray-300 size-font-xs text-center">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 ">번호</th>
                  <th className="p-2 ">카테고리</th>
                  <th className="p-2 w-1/3 ">제목</th>
                  <th className="p-2 ">글쓴이</th>
                  <th className="p-2 ">등록일</th>
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
                    <td className="p-4 text-left">{content.title}</td>
                    <td className="p-4 ">{content.writer}</td>
                    <td className="p-4 ">
                      {formatDate(content.createAt)} <br />{" "}
                      {formatDateTime(content.createAt)}{" "}
                    </td>
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

export default TNoticeBoard;
