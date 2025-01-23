import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";

import BoardContent from "./Component/BoardContent";

function TBoardDetail(props) {
  const { id } = useParams();
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
      .get(`${process.env.REACT_APP_URL}/board/notice/content`, {
        params: { id },
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
            <table className="border-collapse border border-gray-300 size-font-xs w-full text-center">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 ">{contents?.number || ""}</th>
                  <th className="p-2 ">{contents?.title || ""}</th>
                  <th className="p-2 ">{contents?.nickname || ""}</th>
                  <th className="p-2 ">
                    {formatDate(contents?.createAt || null)} <br />{" "}
                    {formatDateTime(contents?.createAt || null)}
                  </th>
                </tr>
              </thead>
            </table>
            <div className="mt-4">
              <BoardContent content={contents?.content}></BoardContent>
            </div>
            <div className="mt-4">
              <button className="normalBtm" onClick={() => navigate("/notice")}>
                목록으로
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TBoardDetail;
