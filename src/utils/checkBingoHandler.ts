import { GRID_SIZE } from "../constant";
import { Cell } from "../model/bingo.model";

export const checkBingoHandler = (
  updatedBoard: Cell[],
  setIsBingo: (value: boolean) => void
): void => {
  const rows = Array(GRID_SIZE).fill(0);
  const cols = Array(GRID_SIZE).fill(0);
  let diag1 = 0;
  let diag2 = 0;

  updatedBoard.forEach((cell, index) => {
    if (cell.selected) {
      const row = Math.floor(index / GRID_SIZE);
      const col = index % GRID_SIZE;

      rows[row]++;
      cols[col]++;
      if (row === col) diag1++;
      if (row + col === GRID_SIZE - 1) diag2++;
    }
  });

  if (
    rows.includes(GRID_SIZE) ||
    cols.includes(GRID_SIZE) ||
    diag1 === GRID_SIZE ||
    diag2 === GRID_SIZE
  ) {
    setIsBingo(true);
  }
};
