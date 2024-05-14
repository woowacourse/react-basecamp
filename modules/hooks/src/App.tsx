<<<<<<< HEAD
import React from "react";
import "./App.css";

function App() {
  return (
    <>
      <h1>Hooks Modules</h1>
    </>
  );
=======
import React from 'react';
import { useInput } from 'darr-hooks';

function App() {
	const { value, onChange } = useInput('');

	return (
		<div>
			<h1>useInput Example</h1>
			<input type="text" value={value} onChange={onChange} />
			<p>Input value: {value}</p>
		</div>
	);
>>>>>>> ab2a35c930b5aa341371a697d61ee6315efbabed
}

export default App;
