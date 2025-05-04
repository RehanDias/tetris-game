import { COLORS } from './constants';
import { Cell, Tetromino, Position, RotateDirection } from '../types';

// Tetromino shapes with their standard configurations
const TETROMINOS = {
  I: [
    [0, 'I', 0, 0],
    [0, 'I', 0, 0],
    [0, 'I', 0, 0],
    [0, 'I', 0, 0],
  ],
  J: [
    ['J', 0, 0],
    ['J', 'J', 'J'],
    [0, 0, 0],
  ],
  L: [
    [0, 0, 'L'],
    ['L', 'L', 'L'],
    [0, 0, 0],
  ],
  O: [
    ['O', 'O'],
    ['O', 'O'],
  ],
  S: [
    [0, 'S', 'S'],
    ['S', 'S', 0],
    [0, 0, 0],
  ],
  T: [
    [0, 'T', 0],
    ['T', 'T', 'T'],
    [0, 0, 0],
  ],
  Z: [
    ['Z', 'Z', 0],
    [0, 'Z', 'Z'],
    [0, 0, 0],
  ],
};

type TetrominoType = keyof typeof TETROMINOS;

// Implementation of the 7-bag randomizer system
class TetrominoBag {
  private currentBag: TetrominoType[] = [];
  private nextBag: TetrominoType[] = [];

  private shuffleArray(array: TetrominoType[]): TetrominoType[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  private generateBag(): TetrominoType[] {
    return this.shuffleArray(Object.keys(TETROMINOS) as TetrominoType[]);
  }

  public getNextPiece(): TetrominoType {
    if (this.currentBag.length === 0) {
      this.currentBag = this.nextBag.length ? this.nextBag : this.generateBag();
      this.nextBag = this.generateBag();
    }
    return this.currentBag.pop()!;
  }

  public peekNextPiece(): TetrominoType {
    if (this.currentBag.length === 0) {
      this.currentBag = this.nextBag.length ? this.nextBag : this.generateBag();
      this.nextBag = this.generateBag();
    }
    return this.currentBag[this.currentBag.length - 1];
  }
}

// Create a single instance of TetrominoBag to maintain state
const tetrominoBag = new TetrominoBag();

// Generate a random tetromino
export const randomTetromino = (): Tetromino => {
  const type = tetrominoBag.getNextPiece();
  const shape = TETROMINOS[type].map(row => 
    row.map(cell => (cell ? COLORS[type] : null))
  ) as Cell[][];
  
  // Calculate starting position (centered at top)
  const position: Position = {
    row: 0,
    col: Math.floor((10 - shape[0].length) / 2),
  };

  return {
    shape,
    color: COLORS[type],
    position,
  };
};

// Get the next piece without removing it from the bag
export const peekNextTetromino = (): Tetromino => {
  const type = tetrominoBag.peekNextPiece();
  const shape = TETROMINOS[type].map(row => 
    row.map(cell => (cell ? COLORS[type] : null))
  ) as Cell[][];
  
  const position: Position = {
    row: 0,
    col: Math.floor((10 - shape[0].length) / 2),
  };

  return {
    shape,
    color: COLORS[type],
    position,
  };
};

// Rotate a tetromino
export const rotateTetromino = (
  tetromino: Tetromino,
  direction: RotateDirection
): Tetromino => {
  const newTetromino = {
    ...tetromino,
    shape: tetromino.shape.map(row => [...row]),
  };

  const { shape } = newTetromino;
  const n = shape.length;
  
  const rotated: Cell[][] = Array(n)
    .fill(null)
    .map(() => Array(n).fill(null));

  if (direction === 'clockwise') {
    for (let row = 0; row < n; row++) {
      for (let col = 0; col < n; col++) {
        rotated[col][n - 1 - row] = shape[row][col];
      }
    }
  } else {
    for (let row = 0; row < n; row++) {
      for (let col = 0; col < n; col++) {
        rotated[n - 1 - col][row] = shape[row][col];
      }
    }
  }

  newTetromino.shape = rotated;
  return newTetromino;
};