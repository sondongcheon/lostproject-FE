import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";

function BoardDetail(props) {
  const { id } = useParams();

  const formatDate = (dateString) => {
    return format(new Date(dateString), "yyyy-MM-dd HH:mm");
  };

  const [contents, setContents] = useState(null);

  const loadPage = () => {
    console.log("dd");
    axios
      .get(`${process.env.REACT_APP_TEST_URL}/board/notice/content`, {
        params: { id },
      })
      .then((res) => {
        console.log(res.data.data);
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
    <div>
      <div className="mainbody">
        <div className="flex justify-center items-center ">
          <div className="w-4/5">
            <table className="border-collapse border border-gray-300 w-full text-center">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4 ">{contents?.number || ""}</th>
                  <th className="p-4 ">{contents?.title || ""}</th>
                  <th className="p-4 ">{contents?.nickname || ""}</th>
                  <th className="p-4 ">{formatDate(contents?.createAt || null)}</th>
                </tr>
              </thead>
            </table>
            <div className="h-full flex justify-center items-center">{contents?.content || ""}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoardDetail;
