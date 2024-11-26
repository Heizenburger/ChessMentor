import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChessMentorHome from './ChessMentorHome';
import PuzzlePage from './PuzzlePage';
import PlayWithComputer from './PlayWithComputer';
import Learn from './Learn';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChessMentorHome />} />
        <Route path="/puzzle" element={<PuzzlePage />} />
        <Route path="/computer" element={<PlayWithComputer />} />
        <Route path="/learn" element={<Learn />} />
      </Routes>
    </Router>
  );
}

export default App;