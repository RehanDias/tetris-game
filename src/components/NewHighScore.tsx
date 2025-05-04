import React, { useState } from 'react';
import { Trophy } from 'lucide-react';

interface NewHighScoreProps {
  score: number;
  level: number;
  onSave: (name: string) => void;
}

const NewHighScore: React.FC<NewHighScoreProps> = ({ score, level, onSave }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSave(name.trim());
    }
  };

  return (
    <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-20 backdrop-blur-sm">
      <div className="bg-gray-900/90 p-8 rounded-lg text-center max-w-md retro-border">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Trophy className="w-8 h-8 text-yellow-400" />
          <h2 className="text-3xl font-bold retro-text-glow">NEW HIGH SCORE!</h2>
        </div>
        
        <p className="text-xl mb-2">Level {level}</p>
        <p className="text-3xl mb-8 retro-text-glow">{score.toString().padStart(6, '0')}</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm text-gray-400 mb-2">
              Enter your name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={15}
              className="w-full bg-gray-800 border-2 border-purple-500 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-400"
              autoFocus
            />
          </div>
          
          <button
            type="submit"
            disabled={!name.trim()}
            className="bg-gradient-to-b from-yellow-600 to-yellow-800 px-8 py-4 rounded-lg text-white shadow-lg hover:from-yellow-700 hover:to-yellow-900 transition-all duration-300 retro-border disabled:opacity-50"
          >
            SAVE SCORE
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewHighScore;