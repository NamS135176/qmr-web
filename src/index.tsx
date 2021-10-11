import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";

import "styles/index.scss";
import "utils/i18n";
import reportWebVitals from "utils/reportWebVitals";
import * as serviceWorkerRegistration from "utils/serviceWorkerRegistration";
import createEmotionCache from "utils/createEmotionCache";
import theme from "utils/theme";
import AppRouter from "router";
import { DateSelectProvider } from "utils/context";
const cache = createEmotionCache();

ReactDOM.render(
  <React.StrictMode>
    <CacheProvider value={cache}>
      <DateSelectProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppRouter />
        </ThemeProvider>
      </DateSelectProvider>
    </CacheProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
