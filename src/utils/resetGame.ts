import { FREE_SPACE_INDEX, GRID_SIZE } from "../constant";
import { phrases } from "../server/mock.phrases";
import { shuffleBingoPhrases } from "./shuffleBingoPhrases";
import { Cell } from "../model/bingo.model";

export const resetGame = (
  setIsBingo: (value: boolean) => void,
  setBoard: (board: Cell[]) => void
): void => {
  setIsBingo(false);
  const shuffledPhrases = shuffleBingoPhrases(phrases).slice(
    0,
    GRID_SIZE * GRID_SIZE
  );

  const initialBoard: Cell[] = shuffledPhrases.map((phrase, index) => ({
    phrase,
    selected: index === FREE_SPACE_INDEX,
  }));

  setBoard(initialBoard);
};
