import React, { useState, useRef } from 'react';
import Profile from './components/Profile';
import QuestionCard from './components/QuestionCard';
import OverUnderButtons from './components/OverUnderButtons';
import ResultScreen from './components/ResultScreen'; // Assuming you have this component
import './App.css';

function App() {
  const [showResult, setShowResult] = useState(false); // Track if the result should be shown
  const resultRef = useRef(null); // Ref to scroll to result section

  const handleCorrectGuess = () => {
    setShowResult(true);
    resultRef.current?.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to the result section
  };

  return (
    <div className="app">
      <section id="quiz-content" className="full-page">
        {/* Profile, Question, and Buttons */}
        <Profile
          username="KittyKat1400"
          profilePic="https://placekitten.com/200/200"
        />
        <QuestionCard question="I didn’t really study for that CALC 2 Midterm." />
        <OverUnderButtons onCorrectGuess={handleCorrectGuess} />
      </section>

      {/* Result Section with fade-in effect */}
      <section
        id="result-content"
        ref={resultRef}
        className={`result-section ${showResult ? 'visible' : ''}`}
      >
        {showResult && <ResultScreen />}
      </section>
    </div>
  );
}

export default App;
