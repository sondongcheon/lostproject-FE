/* eslint-disable */

import React, { useState } from "react";
import logo from './logo.svg';
import './App.css';

function App() {

  let post = '강남 고기 맛집';
  let [a, b] = useState('남자 코트 추천');
  let [good, goods] = useState(0);


  return (
    <div className="App">
      <div className="list">
        <h3> {post} </h3>
        <p> 2월 17일 발행 </p>
        <span onClick={ () => { goods(good + 1) } }> 버튼 </span> {good}
        <hr></hr>
      </div>
    </div>
  );
}

export default App;
