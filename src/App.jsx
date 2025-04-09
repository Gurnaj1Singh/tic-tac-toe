import React, { useState } from "react";

const Square = ({ value, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-24 h-24 text-4xl font-bold flex items-center justify-center bg-white rounded-2xl shadow-md hover:shadow-lg transition"
    >
      {value}
    </button>
  );
};

const Board = ({ squares, onClick }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {squares.map((square, i) => (
        <Square key={i} value={square} onClick={() => onClick(i)} />
      ))}
    </div>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
};

const TicTacToe = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(squares);
  const status = winner
    ? `🎉 Winner: ${winner}`
    : squares.every(Boolean)
    ? "It's a Draw!"
    : `Next Player: ${xIsNext ? "X" : "O"}`;

  const handleClick = (i) => {
    if (squares[i] || winner) return;
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 to-blue-300 flex flex-col items-center justify-center p-6">
      <div className="text-3xl md:text-4xl font-semibold mb-6 text-white drop-shadow-lg">
        {status}
      </div>

      <Board squares={squares} onClick={handleClick} />
      <button
        onClick={handleReset}
        className="mt-6 bg-white text-blue-600 px-6 py-2 rounded-xl shadow hover:shadow-lg font-bold text-lg transition"
      >
        Reset Game
      </button>
    </div>
  );
};

export default TicTacToe;
