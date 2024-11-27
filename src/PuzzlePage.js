// PuzzlePage.js
import React, { useState, useEffect } from 'react';
import Chessboard from 'chessboardjsx';
import { Chess } from 'chess.js';

const PuzzlePage = () => {
  const PUZZLES_800_1000 = [
    {
      fen: '6k1/4p2p/1P4p1/2N1b3/1p6/6P1/7P/5K2 b - - 0 31',
      solution: ['g8f8', 'c5d7', 'f8e8', 'd7e5'],
      rating: 881,
      themes: ['crushing endgame fork short']
    },
    {
      fen: 'r3kb1r/1bq3p1/5p2/2R5/1p1nPP2/4B1P1/PP3NB1/5RK1 w kq - 0 25',
      solution: ['c5c7', 'd4e2'],
      rating: 912,
      themes: ['mate mateIn1 middlegame oneMove']
    },
    {
      fen: '2r2rk1/1bp4p/p2p2pq/1p2p2n/1P2Pp2/2PP4/P1Q2PNN/R1B1R2K w - - 2 21',
      solution: ['h2g4', 'h5g3', 'h1g1', 'h6h1'],
      rating: 912,
      themes: ['doubleCheck kingsideAttack mate mateIn2 middlegame short']
    },
    {
      fen: 'rn1q1rk1/pp2b1pp/4Q1b1/2p5/2B5/2P5/P1PP1PPP/R1B1R1K1 b - - 0 12',
      solution: ['g8h8', 'e6e7', 'd8e7', 'e1e7'],
      rating: 912,
      themes: ['advantage opening short']
    },
  ];

  const PUZZLES_1000_2500 = [
    {
      fen: 'r1bqr3/2p3pp/p1kp4/1Pb1n1N1/Q2p4/8/PP3PPP/RNB1R1K1 b - - 0 16',
      solution: ['a6b5', 'a4a8', 'c8b7', 'a8d8'],
      rating: 1456,
      themes: ['advantage hangingPiece middlegame short']
    },
    {
      fen: '55r1k/r6p/p2p4/2p2pQ1/1pP5/1P4R1/1q3PPP/4R1K1 b - - 1 27',
      solution: ['b2f6', 'g5f6', 'f8f6', 'e1e7', 'f6f8', 'e7f8'],
      rating: 1789,
      themes: ['endgame long mate mateIn3']
    },
    {
      fen: 'r3r1k1/1q4pp/p3P3/6n1/Pp4P1/1P6/1PR1QB1P/5RK1 w - - 1 31',
      solution: ['f2g3', 'g5h3'],
      rating: 1789,
      themes: ['mate mateIn1 middlegame oneMove']
    },
  ];

  const [userRating, setUserRating] = useState(null);
  const [currentPuzzle, setCurrentPuzzle] = useState(null);
  const [showSolution, setShowSolution] = useState( false);
  const [chess] = useState(new Chess());
  const [isLoading, setIsLoading] = useState(false);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [initialPosition, setInitialPosition] = useState(null);
  const [isPuzzleSolved, setIsPuzzleSolved] = useState(false);

  // Rating Modal Component
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

  // Fetch Puzzle Function
  const fetchPuzzle = () => {
    setIsLoading(true);
    try {
      let selectedPuzzles = [];
      
      if (userRating >= 800 && userRating < 1000) {
        selectedPuzzles = PUZZLES_800_1000;
      } else if (userRating >= 1000 && userRating <= 2500) {
        selectedPuzzles = PUZZLES_1000_2500;
      } else {
        // Fallback puzzle
        const fallbackPuzzle = {
          fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 1',
          solution: ['Bxf7+', 'Kxf7', 'Ng5+'],
          rating: 1500,
          themes: ['Sacrifice', 'Checkmate']
        };
        setCurrentPuzzle(fallbackPuzzle);
        chess.load(fallbackPuzzle.fen);
        setInitialPosition(fallbackPuzzle.fen);
        setCurrentMoveIndex(0);
        setIsLoading(false);
        return;
      }

      // Select random puzzle
      const randomPuzzle = selectedPuzzles[Math.floor(Math.random() * selectedPuzzles.length)];
      
      // Load puzzle and make first computer move
      chess.load(randomPuzzle.fen);
      setInitialPosition(randomPuzzle.fen);
      setCurrentPuzzle(randomPuzzle);
      setCurrentMoveIndex(0);
      setShowSolution(false);

      // Execute first computer move
      if (randomPuzzle.solution.length > 0) {
        const computerMove = randomPuzzle.solution[0];
        const [fromSquare, toSquare] = computerMove.match(/.{1,2}/g);
        
        chess.move({
          from: fromSquare,
          to: toSquare,
          promotion: 'q'
        });

        // Update board with computer's first move
        setCurrentPuzzle(prev => ({
          ...prev,
          fen: chess.fen()
        }));

        // Move index to 1 after computer's first move
        setCurrentMoveIndex(1);
      }
    } catch (error) {
      console.error('Error selecting puzzle:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Player's Move
  const onDrop = ({ sourceSquare, targetSquare }) => {
    try {
      if (!currentPuzzle || currentMoveIndex >= currentPuzzle.solution.length) {
        return false;
      }

      const expectedMove = currentPuzzle.solution[currentMoveIndex];
      const move = chess.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q'
      });

      const userMoveNotation = `${sourceSquare}${targetSquare}`;

      if (!move || userMoveNotation !== expectedMove) {
        chess.load(initialPosition);
        setCurrentPuzzle(prev => ({
          ...prev,
          fen: initialPosition
        }));
        setCurrentMoveIndex(0);
        return false;
      }

      setCurrentPuzzle(prev => ({
        ...prev,
        fen: chess.fen()
      }));

      const nextMoveIndex = currentMoveIndex + 1;
      setCurrentMoveIndex(nextMoveIndex);

      if (nextMoveIndex >= currentPuzzle.solution.length) {
        setIsPuzzleSolved(true);
        setTimeout(() => {
          setIsPuzzleSolved(false);
          fetchPuzzle();
        }, 2000);
        return true;
      }

      const computerMove = currentPuzzle.solution[nextMoveIndex];
      const fromSquare = computerMove.slice(0, 2);
      const toSquare = computerMove.slice(2, 4);

      chess.move({
        from: fromSquare,
        to: toSquare,
        promotion: 'q'
      });

      setCurrentPuzzle(prev => ({
        ...prev,
        fen: chess.fen()
      }));

      setCurrentMoveIndex(prev => prev + 1);

      return true;

    } catch (error) {
      console.error('Move error:', error);
      chess.load(initialPosition);
      setCurrentPuzzle(prev => ({
        ...prev,
        fen: initialPosition
      }));
      setCurrentMoveIndex(0);
      return false;
    }
  };

  useEffect(() => {
    if (!userRating) {
      // Render RatingModal
    } else {
      fetchPuzzle(); // Fetch puzzle when user rating is set
    }
  }, [userRating]);

  return (
    <div className="container mx-auto p-4">
      {!userRating && <RatingModal />}
      
      {userRating && (
        <>
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
                {isLoading ? 'Loading...' : ' Next Puzzle'}
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
              {isPuzzleSolved && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="bg-white p-8 rounded-lg shadow-xl">
                    <h2 className="text-2xl mb-4">Puzzle Solved!</h2>
                    <p>Loading next puzzle...</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PuzzlePage;