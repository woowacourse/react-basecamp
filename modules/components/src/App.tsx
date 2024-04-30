import React from 'react';
import './App.css';
import { Button } from 'pakxe-button';

function App() {
  const handleClick = () => {
    alert('빡버!');
  };

  return (
    <>
      <h1>Component Modules</h1>
      <Button label='빡세버튼' onClick={handleClick} />
    </>
  );
}

export default App;
