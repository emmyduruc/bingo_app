export const BINGO_NUMBERS = Array.from({ length: 75 }, (_, i) => i + 1);

export const drawNumber = (
  numbers: number[]
): { drawnNumber: number | null; remainingNumbers: number[] } => {
  if (numbers.length === 0) return { drawnNumber: null, remainingNumbers: [] };

  const randomIndex = Math.floor(Math.random() * numbers.length);
  const drawnNumber = numbers[randomIndex];
  const remainingNumbers = numbers.filter((num) => num !== drawnNumber);

  return { drawnNumber, remainingNumbers };
};
