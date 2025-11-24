'use client';
import { useState } from 'react';

export default function BlockGrid() {
  const empty = Array(9).fill('');
  const [grid, setGrid] = useState<string[]>(empty);
  const [turn, setTurn] = useState<number>(0); // 0: blue, 1: red
  const [message, setMessage] = useState<string>('');

  const handleClick = (index: number) => {
    if (grid[index]) return;
    const newGrid = [...grid];
    const symbol = turn === 0 ? '🟦' : '❌';
    newGrid[index] = symbol;
    setGrid(newGrid);

    if (checkWin(newGrid, symbol)) {
      setMessage(symbol === '🟦' ? 'Blue wins!' : 'Red wins!');
    } else {
      setTurn(1 - turn);
    }
  };

  const checkWin = (g: string[], symbol: string) => {
    const lines = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];
    return lines.some(line => line.every(i => g[i] === symbol));
  };

  const reset = () => {
    setGrid(empty);
    setTurn(0);
    setMessage('');
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="grid grid-cols-3 gap-2">
        {grid.map((cell, idx) => (
          <button
            key={idx}
            className="w-12 h-12 border border-gray-300 text-2xl flex items-center justify-center"
            onClick={() => handleClick(idx)}
          >
            {cell}
          </button>
        ))}
      </div>
      {message && <span className="text-xl font-semibold">{message}</span>}
      <button
        className="mt-2 px-4 py-1 border rounded"
        onClick={reset}
      >
        Reset
      </button>
    </div>
  );
}
