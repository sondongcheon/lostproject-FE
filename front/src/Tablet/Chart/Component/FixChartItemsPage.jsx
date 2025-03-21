import React, { useEffect, useState } from "react";
import axios from "axios";

import ItemsLineChartComp from "./ItemsLineChartComp";

const FixChartItemsPage = () => {
  const [data, setData] = useState(null);

  const loadData = () => {
    axios
      .get(`${process.env.REACT_APP_URL}/chart/book/info`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div className="mb-10 space-y-10">
        {" "}
        {data?.map((item, index) => (
          <ItemsLineChartComp data={item} />
        ))}
      </div>
    </div>
  );
};

export default FixChartItemsPage;
