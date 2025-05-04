import React from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, RotateCcw, Space, Pause, RefreshCcw } from 'lucide-react';
import { Direction } from '../types';

interface ControlsProps {
  movePiece: (direction: Direction) => void;
  hardDrop: () => void;
  rotatePiece: (direction: 'clockwise' | 'counterclockwise') => void;
  togglePause: () => void;
  resetGame: () => void;
  isPaused: boolean;
}

const Controls: React.FC<ControlsProps> = ({
  movePiece,
  hardDrop,
  rotatePiece,
  togglePause,
  resetGame,
  isPaused,
}) => {
  const buttonClass = "bg-gradient-to-b from-purple-600 to-purple-800 p-4 rounded-lg text-white shadow-lg active:from-purple-700 active:to-purple-900 transition-all duration-150 retro-border";
  
  return (
    <div className="md:hidden mt-8 w-full max-w-md px-4">
      <div className="flex justify-between mb-6">
        <button
          className={buttonClass}
          onClick={() => togglePause()}
          aria-label={isPaused ? "Resume" : "Pause"}
        >
          <Pause size={24} />
        </button>
        
        <button
          className="bg-gradient-to-b from-red-600 to-red-800 p-4 rounded-lg text-white shadow-lg active:from-red-700 active:to-red-900 transition-all duration-150 retro-border"
          onClick={() => resetGame()}
          aria-label="Reset game"
        >
          <RefreshCcw size={24} />
        </button>
      </div>
      
      <div className="flex justify-between">
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-3 gap-3">
            <div></div>
            <button
              className={buttonClass}
              onClick={() => rotatePiece('clockwise')}
              aria-label="Rotate clockwise"
            >
              <ArrowUp size={24} />
            </button>
            <div></div>
            
            <button
              className={buttonClass}
              onClick={() => movePiece(Direction.LEFT)}
              aria-label="Move left"
            >
              <ArrowLeft size={24} />
            </button>
            
            <button
              className={buttonClass}
              onClick={() => movePiece(Direction.DOWN)}
              aria-label="Move down"
            >
              <ArrowDown size={24} />
            </button>
            
            <button
              className={buttonClass}
              onClick={() => movePiece(Direction.RIGHT)}
              aria-label="Move right"
            >
              <ArrowRight size={24} />
            </button>
          </div>
        </div>
        
        <div className="flex flex-col gap-3">
          <button
            className={buttonClass}
            onClick={() => rotatePiece('counterclockwise')}
            aria-label="Rotate counter-clockwise"
          >
            <RotateCcw size={24} />
          </button>
          
          <button
            className={buttonClass}
            onClick={() => hardDrop()}
            aria-label="Hard drop"
          >
            <Space size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Controls;