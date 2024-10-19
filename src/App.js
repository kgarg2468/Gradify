import React from 'react';
import Profile from './components/Profile';
import QuestionCard from './components/QuestionCard';
import OverUnderButtons from './components/OverUnderButtons';
import './App.css';

function App() {
  return (
    <div className="app">
      <Profile
        username="KittyKat1400"
        profilePic="https://placekitten.com/200/200"
      />
      <QuestionCard question="I didn’t really study for that CALC 2 Midterm." />
      <OverUnderButtons />
    </div>
  );
}

export default App;
