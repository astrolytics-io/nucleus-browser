import Nucleus from 'nucleus-browser';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

const APP_ID = '64b831f52e614c4ac76b4684';

Nucleus.init(APP_ID, {
  debug: true,
  endpoint: 'ws://localhost:3002',
  reportInterval: 4 * 1000,
  sessionTimeout: 1000 * 10,
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
