import React from 'react';
import './OverUnderButtons.css';

const OverUnderButtons = () => {
  const handleClick = (choice) => {
    console.log(choice);
    // You can later integrate the backend call here
  };

  return (
    <div className="buttons">
      <button onClick={() => handleClick('Over')}>Over</button>
      <button onClick={() => handleClick('Under')}>Under</button>
    </div>
  );
};

export default OverUnderButtons;
