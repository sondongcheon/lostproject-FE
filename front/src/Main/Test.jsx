import React, { useState } from "react";
import axios from "axios";

function Test(props) {
  const [a, b] = useState(null);

  // 상태 관리: 입력값을 저장
  const [inputValue, setInputValue] = useState("");

  const [ItemGradeQuality, setItemGradeQuality] = useState("");

  var searchOptionReq = {
    ItemLevelMin: 0,
    ItemLevelMax: 0,
    ItemGradeQuality: 50,
    ItemUpgradeLevel: null,
    ItemTradeAllowCount: null,
    EtcOptions: [
      {
        FirstOption: 7,
        SecondOption: 45,
        MinValue: 3,
        MaxValue: 3,
      },
    ],
    Sort: "BIDSTART_PRICE",
    CategoryCode: 200000,
    CharacterClass: null,
    ItemTier: 4,
    ItemGrade: "고대",
    ItemName: "귀걸이",
    PageNo: 0,
    SortCondition: "ASC",
  };
  const result = () => {
    searchOptionReq.ItemGradeQuality = ItemGradeQuality;

    const response = axios
      .post(`${process.env.REACT_APP_URL}/action/test`, searchOptionReq)
      .then((res) => {
        console.log(res);
        b(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleQuality = (q) => setItemGradeQuality(q.target.value);

  // 입력값을 상태에 저장하는 함수
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  var test = process.env.REACT_APP_URL;

  return (
    <div>
      <div>test</div>

      <label>품질</label>
      <input
        placeholder="품질"
        // value={petName || ''}
        onChange={handleQuality}
        // required
      />
      <div>
        <table border="1">
          <thead>
            <tr>
              <th>이름</th>
              <th>품질</th>
              <th>1 옵션 이름</th>
              <th>1 옵션 성능</th>
              <th>2 옵션 이름</th>
              <th>2 옵션 성능</th>
              <th>3 옵션 이름</th>
              <th>3 옵션 성능</th>
              <th>가격</th>
            </tr>
          </thead>
          <tbody>
            {a ? (
              // 'a'와 'a.Items'가 존재하는 경우, 테이블을 출력
              a.Items.map((Item, index) => (
                <tr key={index}>
                  <td>{Item.Name}</td>
                  <td>{Item.GradeQuality}</td>
                  <td>{Item.Options[1].OptionName}</td>
                  <td>{Item.Options[1].Value}</td>
                  <td>{Item.Options[2].OptionName}</td>
                  <td>{Item.Options[2].Value}</td>
                  <td>{Item.Options[3]?.OptionName || "값없음"}</td>
                  <td>{Item.Options[3]?.Value || "값없음"} </td>
                  <td>{Item.AuctionInfo.BuyPrice}</td>
                </tr>
              ))
            ) : (
              // 'a'나 'a.Items'가 없으면 빈 테이블 표시
              <tr>
                <td colSpan="9">데이터가 없습니다</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <button onClick={result}>버튼</button>
      <pre>{JSON.stringify(a, null, 2)}</pre>
    </div>
  );
}

export default Test;
