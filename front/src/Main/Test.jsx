import React, { useState } from "react";
import axios from "axios";

function Test(props) {
  const [a, b] = useState(null);

  // 상태 관리: 입력값을 저장

  const [ItemGradeQuality, setItemGradeQuality] = useState("");
  const [ItemUpgradeLevel, setItemUpgradeLevel] = useState("");
  const [ItemTradeAllowCount, setItemTradeAllowCount] = useState("");
  const [CategoryCode, setCategoryCode] = useState("");
  const [ItemGrade, setItemGrade] = useState("");
  const [ItemOption, setItemOption] = useState("");
  const [MinValue, setMinValue] = useState("");
  const [MaxValue, setMaxValue] = useState("");

  var searchOptionReq = {
    ItemLevelMin: 0,
    ItemLevelMax: 0,
    ItemGradeQuality: 50,
    ItemUpgradeLevel: null,
    ItemTradeAllowCount: null,
    EtcOptions: [
      {
        FirstOption: 7,
        SecondOption: null,
        MinValue: null,
        MaxValue: null,
      },
    ],
    Sort: "BUY_PRICE",
    CategoryCode: null,
    CharacterClass: null,
    ItemTier: 4,
    ItemGrade: null,
    ItemName: null,
    PageNo: 0,
    SortCondition: "ASC",
  };
  const result = () => {
    searchOptionReq.ItemGradeQuality = ItemGradeQuality;
    searchOptionReq.ItemUpgradeLevel = ItemUpgradeLevel;
    searchOptionReq.ItemTradeAllowCount = ItemTradeAllowCount;
    searchOptionReq.CategoryCode = CategoryCode;
    searchOptionReq.ItemGrade = ItemGrade;
    searchOptionReq.EtcOptions[0].SecondOption = ItemOption;
    searchOptionReq.EtcOptions[0].MinValue = MinValue;
    searchOptionReq.EtcOptions[0].MaxValue = MaxValue;

    console.log(searchOptionReq);

    const response = axios
      .post(`${process.env.REACT_APP_TEST_URL}/action/test`, searchOptionReq)
      .then((res) => {
        console.log(res);
        b(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleQuality = (q) => setItemGradeQuality(q.target.value);
  const handleUpgradeLevel = (q) => setItemUpgradeLevel(q.target.value);
  const handleTradeAllowCount = (q) => setItemTradeAllowCount(q.target.value);
  const handleCategoryCode = (q) => setCategoryCode(q.target.value);
  const handleItemGrade = (q) => setItemGrade(q.target.value);
  const handleItemOption = (q) => setItemOption(q.target.value);
  const handleMinValue = (q) => setMinValue(q.target.value);
  const handleMaxValue = (q) => setMaxValue(q.target.value);

  return (
    <div>
      <div>test</div>
      <label>품질</label>
      <input placeholder="품질" onChange={handleQuality} /> <br />
      <label>연마 단계</label>
      <select value={ItemUpgradeLevel} onChange={handleUpgradeLevel}>
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
      <select value={ItemTradeAllowCount} onChange={handleTradeAllowCount}>
        <option value="" disabled>
          -- Select an option --
        </option>
        <option value="0">구매시 거래 불가</option>
        <option value="1">구매시 거래 거래 1회 가능</option>
        <option value="2">구매시 거래 거래 2회 가능</option>
      </select>
      <br />
      <label>악세서리 종류</label>
      <select value={CategoryCode} onChange={handleCategoryCode}>
        <option value="" disabled>
          -- Select an option --
        </option>
        <option value="200000">장신구 - 전체</option>
        <option value="200010">장신구 - 목걸이</option>
        <option value="200020">장신구 - 귀걸이</option>
        <option value="200030">장신구 - 반지</option>
      </select>
      <br />
      <label>등급</label>
      <select value={ItemGrade} onChange={handleItemGrade}>
        <option value="" disabled>
          -- Select an option --
        </option>
        <option value="유물">유물</option>
        <option value="고대">고대</option>
      </select>
      <br />
      <label>연마 효과</label>
      <select value={ItemOption} onChange={handleItemOption}>
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
      <label>연마 효과 수치 Min</label>
      <select value={MinValue} onChange={handleMinValue}>
        <option value="" disabled>
          -- Select an option --
        </option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
      <br />
      <label>연마 효과 수치 Max</label>
      <select value={MaxValue} onChange={handleMaxValue}>
        <option value="" disabled>
          -- Select an option --
        </option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
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
            {a ? (
              // 'a'와 'a.Items'가 존재하는 경우, 테이블을 출력
              a.Items.map((Item, index) => (
                <tr key={index}>
                  <td>{Item.Name}</td>
                  <td>{Item.GradeQuality}</td>
                  <td>
                    {Item.Options[1].OptionName} <br />
                    {Item.Options[2]?.OptionName || "값없음"} <br />
                    {Item.Options[3]?.OptionName || "값없음"}
                  </td>
                  <td>
                    {Item.Options[1].Value} <br />
                    {Item.Options[2]?.Value || "값없음"} <br />
                    {Item.Options[3]?.Value || "값없음"}
                  </td>
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
