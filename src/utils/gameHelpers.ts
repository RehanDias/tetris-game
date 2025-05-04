import { BOARD_WIDTH, BOARD_HEIGHT, POINTS, LINES_PER_LEVEL } from './constants';
import { Cell, Tetromino, Position, Direction, GameState } from '../types';
import { randomTetromino, rotateTetromino } from './tetrominos';

// Create an empty game board
export const createEmptyBoard = (): Cell[][] => {
  return Array(BOARD_HEIGHT)
    .fill(null)
    .map(() => Array(BOARD_WIDTH).fill(null));
};

// Check if the position is valid (within bounds and not colliding)
export const isValidPosition = (
  board: Cell[][],
  tetromino: Tetromino
): boolean => {
  const { shape, position } = tetromino;
  
  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (shape[row][col]) {
        const boardRow = position.row + row;
        const boardCol = position.col + col;
        
        if (
          boardRow < 0 ||
          boardRow >= BOARD_HEIGHT ||
          boardCol < 0 ||
          boardCol >= BOARD_WIDTH
        ) {
          return false;
        }
        
        if (board[boardRow][boardCol] !== null) {
          return false;
        }
      }
    }
  }
  
  return true;
};

// Check if the game is over (next piece cannot be placed)
export const isGameOver = (board: Cell[][], nextPiece: Tetromino): boolean => {
  return !isValidPosition(board, nextPiece);
};

// Move tetromino in the specified direction
export const moveTetromino = (
  board: Cell[][],
  tetromino: Tetromino,
  direction: Direction
): Tetromino | null => {
  const newPosition: Position = { ...tetromino.position };
  
  switch (direction) {
    case Direction.LEFT:
      newPosition.col -= 1;
      break;
    case Direction.RIGHT:
      newPosition.col += 1;
      break;
    case Direction.DOWN:
      newPosition.row += 1;
      break;
  }
  
  const newTetromino = {
    ...tetromino,
    position: newPosition,
  };
  
  return isValidPosition(board, newTetromino) ? newTetromino : null;
};

// Place the tetromino on the board
export const placeTetromino = (board: Cell[][], tetromino: Tetromino): Cell[][] => {
  const { shape, position, color } = tetromino;
  const newBoard = board.map(row => [...row]);
  
  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (shape[row][col]) {
        const boardRow = position.row + row;
        const boardCol = position.col + col;
        
        if (
          boardRow >= 0 &&
          boardRow < BOARD_HEIGHT &&
          boardCol >= 0 &&
          boardCol < BOARD_WIDTH
        ) {
          newBoard[boardRow][boardCol] = color;
        }
      }
    }
  }
  
  return newBoard;
};

// Check for completed lines and clear them
export const clearLines = (board: Cell[][]): { newBoard: Cell[][], linesCleared: number } => {
  const newBoard = [...board];
  let linesCleared = 0;
  
  for (let row = BOARD_HEIGHT - 1; row >= 0; row--) {
    if (newBoard[row].every(cell => cell !== null)) {
      // Remove the complete line
      newBoard.splice(row, 1);
      // Add an empty line at the top
      newBoard.unshift(Array(BOARD_WIDTH).fill(null));
      linesCleared++;
      // Since we removed a line, we need to check the same row again
      row++;
    }
  }
  
  return { newBoard, linesCleared };
};

// Perform hard drop
export const hardDrop = (board: Cell[][], tetromino: Tetromino): Tetromino => {
  let newTetromino = { ...tetromino };
  let nextPosition;

  while (true) {
    nextPosition = moveTetromino(board, newTetromino, Direction.DOWN);
    if (!nextPosition) break;
    newTetromino = nextPosition;
  }

  return newTetromino;
};

interface GameAction {
  type: 'MOVE' | 'ROTATE' | 'HARD_DROP';
  direction?: Direction | 'clockwise' | 'counterclockwise';
}

// Update game state after a move
export const updateGameState = (
  state: GameState,
  action?: GameAction
): GameState => {
  if (state.gameOver || state.isPaused) {
    return state;
  }

  if (!state.activePiece) {
    return state;
  }

  let newPiece = state.activePiece;
  let shouldLock = false;

  if (action) {
    switch (action.type) {
      case 'MOVE':
        if (action.direction) {
          const movedPiece = moveTetromino(state.board, state.activePiece, action.direction as Direction);
          if (movedPiece) {
            newPiece = movedPiece;
          } else if (action.direction === Direction.DOWN) {
            shouldLock = true;
          }
        }
        break;

      case 'ROTATE':
        if (action.direction) {
          const rotatedPiece = rotateTetromino(state.activePiece, action.direction as 'clockwise' | 'counterclockwise');
          if (isValidPosition(state.board, rotatedPiece)) {
            newPiece = rotatedPiece;
          }
        }
        break;

      case 'HARD_DROP':
        newPiece = hardDrop(state.board, state.activePiece);
        shouldLock = true;
        break;
    }
  }

  if (shouldLock) {
    const newBoard = placeTetromino(state.board, newPiece);
    const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard);
    const newScore = state.score + (action?.type === 'HARD_DROP' ? POINTS.HARD_DROP : POINTS.SOFT_DROP);
    const newLines = state.lines + linesCleared;
    const newLevel = Math.max(state.level, Math.floor(newLines / LINES_PER_LEVEL));
    
    const nextActivePiece = state.nextPiece;
    const newNextPiece = randomTetromino();
    
    const gameOver = nextActivePiece ? isGameOver(clearedBoard, nextActivePiece) : false;
    
    return {
      ...state,
      board: clearedBoard,
      activePiece: gameOver ? null : nextActivePiece,
      nextPiece: gameOver ? null : newNextPiece,
      score: newScore + (linesCleared > 0 ? POINTS[['SINGLE', 'DOUBLE', 'TRIPLE', 'TETRIS'][linesCleared - 1]] * (state.level + 1) : 0),
      lines: newLines,
      level: newLevel,
      gameOver,
    };
  }

  return {
    ...state,
    activePiece: newPiece,
  };
};