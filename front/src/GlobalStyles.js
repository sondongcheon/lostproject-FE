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

//   body {
//     width: 100%;
//     height: 100%;
//     font-family: "Pretendard";
//   }

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

//   button {
//     background: inherit;
//     border: none;
//     border-radius: 0;
//     padding: 0;
//     cursor: pointer;
//   }

//   a {
//     color: inherit;
//     text-decoration: none;
//     outline: none;
//   }

//   a:visited {
//     text-decoration: none;
//     color: inherit;
//   }

  .optionBox {
    width: 20%;
    border: 1px solid black;
  }

    .boxContainer {
    display: flex;
    justify-content: space-between; /* 박스 간 간격을 균일하게 */
    width: 100%; 
    // border: 1px solid black; 
    box-sizing: border-box; /* 테두리 포함하여 크기 계산 */
  }
`;

export default GlobalStyles;