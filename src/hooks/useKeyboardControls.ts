import { useEffect, useCallback } from 'react';
import { Direction } from '../types';

interface KeyboardHandlers {
  movePiece: (direction: Direction) => void;
  hardDrop: () => void;
  rotatePiece: (direction: 'clockwise' | 'counterclockwise') => void;
  togglePause: () => void;
  resetGame: () => void;
}

export const useKeyboardControls = ({
  movePiece,
  hardDrop,
  rotatePiece,
  togglePause,
  resetGame,
}: KeyboardHandlers) => {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.code) {
        case 'ArrowLeft':
          movePiece(Direction.LEFT);
          break;
        case 'ArrowRight':
          movePiece(Direction.RIGHT);
          break;
        case 'ArrowDown':
          movePiece(Direction.DOWN);
          break;
        case 'ArrowUp':
        case 'KeyX':
          rotatePiece('clockwise');
          break;
        case 'KeyZ':
          rotatePiece('counterclockwise');
          break;
        case 'Space':
          hardDrop();
          break;
        case 'KeyP':
          togglePause();
          break;
        case 'KeyR':
          resetGame();
          break;
        default:
          break;
      }
    },
    [movePiece, hardDrop, rotatePiece, togglePause, resetGame]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
};