import { useEffect, useState } from "react";
import { FREE_SPACE_INDEX, GRID_SIZE } from "../constant";
import { Cell } from "../model/bingo.model";
import { BINGO_NUMBERS, drawNumber } from "../server/mock.phrases";
import { shuffleBingoPhrases } from "../utils/shuffleBingoPhrases";
import { checkBingoHandler } from "../utils/checkBingoHandler";

export const useCheckBingo = () => {
  const [bingoCount, setBingoCount] = useState(0);
  const [board, setBoard] = useState<Cell[]>([]);
  const [completedLines, setCompletedLines] = useState<Set<string>>(new Set());

  const [remainingNumbers, setRemainingNumbers] =
    useState<number[]>(BINGO_NUMBERS);
  const [calledNumbers, setCalledNumbers] = useState<number[] | null | any>([]);
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);

  const callNextNumber = () => {
    if (remainingNumbers.length === 0) {
      setRemainingNumbers(BINGO_NUMBERS);
      setCalledNumbers([]);
    } else {
      const { drawnNumber, remainingNumbers: newRemainingNumbers } =
        drawNumber(remainingNumbers);

      if (drawnNumber !== null) {
        setCurrentNumber(drawnNumber);
        setCalledNumbers((prev: any) => [...prev, drawnNumber]);
        setRemainingNumbers(newRemainingNumbers);
      }
    }
  };

  const generateBingoCard = () => {
    const shuffledNumbers = shuffleBingoPhrases(BINGO_NUMBERS).slice(
      0,
      GRID_SIZE * GRID_SIZE
    );
    return shuffledNumbers.map((num, index) => ({
      phrase: num.toString(),
      selected: index === FREE_SPACE_INDEX, // Mark free space in the center
    }));
  };

  const handleCellClick = (index: number) => {
    const selectedCell = board[index];
    if (
      selectedCell.phrase !== currentNumber?.toString() ||
      selectedCell.selected
    ) {
      return;
    }

    const updatedBoard = board.map((cell, i) =>
      i === index ? { ...cell, selected: true } : cell
    );

    setBoard(updatedBoard);
    checkBingoHandler(
      updatedBoard,
      setBingoCount,
      completedLines,
      setCompletedLines
    );
  };

  const reset = () => {
    setBingoCount(0);
    setCompletedLines(new Set());
    setRemainingNumbers(BINGO_NUMBERS);
    setCalledNumbers([]);
    setCurrentNumber(null);
    setBoard(generateBingoCard());
  };

  useEffect(() => {
    setBoard(generateBingoCard());
  }, []);

  return {
    bingoCount,
    board,
    handleCellClick,
    resetGame: reset,
    currentNumber,
    callNextNumber,
  };
};
