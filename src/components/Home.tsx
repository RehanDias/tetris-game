import React from 'react';
import { Trophy } from 'lucide-react';
import { getHighScores } from '../utils/storage';

interface HomeProps {
  onStartGame: (level: number) => void;
  onViewHighScores: () => void;
}

const Home: React.FC<HomeProps> = ({ onStartGame, onViewHighScores }) => {
  const highScores = getHighScores();
  const topScore = highScores[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-5xl font-bold mb-12 retro-text-glow tracking-widest">TETRIS</h1>
      
      <div className="bg-gray-900/80 p-8 rounded-lg retro-border max-w-md w-full mb-8">
        {topScore && (
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Trophy className="w-6 h-6 text-yellow-400" />
              <h2 className="text-lg text-yellow-400">HIGH SCORE</h2>
            </div>
            <p className="text-2xl retro-text-glow">{topScore.score.toString().padStart(6, '0')}</p>
            <p className="text-sm text-gray-400 mt-1">by {topScore.name}</p>
          </div>
        )}
        
        <div className="space-y-4">
          <h2 className="text-xl text-center mb-6">SELECT LEVEL</h2>
          <div className="grid grid-cols-2 gap-4">
            {[...Array(10)].map((_, i) => (
              <button
                key={i}
                onClick={() => onStartGame(i)}
                className="bg-gradient-to-b from-purple-600 to-purple-800 px-6 py-4 rounded-lg text-white shadow-lg hover:from-purple-700 hover:to-purple-900 transition-all duration-300 retro-border"
              >
                LEVEL {i}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <button
        onClick={onViewHighScores}
        className="bg-gradient-to-b from-blue-600 to-blue-800 px-8 py-4 rounded-lg text-white shadow-lg hover:from-blue-700 hover:to-blue-900 transition-all duration-300 retro-border"
      >
        HIGH SCORES
      </button>
    </div>
  );
}

export default Home;