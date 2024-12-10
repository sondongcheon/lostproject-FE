import React, { useEffect, useState } from "react";
import axios from "axios";

function NoticeBoard(props) {
  const [test, setTest] = useState("");

  const loadPage = () => {
    axios
      .get(`${process.env.REACT_APP_URL}/board/notice`)
      .then((res) => {
        console.log(res);
        setTest(res.data.data);
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
      <div className="bg-white">
        ddd
        <br />
        {test}
      </div>
    </div>
  );
}

export default NoticeBoard;
