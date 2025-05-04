import React, { useState } from 'react';
import Tetris from './components/Tetris';
import Home from './components/Home';
import HighScores from './components/HighScores';
import { GameScreen } from './types';

function App() {
  const [screen, setScreen] = useState<GameScreen>('home');
  const [startLevel, setStartLevel] = useState(0);

  const handleStartGame = (level: number) => {
    setStartLevel(level);
    setScreen('game');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {screen === 'home' && (
        <Home
          onStartGame={handleStartGame}
          onViewHighScores={() => setScreen('highScores')}
        />
      )}
      
      {screen === 'game' && (
        <Tetris
          startLevel={startLevel}
          onExit={() => setScreen('home')}
        />
      )}
      
      {screen === 'highScores' && (
        <HighScores onBack={() => setScreen('home')} />
      )}
    </div>
  );
}

export default App;