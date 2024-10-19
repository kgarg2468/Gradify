import React from 'react';

const OverUnderButtons = ({ onCorrectGuess }) => {
  const handleGuess = (guess) => {
    const correctAnswer = 'Under'; // Assuming the correct answer is 'Under'
    
    if (guess === correctAnswer) {
      onCorrectGuess(); // If guess is correct, trigger the callback to show the result screen
    }
  };

  return (
    <div className="buttons">
      <button onClick={() => handleGuess('Over')}>Over</button>
      <button onClick={() => handleGuess('Under')}>Under</button>
    </div>
  );
};

export default OverUnderButtons;
