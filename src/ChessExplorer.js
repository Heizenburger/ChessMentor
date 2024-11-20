import React, { useState, useEffect } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';

const ChessExplorer = () => {
  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState(game.fen());
  const [history, setHistory] = useState([]);
  const [currentMove, setCurrentMove] = useState(-1);
  const [highlightSquares, setHighlightSquares] = useState({});

  useEffect(() => {
    setHistory(game.history({ verbose: true }));
  }, [game]);

  const handleMove = (sourceSquare, targetSquare) => {
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q' // always promote to queen for simplicity
    });

    if (move === null) return false; // illegal move

    setFen(game.fen());
    setCurrentMove(history.length);
    return true;
  };

  const navigateMove = (direction) => {
    const newMove = currentMove + direction;
    if (newMove >= -1 && newMove < history.length) {
      const newGame = new Chess();
      for (let i = 0; i <= newMove; i++) {
        newGame.move(history[i]);
      }
      setGame(newGame);
      setFen(newGame.fen());
      setCurrentMove(newMove);
    }
  };

  const onPieceDragBegin = (piece, sourceSquare) => {
    const moves = game.moves({ square: sourceSquare, verbose: true });
    const newHighlightSquares = {};
    moves.forEach(move => {
      newHighlightSquares[move.to] = { background: 'rgba(255, 255, 0, 0.4)' };
    });
    setHighlightSquares(newHighlightSquares);
  };

  const onPieceDragEnd = () => {
    setHighlightSquares({});
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Chess Explorer</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="w-[480px] h-[480px] mb-4">
            <Chessboard 
              position={fen} 
              onPieceDrop={handleMove}
              onPieceDragBegin={onPieceDragBegin}
              onPieceDragEnd={onPieceDragEnd}
              customSquareStyles={highlightSquares}
            />
          </div>
        </div>
        <div>
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Move History</h2>
            <div className="flex justify-between mb-4">
              <button 
                onClick={() => navigateMove(-1)} 
                disabled={currentMove < 0}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
              >
                Previous
              </button>
              <button 
                onClick={() => navigateMove(1)} 
                disabled={currentMove >= history.length - 1}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
              >
                Next
              </button>
            </div>
            <ul className="list-decimal pl-5">
              {history.map((move, index) => (
                <li key={index} className={index === currentMove ? 'font-bold' : ''}>
                  {move.san}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChessExplorer;