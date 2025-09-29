import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Router from "./Router";
import reportWebVitals from "./reportWebVitals";
import GlobalStyle from "./GlobalStyles";

import { Provider, useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import store from "./store/store";

const DarkModeWrapper = ({ children }) => {
  const darkMode = useSelector((state) => state.settings.darkMode);
  const theme = { darkMode };

  return (
    <ThemeProvider theme={theme}>
      <div className={darkMode ? "dark" : ""}>
        <GlobalStyle />
        {children}
      </div>
    </ThemeProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <>
    <Provider store={store}>
      <DarkModeWrapper>
        <Router />
      </DarkModeWrapper>
    </Provider>
  </>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
