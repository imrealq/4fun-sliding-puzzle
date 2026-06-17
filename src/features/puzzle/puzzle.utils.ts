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

export function getTileAtPosition(
  board: import('./puzzle.types').PuzzleBoard,
  row: number,
  column: number,
): import('./puzzle.types').PuzzleTile | null {
  return (
    board.tiles.find((tile) => tile.position.row === row && tile.position.column === column) ?? null
  );
}

export function getBoardTileCount(board: import('./puzzle.types').PuzzleBoard): number {
  return board.tiles.length;
}

export function sortTilesByPosition(
  tiles: readonly import('./puzzle.types').PuzzleTile[],
): readonly import('./puzzle.types').PuzzleTile[] {
  return [...tiles].sort((left, right) => {
    const leftIndex = left.position.row * 100 + left.position.column;
    const rightIndex = right.position.row * 100 + right.position.column;

    return leftIndex - rightIndex;
  });
}

export function getTileSliceStyle(
  tile: import('./puzzle.types').PuzzleTile,
  boardSize: number,
): Readonly<{
  backgroundSize: string;
  backgroundPosition: string;
}> {
  return {
    backgroundSize: `${boardSize * 100}% ${boardSize * 100}%`,
    backgroundPosition: `${(tile.correctPosition.column / Math.max(boardSize - 1, 1)) * 100}% ${(tile.correctPosition.row / Math.max(boardSize - 1, 1)) * 100}%`,
  };
}
