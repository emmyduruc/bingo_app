import { useEffect, useState } from "react";
import { FREE_SPACE_INDEX, GRID_SIZE } from "../constant";
import { Cell } from "../model/bingo.model";
import { phrases } from "../server/mock.phrases";
import { handleCellClick } from "../utils/handleCellClick";
import { resetGame } from "../utils/resetGame";
import { shuffleBingoPhrases } from "../utils/shuffleBingoPhrases";
import { checkBingoHandler } from "../utils/checkBingoHandler";

export const useCheckBingo = () => {
  const [isBingo, setIsBingo] = useState(false);
  const [board, setBoard] = useState<Cell[]>([]);

  const handleClick = (index: number) =>
    handleCellClick(index, board, isBingo, setBoard, (newBoard) =>
      checkBingoHandler(newBoard, setIsBingo)
    );

  const reset = () => resetGame(setIsBingo, setBoard);

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
    isBingo,
    board,
    handleCellClick: handleClick,
    resetGame: reset,
    setBoard,
    setIsBingo,
  };
};
