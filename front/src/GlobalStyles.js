import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

// html,
//   body,
//   div,
//   span,
//   applet,
//   object,
//   iframe,
//   h1,
//   h2,
//   h3,
//   h4,
//   h5,
//   h6,
//   p,
//   blockquote,
//   pre,
//   a,
//   abbr,
//   acronym,
//   address,
//   big,
//   cite,
//   code,
//   del,
//   dfn,
//   em,
//   img,
//   ins,
//   kbd,
//   q,
//   s,
//   samp,
//   small,
//   strike,
//   strong,
//   sub,
//   sup,
//   tt,
//   var,
//   b,
//   u,
//   i,
//   center,
//   dl,
//   dt,
//   dd,
//   ol,
//   ul,
//   li,
//   fieldset,
//   form,
//   label,
//   legend,
//   table,
//   caption,
//   tbody,
//   tfoot,
//   thead,
//   tr,
//   th,
//   td,
//   article,
//   aside,
//   canvas,
//   details,
//   embed,
//   figure,
//   figcaption,
//   footer,
//   header,
//   hgroup,
//   menu,
//   nav,
//   output,
//   ruby,
//   section,
//   summary,
//   time,
//   mark,
//   audio,
//   video {
//     margin: 0;
//     padding: 0;
//     border: 0;
//     font-size: 100%;
//     font: inherit;
//     vertical-align: baseline;
//   }
//   article,
//   aside,
//   details,
//   figcaption,
//   figure,
//   footer,
//   header,
//   hgroup,
//   menu,
//   nav,
//   section {
//     display: block;
//   }

//   html,
//   body {
//     padding: 0;
//     margin: 0;
//   }

//   html {
//     width: 100%;
//     height: 100vh;
//   }

  body {
  background-color: #ECEBDE;
    font-family: "Pretendard";
  }

  .mainbody {
    
    width: 70%;
    margin: 0 auto;
    margin-top: 80px;
  }

//   ol,
//   ul {
//     list-style: none;
//   }

//   blockquote,
//   q {
//     quotes: none;
//   }

//   blockquote:before,
//   blockquote:after,
//   q:before,
//   q:after {
//     content: "";
//     content: none;
//   }

//   table {
//     border-collapse: collapse;
//     border-spacing: 0;
//   }

  // button {
  //   background: inherit;
  //   border: none;
  //   border-radius: 0;
  //   padding: 0;
  //   cursor: pointer;
  // }

//   a {
//     color: inherit;
//     text-decoration: none;
//     outline: none;
//   }

//   a:visited {
//     text-decoration: none;
//     color: inherit;
//   }

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

.normalBtm:hover {
  background-color: #40AC8D; /* 호버 시 배경색을 채움 */
  color: white; /* 호버 시 텍스트 색상 변경 */
  transform: scale(1.1);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.resetBtm {
  background-color: #40AC8D;
  color: white;
  border: 1px solid #40AC8D; /* 배경색을 테두리 색으로 */
  border-radius: 8px; /* 외곽선을 약간 둥글게 */
  padding: 8px 16px; /* 버튼 크기 조절 */
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s; /* 호버 효과를 위한 부드러운 전환 */
}

.resetBtm:hover {
  background-color: white; /* 호버 시 배경색을 채움 */
  color: #40AC8D; /* 호버 시 텍스트 색상 변경 */
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

.color-tomato {
  color: #40AC8D;
}

`;

export default GlobalStyles;