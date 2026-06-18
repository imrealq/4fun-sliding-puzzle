import type { PuzzleBoard, PuzzleTile } from './puzzle.types';

export function createSolvedBoard(rows: number, cols: number): PuzzleBoard {
  const total = rows * cols;
  const tiles = Array.from({ length: total }, (_, index) => {
    const row = Math.floor(index / cols);
    const column = index % cols;
    const isEmpty = index === total - 1;

    return {
      id: index,
      position: { row, column },
      correctPosition: { row, column },
      isEmpty,
    };
  });

  return { rows, cols, tiles };
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
  rows: number,
  cols: number,
): Readonly<{ backgroundSize: string; backgroundPosition: string }> {
  return {
    backgroundSize: `${cols * 100}% ${rows * 100}%`,
    backgroundPosition: `${(tile.correctPosition.column / Math.max(cols - 1, 1)) * 100}% ${(tile.correctPosition.row / Math.max(rows - 1, 1)) * 100}%`,
  };
}
