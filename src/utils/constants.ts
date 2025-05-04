// Board dimensions
export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;
export const CELL_SIZE = 30; // Size in pixels

// Game speeds (in milliseconds)
export const SPEEDS = [
  800,  // Level 0
  717,  // Level 1
  633,  // Level 2
  550,  // Level 3
  467,  // Level 4
  383,  // Level 5
  300,  // Level 6
  217,  // Level 7
  133,  // Level 8
  100,  // Level 9
  83,   // Level 10
  83,   // Level 11
  83,   // Level 12
  67,   // Level 13
  67,   // Level 14
  67,   // Level 15
  50,   // Level 16
  50,   // Level 17
  33,   // Level 18
  33    // Level 19
];

// Scoring system (NES Tetris inspired)
export const POINTS = {
  SINGLE: 100,
  DOUBLE: 300,
  TRIPLE: 500,
  TETRIS: 800,
  SOFT_DROP: 1,
  HARD_DROP: 2,
};

// Level up requires clearing 10 lines
export const LINES_PER_LEVEL = 10;

// Colors for different tetrominos
export const COLORS = {
  I: '#00f0f0', // Cyan
  J: '#0000f0', // Blue
  L: '#f0a000', // Orange
  O: '#f0f000', // Yellow
  S: '#00f000', // Green
  T: '#a000f0', // Purple
  Z: '#f00000', // Red
};