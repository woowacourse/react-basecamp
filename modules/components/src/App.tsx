import React from 'react';
import { Button } from 'jiny-button';
import './App.css';

function App() {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <div>
      <h1>Button Component Example</h1>
      <Button label="jiny" onClick={handleClick} />
    </div>
  );
}

export default App;
