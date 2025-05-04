import React from 'react';
import { ArrowLeft, Trophy } from 'lucide-react';
import { HighScore } from '../types';
import { getHighScores } from '../utils/storage';

interface HighScoresProps {
  onBack: () => void;
}

const HighScores: React.FC<HighScoresProps> = ({ onBack }) => {
  const scores = getHighScores();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="bg-gray-900/80 p-8 rounded-lg retro-border max-w-2xl w-full">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-3xl font-bold retro-text-glow flex items-center gap-3">
            <Trophy className="text-yellow-400" />
            HIGH SCORES
          </h1>
          <div className="w-6"></div>
        </div>

        <div className="space-y-4">
          {scores.length > 0 ? (
            scores.map((score, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-gray-500">
                    {(index + 1).toString().padStart(2, '0')}
                  </span>
                  <div>
                    <p className="font-bold">{score.name}</p>
                    <p className="text-sm text-gray-400">Level {score.level}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl retro-text-glow">
                    {score.score.toString().padStart(6, '0')}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(score.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">No high scores yet!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HighScores;