export function noopPuzzleUtil(): void {}

export function createSolvedBoard(size: number): import('./puzzle.types').PuzzleBoard {
  const tiles = Array.from({ length: size * size }, (_, index) => {
    const row = Math.floor(index / size);
    const column = index % size;
    const isEmpty = index === size * size - 1;

    return {
      id: index,
      position: { row, column },
      correctPosition: { row, column },
      isEmpty,
    };
  });

  return {
    size,
    tiles,
  };
}

export function resetBoard(size: number): import('./puzzle.types').PuzzleBoard {
  return createSolvedBoard(size);
}
