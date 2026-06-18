import type { PuzzleBoard, PuzzleTile } from './puzzle.types';

export function createSolvedBoard(size: number): PuzzleBoard {
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

  return { size, tiles };
}

export function getTileAtPosition(
  board: PuzzleBoard,
  row: number,
  column: number,
): PuzzleTile | null {
  return board.tiles.find((tile) => tile.position.row === row && tile.position.column === column) ?? null;
}

export function getBoardTileCount(board: PuzzleBoard): number {
  return board.tiles.length;
}

export function sortTilesByPosition(
  tiles: readonly PuzzleTile[],
): readonly PuzzleTile[] {
  return [...tiles].sort((left, right) => {
    const leftIndex = left.position.row * 100 + left.position.column;
    const rightIndex = right.position.row * 100 + right.position.column;
    return leftIndex - rightIndex;
  });
}

export function getTileSliceStyle(
  tile: PuzzleTile,
  boardSize: number,
): Readonly<{ backgroundSize: string; backgroundPosition: string }> {
  return {
    backgroundSize: `${boardSize * 100}% ${boardSize * 100}%`,
    backgroundPosition: `${(tile.correctPosition.column / Math.max(boardSize - 1, 1)) * 100}% ${(tile.correctPosition.row / Math.max(boardSize - 1, 1)) * 100}%`,
  };
}
