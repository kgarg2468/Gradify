import React from 'react';
import './QuestionCard.css';

const QuestionCard = ({ question }) => {
  return (
    <div className="question-card">
      <p>{question}</p>
      <p className="score-prompt">Over Under 76%</p>
    </div>
  );
};

export default QuestionCard;
