import React, { useEffect, useState } from "react";
import { FREE_SPACE_INDEX } from "../constant";
import { useCheckBingo } from "../hooks/useCheckBingo";
import { SUB_TITLE, TITLE } from "../constant/typography";
import Confetti from "react-confetti";

export const BingoApp: React.FC = () => {
  const { bingoCount, board, resetGame, handleCellClick } = useCheckBingo();

  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (bingoCount > 0) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000); // Show confetti for 3 seconds
    }
  }, [bingoCount]);
  console.log("bingoCount..", bingoCount);
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-yellow-100 to-yellow-300 p-4">
      {showConfetti && <Confetti width={300} height={300} />}
      <h1 className="text-3xl md:text-4xl font-bold mb-2 text-yellow-800 text-center">
        {TITLE}
      </h1>
      <p className="text-lg md:text-xl mb-6 text-yellow-600 text-center">
        {SUB_TITLE}
      </p>

      <div className="grid grid-cols-5 gap-2 w-full max-w-md md:max-w-lg lg:max-w-2xl mx-auto">
        {board.map((cell, index) => (
          <div
            key={index}
            onClick={() => handleCellClick(index)}
            className={`p-2 md:p-4 lg:p-6 text-center border-2 rounded-lg cursor-pointer transition-all transform
              ${
                cell.selected
                  ? "bg-orange-500 text-white animate-bounce"
                  : "bg-gray-100 hover:bg-blue-200 hover:border-blue-500 hover:shadow-lg"
              }
              ${
                index === FREE_SPACE_INDEX
                  ? "bg-red-500 text-white font-bold"
                  : ""
              }
            `}
          >
            <p className="text-sm md:text-lg lg:text-xl font-semibold">
              {cell.phrase}
            </p>
          </div>
        ))}
      </div>

      {bingoCount > 0 && (
        <>
          <div className="mt-6 p-4 bg-green-500 text-white font-bold text-lg md:text-xl rounded-lg animate-bounce">
            Bingo! 🎉 You have {bingoCount} Bingo(s)!
          </div>

          <div>
            <button
              onClick={resetGame}
              className="mt-6 p-4 bg-red-500 text-white font-bold text-lg md:text-xl rounded-lg shadow-lg animate-bounce cursor-pointer transition-transform transform hover:scale-110"
            >
              Reset Game
            </button>
          </div>
        </>
      )}
    </div>
  );
};
