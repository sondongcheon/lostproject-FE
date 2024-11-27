import React, { useState } from "react";
import axios from "axios";

function TestThree(props) {
  const [responseData, setResponseData] = useState(null);

  // 상태 관리: 입력값을 저장

  const [inputData, setInputData] = useState([
    {
      itemGradeQuality: "",
      itemUpgradeLevel: "",
      itemTradeAllowCount: "",
      categoryCode: "",
      itemGrade: "",
      optionFirst: "",
      valueFirst: "",
      optionSecond: "",
      valueSecond: "",
    },
    {
      itemGradeQuality: "",
      itemUpgradeLevel: "",
      itemTradeAllowCount: "",
      categoryCode: "",
      itemGrade: "",
      optionFirst: "",
      valueFirst: "",
      optionSecond: "",
      valueSecond: "",
    },
    {
      itemGradeQuality: "",
      itemUpgradeLevel: "",
      itemTradeAllowCount: "",
      categoryCode: "",
      itemGrade: "",
      optionFirst: "",
      valueFirst: "",
      optionSecond: "",
      valueSecond: "",
    },
    {
      itemGradeQuality: "",
      itemUpgradeLevel: "",
      itemTradeAllowCount: "",
      categoryCode: "",
      itemGrade: "",
      optionFirst: "",
      valueFirst: "",
      optionSecond: "",
      valueSecond: "",
    },
    {
      itemGradeQuality: "",
      itemUpgradeLevel: "",
      itemTradeAllowCount: "",
      categoryCode: "",
      itemGrade: "",
      optionFirst: "",
      valueFirst: "",
      optionSecond: "",
      valueSecond: "",
    },
  ]);

  const [total, setTotal] = useState(0);

  const getTotal = () => {
    var tmp = responseData.reduce((sum, item) => {
      console.log("가격", item.auctionInfo.buyPrice);
      return sum + (item.auctionInfo.buyPrice || 0);
    }, 0);
    setTotal(tmp);
  };

  const result = () => {
    const payload = inputData.map((data, index) => ({
      quality: data.itemGradeQuality,
      upgradeLevel: data.itemUpgradeLevel,
      tradeAllowCount: data.itemTradeAllowCount,
      categoryCode: data.categoryCode,
      itemGrade: data.itemGrade,
      etcOptionList: [
        {
          option: data.optionFirst,
          value: data.valueFirst,
        },
        {
          option: data.optionSecond,
          value: data.valueSecond,
        },
      ],
    }));

    console.log("RequestBody ", payload);

    axios
      .post(`${process.env.REACT_APP_TEST_URL}/action/test4`, payload)
      .then((res) => {
        console.log(res);
        setResponseData(res.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChange = (index, field, value) => {
    const updatedData = [...inputData];
    updatedData[index][field] = value;
    setInputData(updatedData);
  };

  return (
    <div>
      <div className="boxContainer">
        {inputData.map((data, index) => (
          <div className="optionBox" key={index}>
            <h3>Box {index + 1}</h3>
            <label>품질</label>
            <input
              placeholder="품질"
              value={data.itemGradeQuality}
              onChange={(e) => handleChange(index, "itemGradeQuality", e.target.value)}
            />
            <br />
            <label>연마 단계</label>
            <select
              value={data.itemUpgradeLevel}
              onChange={(e) => handleChange(index, "itemUpgradeLevel", e.target.value)}
            >
              <option value="" disabled>
                -- Select an option --
              </option>
              <option value="0">연마 전</option>
              <option value="1">1단계</option>
              <option value="2">2단계</option>
              <option value="3">3단계</option>
            </select>
            <br />
            <label>거래 가능 횟수</label>
            <select
              value={data.itemTradeAllowCount}
              onChange={(e) => handleChange(index, "itemTradeAllowCount", e.target.value)}
            >
              <option value="" disabled>
                -- Select an option --
              </option>
              <option value="0">구매시 거래 불가</option>
              <option value="1">구매시 거래 거래 1회 가능</option>
              <option value="2">구매시 거래 거래 2회 가능</option>
            </select>
            <br />
            <label>악세서리 종류</label>
            <select
              value={data.categoryCode}
              onChange={(e) => handleChange(index, "categoryCode", e.target.value)}
            >
              <option value="" disabled>
                -- Select an option --
              </option>
              <option value="200000">장신구 - 상관없음</option>
              <option value="200010">장신구 - 목걸이</option>
              <option value="200020">장신구 - 귀걸이</option>
              <option value="200030">장신구 - 반지</option>
            </select>
            <br />
            <label>등급</label>
            <select
              value={data.itemGrade}
              onChange={(e) => handleChange(index, "itemGrade", e.target.value)}
            >
              <option value="" disabled>
                -- Select an option --
              </option>
              <option value="유물">유물</option>
              <option value="고대">고대</option>
            </select>
            <br />
            <label>연마 효과 1번</label>
            <select
              value={data.optionFirst}
              onChange={(e) => handleChange(index, "optionFirst", e.target.value)}
            >
              <option value="" disabled>
                -- Select an option --
              </option>
              <option value="45">공격력 %</option>
              <option value="46">무기공격력 %</option>
              <option value="49">치명타 적중률 %</option>
              <option value="50">치명타 피해 %</option>
              <option value="42">적에게 주는 피해 %</option>
              <option value="41">추가 피해 %</option>
            </select>
            <br />
            <label>연마 효과 수치 1번</label>
            <select
              value={data.valueFirst}
              onChange={(e) => handleChange(index, "valueFirst", e.target.value)}
            >
              <option value="" disabled>
                -- Select an option --
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
            <br />
            <label>연마 효과 2번</label>
            <select
              value={data.optionSecond}
              onChange={(e) => handleChange(index, "optionSecond", e.target.value)}
            >
              <option value="" disabled>
                -- Select an option --
              </option>
              <option value="45">공격력 %</option>
              <option value="46">무기공격력 %</option>
              <option value="49">치명타 적중률 %</option>
              <option value="50">치명타 피해 %</option>
              <option value="42">적에게 주는 피해 %</option>
              <option value="41">추가 피해 %</option>
            </select>
            <br />
            <label>연마 효과 수치 2번</label>
            <select
              value={data.valueSecond}
              onChange={(e) => handleChange(index, "valueSecond", e.target.value)}
            >
              <option value="" disabled>
                -- Select an option --
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
        ))}
      </div>
      <br />
      <div>
        <table border="1">
          <thead>
            <tr>
              <th>이름</th>
              <th>품질</th>
              <th>1 옵션 이름</th>
              <th>1 옵션 성능</th>
              <th>가격</th>
            </tr>
          </thead>
          <tbody>
            {responseData ? (
              // 'responseData'와 'responseData.Items'가 존재하는 경우, 테이블을 출력
              responseData.map((Item, index) => (
                <tr key={index}>
                  <td>{Item?.name || "X"}</td>
                  <td>{Item?.gradeQuality || "X"}</td>
                  <td>
                    {Item?.options[1]?.optionName || "X"} <br />
                    {Item?.options[2]?.optionName || "값없음"} <br />
                    {Item?.options[3]?.optionName || "값없음"}
                  </td>
                  <td>
                    {Item?.options[1]?.value || "X"} <br />
                    {Item?.options[2]?.value || "값없음"} <br />
                    {Item?.options[3]?.value || "값없음"}
                  </td>
                  <td>{Item?.auctionInfo.buyPrice || "X"}</td>
                </tr>
              ))
            ) : (
              // 'responseData'나 'responseData.Items'가 없으면 빈 테이블 표시
              <tr>
                <td colSpan="9">데이터가 없습니다</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <button onClick={result}>버튼</button>
      <h3> 토탈 : {total}</h3> <button onClick={getTotal}>토탈버튼</button>
      <pre>{JSON.stringify(responseData, null, 2)}</pre>
    </div>
  );
}

export default TestThree;
