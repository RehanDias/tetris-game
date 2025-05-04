import React from "react";
import {
    ArrowDown,
    ArrowLeft,
    ArrowRight,
    ArrowUp,
    RotateCcw,
    Space,
    Pause,
    RefreshCcw,
} from "lucide-react";
import { Direction } from "../types";

interface ControlsProps {
    movePiece: (direction: Direction) => void;
    hardDrop: () => void;
    rotatePiece: (direction: "clockwise" | "counterclockwise") => void;
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
    const buttonClass =
        "touch-none select-none w-12 h-12 bg-gradient-to-b from-purple-600 to-purple-800 rounded-lg text-white shadow-lg active:from-purple-700 active:to-purple-900 transition-all duration-150 retro-border flex items-center justify-center";

    return (
        <div className="md:hidden fixed bottom-4 left-0 right-0 w-full max-w-[320px] mx-auto px-4">
            <div className="bg-gray-900/90 rounded-xl p-4 retro-border">
                <div className="flex justify-between mb-4">
                    <button
                        className="w-12 h-12 bg-gradient-to-b from-blue-600 to-blue-800 rounded-lg text-white shadow-lg active:from-blue-700 active:to-blue-900 transition-all duration-150 retro-border flex items-center justify-center"
                        onClick={() => togglePause()}
                        aria-label={isPaused ? "Resume" : "Pause"}
                    >
                        <Pause size={20} />
                    </button>

                    <button
                        className="w-12 h-12 bg-gradient-to-b from-red-600 to-red-800 rounded-lg text-white shadow-lg active:from-red-700 active:to-red-900 transition-all duration-150 retro-border flex items-center justify-center"
                        onClick={() => resetGame()}
                        aria-label="Reset game"
                    >
                        <RefreshCcw size={20} />
                    </button>
                </div>

                <div className="flex justify-between">
                    <div className="flex flex-col items-center">
                        <div className="grid grid-cols-3 gap-3">
                            <div></div>
                            <button
                                className={buttonClass}
                                onClick={() => rotatePiece("clockwise")}
                                aria-label="Rotate clockwise"
                            >
                                <ArrowUp size={20} />
                            </button>
                            <div></div>

                            <button
                                className={buttonClass}
                                onClick={() => movePiece(Direction.LEFT)}
                                aria-label="Move left"
                            >
                                <ArrowLeft size={20} />
                            </button>

                            <button
                                className={buttonClass}
                                onClick={() => movePiece(Direction.DOWN)}
                                aria-label="Move down"
                            >
                                <ArrowDown size={20} />
                            </button>

                            <button
                                className={buttonClass}
                                onClick={() => movePiece(Direction.RIGHT)}
                                aria-label="Move right"
                            >
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <button
                            className={buttonClass}
                            onClick={() => rotatePiece("counterclockwise")}
                            aria-label="Rotate counter-clockwise"
                        >
                            <RotateCcw size={20} />
                        </button>

                        <button
                            className={buttonClass}
                            onClick={() => hardDrop()}
                            aria-label="Hard drop"
                        >
                            <Space size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Controls;
