import { useEffect, useState } from "react";
import { FREE_SPACE_INDEX, GRID_SIZE } from "../constant";
import { Cell } from "../model/bingo.model";
import { phrases } from "../server/mock.phrases";
import { resetGame } from "../utils/resetGame";
import { shuffleBingoPhrases } from "../utils/shuffleBingoPhrases";
import { checkBingoHandler } from "../utils/checkBingoHandler";

export const useCheckBingo = () => {
  const [bingoCount, setBingoCount] = useState(0);
  const [board, setBoard] = useState<Cell[]>([]);
  const [completedLines, setCompletedLines] = useState<Set<string>>(new Set());

  const handleCellClick = (index: number) => {
    if (board[index].selected || index === FREE_SPACE_INDEX) return;

    const updatedBoard = board.map((cell, i) =>
      i === index ? { ...cell, selected: !cell.selected } : cell
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
    resetGame(setBingoCount, setBoard, setCompletedLines);
  };

  useEffect(() => {
    const shuffledPhrases = shuffleBingoPhrases(phrases).slice(
      0,
      GRID_SIZE * GRID_SIZE
    );
    const initialBoard = shuffledPhrases.map((phrase, index) => ({
      phrase,
      selected: index === FREE_SPACE_INDEX,
    }));
    setBoard(initialBoard);
  }, []);

  return {
    bingoCount,
    board,
    handleCellClick,
    resetGame: reset,
  };
};
