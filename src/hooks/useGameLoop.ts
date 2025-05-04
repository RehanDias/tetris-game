import { useState, useEffect, useCallback, useRef } from 'react';
import { SPEEDS } from '../utils/constants';
import { randomTetromino } from '../utils/tetrominos';
import { createEmptyBoard, updateGameState } from '../utils/gameHelpers';
import { GameState, Direction, RotateDirection } from '../types';

const createInitialState = (startLevel: number): GameState => ({
  board: createEmptyBoard(),
  activePiece: null,
  nextPiece: null,
  gameOver: false,
  score: 0,
  level: startLevel,
  lines: 0,
  isPaused: false,
});

export const useGameLoop = (startLevel: number = 0) => {
  const [gameState, setGameState] = useState<GameState>(createInitialState(startLevel));
  const intervalRef = useRef<number | null>(null);

  const initGame = useCallback(() => {
    const firstPiece = randomTetromino();
    const secondPiece = randomTetromino();
    
    setGameState({
      ...createInitialState(startLevel),
      activePiece: firstPiece,
      nextPiece: secondPiece,
      level: startLevel,
    });
  }, [startLevel]);

  // Game tick function for automatic piece movement
  const gameTick = useCallback(() => {
    if (!gameState.gameOver && !gameState.isPaused) {
      setGameState(prevState => updateGameState(prevState, { type: 'MOVE', direction: Direction.DOWN }));
    }
  }, [gameState.gameOver, gameState.isPaused]);

  // Set up the game loop with the correct speed
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Get speed based on current level, ensuring it stays within bounds
    const levelIndex = Math.min(gameState.level, SPEEDS.length - 1);
    const speed = SPEEDS[levelIndex];
    
    if (!gameState.gameOver && !gameState.isPaused) {
      intervalRef.current = window.setInterval(gameTick, speed);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [gameState.level, gameState.gameOver, gameState.isPaused, gameTick]);

  // Initialize game
  useEffect(() => {
    initGame();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [initGame]);

  const movePiece = useCallback((direction: Direction) => {
    if (gameState.gameOver || gameState.isPaused || !gameState.activePiece) return;
    
    setGameState(prevState => 
      updateGameState(prevState, { type: 'MOVE', direction })
    );
  }, [gameState.gameOver, gameState.isPaused, gameState.activePiece]);

  const hardDrop = useCallback(() => {
    if (gameState.gameOver || gameState.isPaused || !gameState.activePiece) return;
    
    setGameState(prevState => 
      updateGameState(prevState, { type: 'HARD_DROP' })
    );
  }, [gameState.gameOver, gameState.isPaused, gameState.activePiece]);

  const rotatePiece = useCallback((direction: RotateDirection) => {
    if (gameState.gameOver || gameState.isPaused || !gameState.activePiece) return;
    
    setGameState(prevState => 
      updateGameState(prevState, { type: 'ROTATE', direction })
    );
  }, [gameState.gameOver, gameState.isPaused, gameState.activePiece]);

  const togglePause = useCallback(() => {
    if (gameState.gameOver) return;
    
    setGameState(prevState => ({
      ...prevState,
      isPaused: !prevState.isPaused
    }));
  }, [gameState.gameOver]);

  const resetGame = useCallback(() => {
    initGame();
  }, [initGame]);

  return {
    gameState,
    movePiece,
    hardDrop,
    rotatePiece,
    togglePause,
    resetGame,
  };
};