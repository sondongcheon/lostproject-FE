import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const LineChartComp = ({ category, grade, value, value2, name }) => {
  const [info, setInfo] = useState("");

  const loadData = () => {
    axios
      .get(`${process.env.REACT_APP_URL}/chart/info`, {
        params: { tier: 4, category, grade, value, value2 },
      })
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    var str = "4T";
    if (grade === "godae") str = str + " 고대";
    else if (grade === "umuoel") str = str + " 유물";

    if (category === "neck") str = str + " 목걸이";
    else if (category === "earing") str = str + " 귀걸이";
    else if (category === "ring") str = str + " 반지";

    // 단일옵션
    if (value === "x" || value2 === "x") {
      //부위선택
      if (category === "neck") {
        //옵션선택
        if (value === "x") str = str + " 적주피";
        else if (value2 === "x") str = str + " 추피";
      } else if (category === "earing") {
        if (value === "x") str = str + " 무공%";
        else if (value2 === "x") str = str + " 공%";
      } else if (category === "ring") {
        if (value === "x") str = str + " 치피%";
        else if (value2 === "x") str = str + " 치적%";
      }

      if (value === "h" || value2 === "h") str = str + " 상";
      else if (value === "m" || value2 === "m") str = str + " 중";
    } else {
      str = str + " " + name;
    }

    setInfo(str);

    loadData();
  }, [category, grade]);

  const [data, setData] = useState([]);

  return (
    <div>
      <div className="border-b-2 border-red-200">
        <h2 className="text-center">{info}</h2>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 50,
              left: 40,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" className="text-xs" />
            <YAxis />
            <Tooltip formatter={(name) => [`${name.toLocaleString()} Gold`]} />
            <Line
              type="monotone"
              dataKey="buyPrice"
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChartComp;
