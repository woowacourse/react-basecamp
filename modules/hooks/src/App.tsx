import React from 'react';
import './App.css';
import { useInput } from 'hailey-useinput';

function App() {
  const { value, onChange } = useInput('');

  return (
    <>
      <h1>Hooks Modules</h1>
      <input type="text" value={value} onChange={onChange} />
      <p>Input value: {value}</p>
    </>
  );
}

export default App;
