export type Cell = null | string; // null = empty, string = color

export interface Position {
  row: number;
  col: number;
}

export interface Tetromino {
  shape: Cell[][];
  color: string;
  position: Position;
}

export interface GameState {
  board: Cell[][];
  activePiece: Tetromino | null;
  nextPiece: Tetromino | null;
  gameOver: boolean;
  score: number;
  level: number;
  lines: number;
  isPaused: boolean;
}

export interface HighScore {
  name: string;
  score: number;
  level: number;
  date: string;
}

export enum Direction {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  DOWN = 'DOWN',
}

export type RotateDirection = 'clockwise' | 'counterclockwise';

export type GameScreen = 'home' | 'game' | 'highScores';