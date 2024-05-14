import './App.css';

import React from 'react';
import { useInput } from 'ninja-boy-rantaro';

function App() {
  const { value, onChange } = useInput('');

  return (
    <>
      <h1>Hooks Modules</h1>

      <h1>Component Modules</h1>
      <h1>useInput Example</h1>
      <p>{value}</p>
      <input type='text' value={value} onChange={onChange} />
    </>
  );
}

export default App;
