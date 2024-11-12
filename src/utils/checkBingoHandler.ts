import { Dispatch, SetStateAction } from "react";
import { GRID_SIZE } from "../constant";
import { Cell } from "../model/bingo.model";

export const checkBingoHandler = (
  updatedBoard: Cell[],
  setBingoCount: Dispatch<SetStateAction<number>>,
  completedLines: Set<string>,
  setCompletedLines: (lines: Set<string>) => void
): void => {
  const rows = Array(GRID_SIZE).fill(0);
  const cols = Array(GRID_SIZE).fill(0);
  let diag1 = 0;
  let diag2 = 0;
  const newCompletedLines = new Set(completedLines);

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

  let newBingos = 0;

  rows.forEach((count, row) => {
    if (count === GRID_SIZE && !newCompletedLines.has(`row-${row}`)) {
      newCompletedLines.add(`row-${row}`);
      newBingos++;
    }
  });

  cols.forEach((count, col) => {
    if (count === GRID_SIZE && !newCompletedLines.has(`col-${col}`)) {
      newCompletedLines.add(`col-${col}`);
      newBingos++;
    }
  });

  if (diag1 === GRID_SIZE && !newCompletedLines.has("diag1")) {
    newCompletedLines.add("diag1");
    newBingos++;
  }
  if (diag2 === GRID_SIZE && !newCompletedLines.has("diag2")) {
    newCompletedLines.add("diag2");
    newBingos++;
  }

  if (newBingos > 0) {
    setBingoCount((prevCount) => prevCount + newBingos);
    setCompletedLines(newCompletedLines);
  }
};
