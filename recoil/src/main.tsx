import React from 'react';
import ReactDOM from 'react-dom/client';
<<<<<<< HEAD
import App from './App.tsx';
import './index.css';
import { RecoilRoot } from 'recoil';
=======
import { RecoilRoot } from 'recoil';
import App from './App.tsx';
import './index.css';
>>>>>>> bb7b51d9b22bbb08fa7c3785cfe93ab21e05c80f

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>
);
