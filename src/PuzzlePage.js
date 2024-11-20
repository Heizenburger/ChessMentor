import React, { useState, useEffect } from 'react';
import Chessboard from 'chessboardjsx';
import { Chess } from 'chess.js';

const PuzzlePage = () => {
  // Hardcoded Puzzles with realistic chess positions
  const PUZZLES_800_1000 = [
    {
      fen: '3r1rk1/pp3pp1/2p5/4p3/4q3/6Q1/PPP2PPP/4R1K1 w - - 0 22',
      solution: ['Bxf7+', 'Kxf7', 'Ng5+'],
      rating: 900,
      themes: ['Sacrifice', 'Checkmate']
    },
    {
      fen: '4r3/p2r1pk1/1p3p1p/2p1n3/2P2P2/1P3NP1/PB3P1P/3R2K1 w - - 0 1',
      solution: ['Rxd7', 'Rxd7', 'Ng5'],
      rating: 850,
      themes: ['Tactical', 'Piece Coordination']
    },
    {
      fen: '3r2k1/pp3ppp/2p2n2/2b5/2B5/P1P2N2/1P3PPP/3R2K1 w - - 0 1',
      solution: ['Bxf7+', 'Kh8', 'Ng5'],
      rating: 950,
      themes: ['Attack', 'Sacrifice']
    },
    {
      fen: 'r4rk1/1pp1qppp/p1np1n2/2b1p1B1/2B1P1b1/P1NP1N2/1PP1QPPP/R4RK1 w - - 0 1',
      solution: ['Bxf6', 'gxf6', 'Qxg4'],
      rating: 880,
      themes: ['Tactical', 'Exchange']
    },
    {
      fen: '3r2k1/1p3ppp/p3p3/8/P2n4/5N2/1P3PPP/3R2K1 w - - 0 1',
      solution: ['Rxd4', 'Nxd4', 'Kg2'],
      rating: 920,
      themes: ['Material Gain', 'Tactical']
    }
  ];

  const PUZZLES_1000_2500 = [
    {
      fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 1',
      solution: ['Bxf7+', 'Kxf7', 'Ng5+'],
      rating: 1200,
      themes: ['Sacrifice', 'Checkmate']
    },
    {
      fen: '2kr3r/pppn1ppp/2n5/8/Q7/2P2N2/P3PPPP/R3K2R w KQ - 0 1',
      solution: ['Nxe5', 'dxe5', 'Qxd7+'],
      rating: 1500,
      themes: ['Tactical', 'Piece Coordination']
    },
    {
      fen: '4r1k1/p4ppp/1p2p3/3n4/3P4/2N2P2/PPQ3PP/R3R1K1 w - - 0 1',
      solution: ['Qxd5', 'exd5', 'Nf4'],
      rating: 1800,
      themes: ['Attack', 'Positional']
    },
    {
      fen: 'r1b1k2r/ppppnppp/2n2q2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 1',
      solution: ['Bxf7+', 'Kxf7', 'Ng5+'],
      rating: 2000,
      themes: ['Sacrifice', 'Combination']
    },
    {
      fen: '3r2k1/1p3ppp/p3p3/8/P2n4/5N2/1P3PPP/3R2K1 w - - 0 1',
      solution: ['Rxd4', 'Nxd4', 'Kg2'],
      rating: 2200,
      themes: ['Tactical', 'Material Advantage']
    }
  ];

  const [userRating, setUserRating] = useState(null);
  const [currentPuzzle, setCurrentPuzzle] = useState(null);
  const [showSolution, setShowSolution] = useState(false);
  const [chess] = useState(new Chess());
  const [isLoading, setIsLoading] = useState(false);

  // Modal for rating input
  const RatingModal = () => {
    const [inputRating, setInputRating] = useState('');

    const handleSubmit = () => {
      const rating = parseInt(inputRating);
      if (rating >= 800 && rating <= 2500) {
        setUserRating(rating);
      } else {
        alert('Please enter a valid chess rating between 800 and 2500');
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-xl">
          <h2 className="text-2xl mb-4">Enter Your Chess Rating</h2>
          <input 
            type="number" 
            value={inputRating}
            onChange={(e) => setInputRating(e.target.value)}
            className="border p-2 w-full mb-4"
            placeholder="Your Chess Rating"
          />
          <button 
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    );
  };

  // Modified fetchPuzzle to use hardcoded puzzles
  const fetchPuzzle = () => {
    setIsLoading(true);
    try {
      let selectedPuzzles = [];
      
      if (userRating >= 800 && userRating < 1000) {
        selectedPuzzles = PUZZLES_800_1000;
      } else if (userRating >= 1000 && userRating <= 2500) {
        selectedPuzzles = PUZZLES_1000_2500;
      } else {
        // Fallback to a default puzzle
        const fallbackPuzzle = {
          fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 1',
          solution: ['Bxf7+', 'Kxf7', 'Ng5+'],
          rating: 1500,
          themes: ['Sacrifice', 'Checkmate']
        };
        setCurrentPuzzle(fallbackPuzzle);
        chess.load(fallbackPuzzle.fen);
        setIsLoading(false);
        return;
      }

      // Select a random puzzle from the appropriate set
      const randomPuzzle = selectedPuzzles[Math.floor(Math.random() * selectedPuzzles.length)];
      
      setCurrentPuzzle(randomPuzzle);
      chess.load(randomPuzzle. fen);
      setShowSolution(false);
    } catch (error) {
      console.error('Error selecting puzzle:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle player's move
  const onDrop = ({ sourceSquare, targetSquare }) => {
    try {
      // Try to make the move
      const move = chess.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q' // always promote to queen for simplicity
      });

      // If move is valid, update the board
      if (move) {
        setCurrentPuzzle(prev => ({
          ...prev,
          fen: chess.fen()
        }));
      }
    } catch (error) {
      console.log('Invalid move');
    }
  };

  useEffect(() => {
    if (userRating) {
      fetchPuzzle();
    }
  }, [userRating]);

  if (!userRating) {
    return <RatingModal />;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl">Puzzle Challenge</h1>
        <div>
          <button 
            onClick={() => setShowSolution(true)}
            className="mr-2 bg-yellow-500 text-white px-4 py-2 rounded"
            disabled={isLoading}
          >
            See Solution
          </button>
          <button 
            onClick={fetchPuzzle}
            className="bg-green-500 text-white px-4 py-2 rounded"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Next Puzzle'}
          </button>
        </div>
      </div>

      {currentPuzzle && (
        <div className="flex flex-col items-center">
          <div className="w-full max-w-[600px] mb-4">
            <Chessboard 
              position={currentPuzzle.fen}
              width={600}
              onDrop={onDrop}
              orientation="white"
            />
          </div>
          {showSolution && (
            <div className="p-4 bg-gray-100 rounded max-w-[600px] w-full">
              <h3 className="font-bold">Puzzle Details</h3>
              <p><strong>Rating:</strong> {currentPuzzle.rating}</p>
              <p><strong>Themes:</strong> {currentPuzzle.themes.join(', ')}</p>
              <p><strong>Solution:</strong> {currentPuzzle.solution.join(', ')}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PuzzlePage;