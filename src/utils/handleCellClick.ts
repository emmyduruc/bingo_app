import { FREE_SPACE_INDEX } from "../constant";
import { Cell } from "../model/bingo.model";

export const handleCellClick = (
  index: number,
  board: Cell[],
  isBingo: boolean,
  setBoard: (board: Cell[]) => void,
  checkBingo: (updatedBoard: Cell[]) => void
): void => {
  if (isBingo || index === FREE_SPACE_INDEX) return;

  const newBoard = board.map((cell, i) =>
    i === index ? { ...cell, selected: !cell.selected } : cell
  );

  setBoard(newBoard);
  checkBingo(newBoard);
};
