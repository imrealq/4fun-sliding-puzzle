import type { PuzzleBoard } from './puzzle.types';

export function isSolvedBoard(board: PuzzleBoard): boolean {
  return board.tiles.every((tile) => {
    return (
      tile.position.row === tile.correctPosition.row &&
      tile.position.column === tile.correctPosition.column
    );
  });
}

export function findEmptyTile(board: PuzzleBoard): PuzzleBoard['tiles'][number] | null {
  return board.tiles.find((tile) => tile.isEmpty) ?? null;
}

export function getEmptyTilePosition(
  board: PuzzleBoard,
): PuzzleBoard['tiles'][number]['position'] | null {
  const emptyTile = findEmptyTile(board);

  return emptyTile ? emptyTile.position : null;
}

export function getTileById(
  board: PuzzleBoard,
  tileId: number,
): PuzzleBoard['tiles'][number] | null {
  return board.tiles.find((tile) => tile.id === tileId) ?? null;
}

export function areAdjacent(
  a: { row: number; column: number },
  b: { row: number; column: number },
): boolean {
  const rowDistance = Math.abs(a.row - b.row);
  const columnDistance = Math.abs(a.column - b.column);

  return rowDistance + columnDistance === 1;
}

export function canMoveTile(board: PuzzleBoard, tileId: number): boolean {
  const tile = board.tiles.find((candidate) => candidate.id === tileId);
  const emptyTile = findEmptyTile(board);

  if (!tile || !emptyTile) {
    return false;
  }

  return areAdjacent(tile.position, emptyTile.position);
}

export function canMoveTileByArrowKey(
  board: PuzzleBoard,
  direction: 'up' | 'down' | 'left' | 'right',
): number | null {
  const emptyTile = findEmptyTile(board);

  if (!emptyTile) {
    return null;
  }

  const targetPosition =
    direction === 'up'
      ? { row: emptyTile.position.row - 1, column: emptyTile.position.column }
      : direction === 'down'
        ? { row: emptyTile.position.row + 1, column: emptyTile.position.column }
        : direction === 'left'
          ? { row: emptyTile.position.row, column: emptyTile.position.column - 1 }
          : { row: emptyTile.position.row, column: emptyTile.position.column + 1 };

  const tile = board.tiles.find(
    (candidate) =>
      candidate.position.row === targetPosition.row &&
      candidate.position.column === targetPosition.column,
  );

  return tile && canMoveTile(board, tile.id) ? tile.id : null;
}

export function getArrowKeyTileId(
  board: PuzzleBoard,
  direction: 'up' | 'down' | 'left' | 'right',
): number | null {
  const emptyTile = findEmptyTile(board);

  if (!emptyTile) {
    return null;
  }

  const targetPosition =
    direction === 'up'
      ? { row: emptyTile.position.row + 1, column: emptyTile.position.column }
      : direction === 'down'
        ? { row: emptyTile.position.row - 1, column: emptyTile.position.column }
        : direction === 'left'
          ? { row: emptyTile.position.row, column: emptyTile.position.column + 1 }
          : { row: emptyTile.position.row, column: emptyTile.position.column - 1 };

  const tile = board.tiles.find(
    (candidate) =>
      candidate.position.row === targetPosition.row &&
      candidate.position.column === targetPosition.column,
  );

  return tile && canMoveTile(board, tile.id) ? tile.id : null;
}

export function moveTile(board: PuzzleBoard, tileId: number): PuzzleBoard {
  const tile = board.tiles.find((candidate) => candidate.id === tileId);
  const emptyTile = findEmptyTile(board);

  if (!tile || !emptyTile || !canMoveTile(board, tileId)) {
    return board;
  }

  return {
    ...board,
    tiles: board.tiles.map((candidate) => {
      if (candidate.id === tile.id) {
        return { ...candidate, position: emptyTile.position };
      }

      if (candidate.id === emptyTile.id) {
        return { ...candidate, position: tile.position };
      }

      return candidate;
    }),
  };
}
