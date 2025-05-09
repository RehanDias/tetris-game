import React from "react";
import { CELL_SIZE } from "../utils/constants";
import { GameState } from "../types";
import Cell from "./Cell";

interface GameStatsProps {
    gameState: GameState;
}

const GameStats: React.FC<GameStatsProps> = ({ gameState }) => {
    const { score, level, lines, nextPiece } = gameState;

    const renderNextPiece = () => {
        if (!nextPiece) return null;

        const { shape } = nextPiece;

        return (
            <div
                className="grid gap-[1px] bg-gray-800/50 mx-auto"
                style={{
                    gridTemplateRows: `repeat(${shape.length}, ${CELL_SIZE}px)`,
                    gridTemplateColumns: `repeat(${shape[0].length}, ${CELL_SIZE}px)`,
                }}
            >
                {shape.flat().map((cell, index) => (
                    <Cell key={index} cell={cell} />
                ))}
            </div>
        );
    };

    return (
        <div className="p-3 md:p-6 bg-gray-900/80 rounded-lg retro-border min-w-[200px] md:min-w-[240px]">
            <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6 text-center retro-text-glow">
                NEXT
            </h2>

            <div className="mb-4 md:mb-8 p-2 md:p-4 bg-gray-800/30 rounded-lg">
                {renderNextPiece()}
            </div>

            <div className="grid grid-cols-3 md:grid-cols-1 gap-2 md:gap-6">
                <div className="text-center">
                    <h3 className="text-xs md:text-sm text-purple-300 mb-1 md:mb-2">
                        SCORE
                    </h3>
                    <p className="text-lg md:text-2xl retro-text-glow">
                        {score.toString().padStart(6, "0")}
                    </p>
                </div>

                <div className="text-center">
                    <h3 className="text-xs md:text-sm text-purple-300 mb-1 md:mb-2">
                        LEVEL
                    </h3>
                    <p className="text-lg md:text-2xl retro-text-glow">
                        {level.toString().padStart(2, "0")}
                    </p>
                </div>

                <div className="text-center">
                    <h3 className="text-xs md:text-sm text-purple-300 mb-1 md:mb-2">
                        LINES
                    </h3>
                    <p className="text-lg md:text-2xl retro-text-glow">
                        {lines.toString().padStart(3, "0")}
                    </p>
                </div>
            </div>

            <div className="hidden md:block mt-8 pt-6 border-t border-white/10 text-xs space-y-2 text-gray-400">
                <p>← → : MOVE</p>
                <p>↓ : SOFT DROP</p>
                <p>↑ / X : ROTATE</p>
                <p>Z : ROTATE CCW</p>
                <p>SPACE : HARD DROP</p>
                <p>P : PAUSE</p>
                <p>R : RESTART</p>
            </div>
        </div>
    );
};

export default React.memo(GameStats);
