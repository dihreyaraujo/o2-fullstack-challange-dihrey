import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';
import './styles/variables.css';
import './styles/global.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);