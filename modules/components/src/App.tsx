import React from "react";
import { Button } from "seongjinme-component-test";
import "./App.css";

function App() {
  const handleClick = () => {
    alert("버튼이 클릭되었습니다");
  };

  return (
    <div>
      <h1>버튼 컴포넌트 예시</h1>
      <Button label="Click me" onClick={handleClick} />
    </div>
  );
}

export default App;
