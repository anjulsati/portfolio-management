import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Global base styles
import './styles/global.css';

// Your portfolio styles (from HTML/CSS version)
import './styles/portfolio.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
