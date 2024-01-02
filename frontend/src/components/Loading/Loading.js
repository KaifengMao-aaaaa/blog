// Spinner.js
import React from 'react';
import './loading.css';

const Loading = () => (
  <div className="spinner-overlay">
    <div>
      <div className="spinner"></div>
      <p className="loading-text">Loading...</p>
    </div>
  </div>
);

export default Loading;
