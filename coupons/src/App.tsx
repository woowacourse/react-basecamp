/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react';

export type State = { counter: number };

let state: State = {
  counter: 0,
};

export function get(): State {
  return state;
}

type Initializer<T> = T extends any ? T | ((prev: T) => T) : never;

export function set<T>(nextState: Initializer<T>) {
  state = typeof nextState === 'function' ? nextState(state) : nextState;
}

function Counter1() {
  const state = get();

  const [count, setCount] = useState(state);

  function handleClick() {
    set((prev: State) => {
      const newState = { counter: prev.counter + 1 };

      setCount(newState);

      return newState;
    });
  }

  return (
    <>
      <h3>{count.counter}</h3>
      <button onClick={handleClick}>+</button>
    </>
  );
}

function Counter2() {
  const state = get();

  const [count, setCount] = useState(state);

  function handleClick() {
    set((prev: State) => {
      const newState = { counter: prev.counter + 1 };

      setCount(newState);

      return newState;
    });
  }

  return (
    <>
      <h3>{count.counter}</h3>
      <button onClick={handleClick}>+</button>
    </>
  );
}

function App() {
  return (
    <>
      <Counter1 />
      <Counter2 />
    </>
  );
}

export default App;
