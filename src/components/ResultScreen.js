import React from 'react';
import './ResultScreen.css'; // Import the CSS for styling

const ResultScreen = () => {
  return (
    <div className="result-screen-container">
      <div className="header">
        <img className="profile-pic" src="/path-to-your-image" alt="Profile" />
        <span className="username">KittyKat1400</span>
      </div>

      <div className="score-box">
        <h1>I got</h1>
        <h2>73%</h2>
      </div>

      <div className="comment-box">
        <p>idk maybe I should do more and know integrals</p>
      </div>

      <div className="emoji-reactions">
        <div className="emoji-item">
          <span role="img" aria-label="thinking-face">🤔</span>
          <span className="count">0</span>
        </div>
        <div className="emoji-item">
          <span role="img" aria-label="apple">🍎</span>
          <span className="count">0</span>
        </div>
        <div className="emoji-item">
          <span role="img" aria-label="bart-simpson">🛹</span>
          <span className="count">1</span>
        </div>
        <div className="emoji-item">
          <span role="img" aria-label="pepe">📚</span>
          <span className="count">0</span>
        </div>
      </div>

      <div className="navigation-buttons">
        <button className="nav-btn left-btn">←</button>
        <button className="nav-btn right-btn">→</button>
      </div>
    </div>
  );
};

export default ResultScreen;
