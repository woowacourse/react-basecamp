import React from 'react';
import './App.css';
import { Button } from 'compoents-hailey';

function App() {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <>
      <h1>Component Modules</h1>
      <Button label="Click me published" onClick={handleClick} />
    </>
  );
}

export default App;
