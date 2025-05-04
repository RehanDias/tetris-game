import React from "react";
import Board from "./Board";
import GameStats from "./GameStats";
import Controls from "./Controls";
import GameOver from "./GameOver";
import PauseOverlay from "./PauseOverlay";
import NewHighScore from "./NewHighScore";
import { useGameLoop } from "../hooks/useGameLoop";
import { useKeyboardControls } from "../hooks/useKeyboardControls";
import { isHighScore, saveHighScore } from "../utils/storage";
import { ArrowLeft } from "lucide-react";

interface TetrisProps {
    startLevel: number;
    onExit: () => void;
}

const Tetris: React.FC<TetrisProps> = ({ startLevel, onExit }) => {
    const [showHighScore, setShowHighScore] = React.useState(false);

    const {
        gameState,
        movePiece,
        hardDrop,
        rotatePiece,
        togglePause,
        resetGame,
    } = useGameLoop(startLevel);

    useKeyboardControls({
        movePiece,
        hardDrop,
        rotatePiece,
        togglePause,
        resetGame,
    });

    React.useEffect(() => {
        if (gameState.gameOver && isHighScore(gameState.score)) {
            setShowHighScore(true);
        }
    }, [gameState.gameOver, gameState.score]);

    const handleSaveHighScore = (name: string) => {
        saveHighScore({
            name,
            score: gameState.score,
            level: gameState.level,
            date: new Date().toISOString(),
        });
        setShowHighScore(false);
    };

    const handleReset = () => {
        resetGame();
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 text-white flex flex-col items-center justify-start py-4 px-2 md:py-8 md:px-4 pb-36 md:pb-8">
            <div className="w-full max-w-6xl flex items-center justify-between mb-4 px-2">
                <button
                    onClick={onExit}
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                >
                    <ArrowLeft size={20} />
                    <span className="text-sm">EXIT</span>
                </button>
                <h1 className="text-2xl md:text-4xl font-bold retro-text-glow tracking-widest">
                    TETRIS
                </h1>
                <div className="w-16"></div>
            </div>

            <div className="relative flex flex-col md:flex-row gap-4 md:gap-8 items-center md:items-start">
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-xl"></div>
                    <Board gameState={gameState} />

                    {gameState.gameOver && !showHighScore && (
                        <GameOver
                            score={gameState.score}
                            resetGame={handleReset}
                            onSelectLevel={onExit}
                        />
                    )}

                    {gameState.isPaused && !gameState.gameOver && (
                        <PauseOverlay togglePause={togglePause} />
                    )}

                    {showHighScore && (
                        <NewHighScore
                            score={gameState.score}
                            level={gameState.level}
                            onSave={handleSaveHighScore}
                        />
                    )}
                </div>

                <GameStats gameState={gameState} />
            </div>

            <Controls
                movePiece={movePiece}
                hardDrop={hardDrop}
                rotatePiece={rotatePiece}
                togglePause={togglePause}
                resetGame={handleReset}
                isPaused={gameState.isPaused}
            />
        </div>
    );
};

export default Tetris;
