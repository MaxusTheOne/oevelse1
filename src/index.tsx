import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import GuessInput from './GuessInput';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <GuessInput/>
  </React.StrictMode>
);


