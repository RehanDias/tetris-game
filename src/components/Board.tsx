import React from 'react';
import Cell from './Cell';
import { BOARD_WIDTH, BOARD_HEIGHT, CELL_SIZE } from '../utils/constants';
import { GameState } from '../types';

interface BoardProps {
  gameState: GameState;
}

const Board: React.FC<BoardProps> = ({ gameState }) => {
  const { board, activePiece } = gameState;
  
  const mergedBoard = board.map(row => [...row]);
  
  if (activePiece) {
    const { shape, position } = activePiece;
    
    for (let row = 0; row < shape.length; row++) {
      for (let col = 0; col < shape[row].length; col++) {
        const color = shape[row][col];
        if (color) {
          const boardRow = position.row + row;
          const boardCol = position.col + col;
          
          if (
            boardRow >= 0 &&
            boardRow < BOARD_HEIGHT &&
            boardCol >= 0 &&
            boardCol < BOARD_WIDTH
          ) {
            mergedBoard[boardRow][boardCol] = color;
          }
        }
      }
    }
  }
  
  return (
    <div className="relative p-2 bg-gray-900/80 rounded-lg retro-border">
      <div
        className="grid gap-[1px] bg-gray-800/50"
        style={{
          gridTemplateRows: `repeat(${BOARD_HEIGHT}, ${CELL_SIZE}px)`,
          gridTemplateColumns: `repeat(${BOARD_WIDTH}, ${CELL_SIZE}px)`,
        }}
      >
        {mergedBoard.flat().map((cell, index) => (
          <Cell key={index} cell={cell} />
        ))}
      </div>
    </div>
  );
};

export default React.memo(Board);