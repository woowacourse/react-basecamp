import { RecoilRoot } from "recoil";
import React from "react";

import ReactDOM from "react-dom/client";

import App from "./App.tsx";

import "./index.css";

// 그래서 Recoil을 사용하는 애플리케이션의 최상위에 위치해야 합니다.

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>
);
