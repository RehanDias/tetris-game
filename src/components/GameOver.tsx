import React from 'react';

interface GameOverProps {
  score: number;
  resetGame: () => void;
  onSelectLevel: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ score, resetGame, onSelectLevel }) => {
  return (
    <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-10 backdrop-blur-sm">
      <div className="bg-gray-900/90 p-8 rounded-lg text-center max-w-md retro-border">
        <h2 className="text-3xl font-bold mb-6 retro-text-glow">GAME OVER</h2>
        <p className="text-xl mb-8">
          SCORE: <span className="text-2xl font-bold retro-text-glow">{score.toString().padStart(6, '0')}</span>
        </p>
        <div className="space-y-4">
          <button
            className="w-full bg-gradient-to-b from-purple-600 to-purple-800 px-8 py-4 rounded-lg text-white shadow-lg hover:from-purple-700 hover:to-purple-900 transition-all duration-300 retro-border"
            onClick={resetGame}
          >
            PLAY AGAIN
          </button>
          <button
            className="w-full bg-gradient-to-b from-blue-600 to-blue-800 px-8 py-4 rounded-lg text-white shadow-lg hover:from-blue-700 hover:to-blue-900 transition-all duration-300 retro-border"
            onClick={onSelectLevel}
          >
            SELECT LEVEL
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOver;