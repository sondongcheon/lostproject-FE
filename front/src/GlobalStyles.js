import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
  width: 1900px; /* 고정된 너비 */
  min-height: 100vh; 
  overflow: auto; /* 넘치는 콘텐츠는 스크롤로 처리 */
  background-color:rgb(240, 239, 227);
    font-family: "Pretendard";
  }

  .font-a {
  font-family: "SF_HambakSnow";
  }

  .mainbody {
    
    width: 70%;
      min-height: 100vh; 
    margin: 0 auto;
    margin-top: 110px;
  }
    
  .mainMobileBody {
    // width: 468px; /* 고정된 너비 */
      min-height: 100vh; 
    margin-top: 110px;
    margin-bottom: 110px;
    padding-bottom: 1px; /* 마진 상쇄 방지 */
  }

[type="radio"], span {
  vertical-align: middle;
}

[type="radio"] {
  appearance: none;
  border: max(2px, 0.1em) solid gray;
  border-radius: 50%;
  width: 0.75em;
  height: 0.75em;
  //transition: border 0.25s ease-in-out;/
}

[type="radio"]:checked {
  border: 0.3em solid tomato;
}


[type="radio"]:focus-visible {
  outline-offset: max(2px, 0.1em);
  outline: max(2px, 0.1em) dotted tomato;
}



[type="radio"]:hover {
  box-shadow: 0 0 0 max(2px, 0.1em) lightgray;
  cursor: pointer;
}



[type="radio"]:hover + span {
  cursor: pointer;
}

[type="radio"]:disabled {
  background-color: lightgray;
  box-shadow: none;
  opacity: 0.7;
  cursor: not-allowed;
}

[type="radio"]:disabled + span {
  opacity: 0.7;
  cursor: not-allowed;
}

  .optionBox {
    width: 20%;
    border: 1px solid black;
  }

.normalBtm {
  background-color: transparent;
  border: 1px solid #40AC8D; /* 배경색을 테두리 색으로 */
  border-radius: 8px; /* 외곽선을 약간 둥글게 */
  padding: 8px 16px; /* 버튼 크기 조절 */
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s; /* 호버 효과를 위한 부드러운 전환 */
}

// .presetBtm {
//   transition: background-color 1s, color 1s; /* 호버 효과를 위한 부드러운 전환 */
// }

.presetBtm:hover {
  transform: scale(1.1);
}



