import React, { useEffect, useState } from "react";
import { phrases } from "../server/mock.phrases";
import { Cell } from "../model/bingo.model";
import { FREE_SPACE_INDEX, GRID_SIZE } from "../constant";

export const BingoApp: React.FC = () => {
  const [board, setBoard] = useState<Cell[]>([]);

  const shuffleArray = (array: string[]): string[] => {
    return array
      .map((item) => ({ item, sortKey: Math.random() }))
      .sort((a, b) => a.sortKey - b.sortKey)
      .map(({ item }) => item);
  };

  useEffect(() => {
    const shuffledPhrases = shuffleArray(phrases).slice(
      0,
      GRID_SIZE * GRID_SIZE
    );
    const initialBoard = shuffledPhrases.map((phrase, index) => ({
      phrase,
      selected: index === FREE_SPACE_INDEX,
    }));
    setBoard(initialBoard);
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6">Bingo Game 🎉</h1>
      <div className="grid grid-cols-5 gap-2">
        {board.map((cell, index) => (
          <div
            key={index}
            className={`p-4 text-center border rounded-lg cursor-pointer
              ${cell.selected ? "bg-green-300" : "bg-white"}
              ${index === FREE_SPACE_INDEX ? "bg-yellow-300" : ""}
            `}
          >
            <p className="text-sm font-semibold">{cell.phrase}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-green-500 text-white font-bold text-lg rounded-lg animate-bounce">
        Bingo! 🎉
      </div>
    </div>
  );
};
