import React from 'react';

interface PauseOverlayProps {
  togglePause: () => void;
}

const PauseOverlay: React.FC<PauseOverlayProps> = ({ togglePause }) => {
  return (
    <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-10 backdrop-blur-sm">
      <div className="bg-gray-900/90 p-8 rounded-lg text-center max-w-md retro-border">
        <h2 className="text-3xl font-bold mb-6 retro-text-glow">PAUSED</h2>
        <p className="text-xl mb-8">Press P or click below to resume</p>
        <button
          className="bg-gradient-to-b from-green-600 to-green-800 px-8 py-4 rounded-lg text-white shadow-lg hover:from-green-700 hover:to-green-900 transition-all duration-300 retro-border"
          onClick={togglePause}
        >
          RESUME
        </button>
      </div>
    </div>
  );
};

export default PauseOverlay;