.normalBtm:hover {
  background-color: #40AC8D; /* 호버 시 배경색을 채움 */
  color: white; /* 호버 시 텍스트 색상 변경 */
  transform: scale(1.1);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.allBtm {
  height : 50px;
  background-color: white;
  border: 1px solid tomato; /* 배경색을 테두리 색으로 */
  border-radius: 8px; /* 외곽선을 약간 둥글게 */
  padding: 8px 16px; /* 버튼 크기 조절 */
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s; /* 호버 효과를 위한 부드러운 전환 */
}






.allBtm:hover {
  background-color: tomato; /* 호버 시 배경색을 채움 */
  color: white; /* 호버 시 텍스트 색상 변경 */
  transform: scale(1.1);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
  

.resetBtm {
  //background-color: #40AC8D;
  color: black;
  font-style : bold;
  //border: 1px solid #40AC8D; /* 배경색을 테두리 색으로 */
  border-radius: 8px; /* 외곽선을 약간 둥글게 */
  padding: 4px 8px; /* 버튼 크기 조절 */
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s; /* 호버 효과를 위한 부드러운 전환 */
}







.resetBtm:hover {
  background-color: white; /* 호버 시 배경색을 채움 */
  color: rgb(156 163 175); /* 호버 시 텍스트 색상 변경 */
  transform: scale(1.1);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.normalSelBtm {
  background-color: #40AC8D;
  color: white;
  border: 1px solid  #40AC8D; /* 배경색을 테두리 색으로 */
  border-radius: 8px; /* 외곽선을 약간 둥글게 */
  padding: 8px 16px; /* 버튼 크기 조절 */
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s; /* 호버 효과를 위한 부드러운 전환 */
}

.normalSelBtm:hover {
  background-color: white; /* 호버 시 배경색을 채움 */
  color: #40AC8D; /* 호버 시 텍스트 색상 변경 */
}

.mainIconHover:hover {
  cursor: pointer;
  font-style : bold;
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  // border: 2px solid #ddd; /* 테두리 추가 */
  transition: all 0.3s ease; /* 애니메이션 추가 */
}

.commonHover:hover {
  cursor: pointer;
  background-color: white; /* 호버 시 배경색을 채움 */
  transform: scale(1.1);
  // box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  border-radius: 16px; /* 테두리를 둥글게 만듦 */
  border: 2px solid #ddd; /* 테두리 추가 */
  transition: all 0.3s ease; /* 애니메이션 추가 */
}

.resultBoxHover:hover {
  cursor: pointer;
  transform: scale(1.1);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease; /* 애니메이션 추가 */
}

    .boxContainer {
    display: flex;
    justify-content: space-between; /* 박스 간 간격을 균일하게 */
    width: 100%; 
    // border: 1px solid black; 
    box-sizing: border-box; /* 테두리 포함하여 크기 계산 */
  }

/* 기본 스타일 */
.slider {
  -webkit-appearance: none;
  appearance: none;
}


/* 손잡이 색상 */
.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 14px;
  height: 14px;
  background-color: tomato; /* 손잡이 색상 */
  border-radius: 50%;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 14px;
  height: 14px;
  background-color: tomato; /* 손잡이 색상 */
  border-radius: 50%;
  cursor: pointer;
}

.slim-scrollbar {
  scrollbar-width: thin; /* Firefox */
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent; /* Firefox */
}

.slim-scrollbar::-webkit-scrollbar {
  width: 6px;  /* Chrome, Safari */
  height: 6px;
}

.slim-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

.slim-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.color-tomato {
  color: #40AC8D;
}

.size-font-2xl{
  font-size : 28px;
}

.size-font-xl{
  font-size : 26px;
}

.size-font-sm{
  font-size : 24px;
}

.size-font-xs{
  font-size : 20px;
}

.size-font-xxs{
  font-size : 18px;
}

.size-font-xxxs{
  font-size : 16px;
}

.size-font-4xs{
  font-size : 14px;
}

.size-font-5xs{
  font-size : 12px;
}

  @media (max-width: 1024px) {

    .size-font-2xl{
      font-size : 24px;
    }

    .size-font-xl{
      font-size : 22px;
    }

    .size-font-sm{
      font-size : 20px;
    }

    .size-font-xs{
      font-size : 18px;
    }

    .size-font-xxs{
      font-size : 16px;
    }

    .size-font-xxxs{
      font-size : 14px;
    }

    .size-font-4xs{
      font-size : 12px;
    }

    .size-font-5xs{
      font-size : 10px;
    }
}

  @media (max-width: 800px) {

    body {
      width: 100vw; /* 고정된 너비 */
      height: 800px; /* 고정된 높이 */
      background-color: #ECEBDE;
      font-family: "Pretendard";
    }

    .size-font-2xl{
      font-size : 22px;
    }

    .size-font-xl{
      font-size : 20px;
    }

    .size-font-sm{
      font-size : 18px;
    }

    .size-font-xs{
      font-size : 16px;
    }

    .size-font-xxs{
      font-size : 14px;
    }

    .size-font-xxxs{
      font-size : 12px;
    }

    .size-font-4xs{
  font-size : 10px;
}

    .mobile-grid-3 {
    grid-template-columns: repeat(3, 1fr); /* 2열 그리드 */
    }
  }

  @media (max-width: 640px) {

    body {
      width: 100vw; /* 고정된 너비 */
      height: 800px; /* 고정된 높이 */
      background-color: #ECEBDE;
      font-family: "Pretendard";
    }

    .size-font-2xl{
      font-size : 20px;
    }

    .size-font-xl{
      font-size : 18px;
    }

    .size-font-sm{
      font-size : 16px;
    }

    .size-font-xs{
      font-size : 14px;
    }

    .size-font-xxs{
      font-size : 12px;
    }

    .size-font-xxxs{
      font-size : 10px;
    }

    .size-font-4xs{
  font-size : 8px;
}

        .mobile-grid-3 {
    grid-template-columns: repeat(2, 1fr); /* 2열 그리드 */
    }
    .mobile-grid-3 > :last-child {
    grid-column: span 2; /* 마지막 요소 2열 차지 */
    }
  }

  @media (max-width: 468px) { /* 모바일 화면 크기 조건 */
    body {
      width: 100vw; /* 고정된 너비 */
      height: 800px; /* 고정된 높이 */
      background-color: #ECEBDE;
      font-family: "Pretendard";
    }

    [type="radio"] {
      appearance: none;
      border: max(1px, 0.05em) solid gray;
      border-radius: 50%;
      width: 0.5em;
      height: 0.5em;
      //transition: border 0.25s ease-in-out;/
    }


    [type="radio"]:focus-visible {
      outline-offset: max(1px, 0.05em);
      outline: max(1px, 0.05em) dotted tomato;
    }


    [type="radio"]:checked {
      border: 0.15em solid tomato;
    }


    [type="radio"]:hover {
      box-shadow: 0 0 0 max(1px, 0.05em) lightgray;
      cursor: pointer;
    }

    .normalBtm {
      background-color: transparent;
      border: 0.5px solid #40AC8D; /* 배경색을 테두리 색으로 */
      border-radius: 4px; /* 외곽선을 약간 둥글게 */
      padding: 4px 8px; /* 버튼 크기 조절 */
      cursor: pointer;
      transition: background-color 0.3s, color 0.3s; /* 호버 효과를 위한 부드러운 전환 */
    }

    .allBtm {
      height : 25px;
      background-color: white;
      border: 0.5px solid tomato; /* 배경색을 테두리 색으로 */
      border-radius: 4px; /* 외곽선을 약간 둥글게 */
      padding: 4px 8px; /* 버튼 크기 조절 */
      cursor: pointer;
      transition: background-color 0.3s, color 0.3s; /* 호버 효과를 위한 부드러운 전환 */
    }

    .resetBtm {
      width: 5rem; // 160px
      //background-color: #40AC8D;
      color: black;
      font-style : bold;
      //border: 1px solid #40AC8D; /* 배경색을 테두리 색으로 */
      border-radius: 8px; /* 외곽선을 약간 둥글게 */
      padding: 8px 16px; /* 버튼 크기 조절 */
      cursor: pointer;
      transition: background-color 0.3s, color 0.3s; /* 호버 효과를 위한 부드러운 전환 */
    }

    .mobile-grid-3 {
    grid-template-columns: repeat(3, 1fr); /* 2열 그리드 */
    }

    .size-font-xl{
      font-size : 16px;
    }

    .size-font-sm{
      font-size : 14px;
    }

    .size-font-xs{
      font-size : 12px;
    }

    .size-font-xxs{
      font-size : 10px;
    }

    .size-font-xxxs{
      font-size : 8px;
    }

    .size-font-4xs{
  font-size : 6px;
}

  }

  @media (max-width: 400px) {

    .size-font-xl{
      font-size : 14px;
    }
    
    .size-font-sm{
      font-size : 12px;
    }

    .size-font-xs{
      font-size : 10px;
    }

    .size-font-xxs{
      font-size : 7px;
    }

    .size-font-xxxs{
      font-size : 6px;
    }

    .size-font-4xs{
  font-size : 4px;
}

    .mobile-grid-3 {
    grid-template-columns: repeat(2, 1fr); /* 2열 그리드 */
    }
    .mobile-grid-3 > :last-child {
    grid-column: span 2; /* 마지막 요소 2열 차지 */
    }

  }

    @media (max-width: 355px) {

    .size-font-xl{
      font-size : 12px;
    }
    
    .size-font-sm{
      font-size : 10px;
    }

    .size-font-xs{
      font-size : 8px;
    }

    .size-font-xxs{
      font-size : 5px;
    }

    .size-font-xxxs{
      font-size : 3px;
    }

    .size-font-4xs{
  font-size : 2px;
}

  }

`;

export default GlobalStyles;