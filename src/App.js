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

/**
 * Chess Mentor Project
 * Created by [Aman Adil]
 * © [2024] All Rights Reserved
 * Licensed under MIT License
 */

export default App;
