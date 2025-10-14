import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom'; // 1. Import BrowserRouter
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. Wrap your App component with it */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);