import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({gridSize, xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares, gridSize) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares, gridSize);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }
  const rows = Array(gridSize)
  .fill(null)
  .map((_, row) => (
    <div className="board-row" key={row}>
      {Array(gridSize)
        .fill(null)
        .map((_, col) => {
          const index = row * gridSize + col;
          return (
            <Square
              key={index}
              value={squares[index]}
              onSquareClick={() => handleClick(index)}
            />
          );
        })}
    </div>
  ));
  return (
    <>
      <div className="status">{status}</div>
      {rows}
    </>
  );
}

export default function Game() {
  const [gridSize, setGridSize] = useState(3); // Default to 3x3
  const [history, setHistory] = useState([Array(3 * 3).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function handleGridSizeChange(e) {
    const newSize = Number(e.target.value);
    setGridSize(newSize);
    setHistory([Array(newSize * newSize).fill(null)]);
    setCurrentMove(0);
}


  const moves = history.map((squares, move) => {
    const description = move
      ? "Go to move #" + move
      : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board
          gridSize={gridSize}
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
        />
      </div>
      <div className="game-info">
        <label>
          Grid Size:
          <input
            type="number"
            min="3"
            max="10"
            value={gridSize}
            onChange={handleGridSizeChange}
          />
        </label>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares, gridSize) {
  const lines = [];

  // Generate winning lines for rows
  for (let row = 0; row < gridSize; row++) {
    lines.push(
      Array(gridSize)
        .fill(null)
        .map((_, col) => row * gridSize + col)
    );
  }

  // Generate winning lines for columns
  for (let col = 0; col < gridSize; col++) {
    lines.push(
      Array(gridSize)
        .fill(null)
        .map((_, row) => row * gridSize + col)
    );
  }

  // Generate winning lines for diagonals
  lines.push(
    Array(gridSize)
      .fill(null)
      .map((_, i) => i * gridSize + i)
  );
  lines.push(
    Array(gridSize)
      .fill(null)
      .map((_, i) => i * gridSize + (gridSize - i - 1))
  );

  // Check for a winner
  for (const line of lines) {
    const [first, ...rest] = line;
    if (
      squares[first] &&
      rest.every((index) => squares[index] === squares[first])
    ) {
      return squares[first];
    }
  }
  return null;
}