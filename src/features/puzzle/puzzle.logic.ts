import type { PuzzleBoard } from './puzzle.types';

type Direction = 'up' | 'down' | 'left' | 'right';

// ArrowUp = blank moves up = tile BELOW blank fills the slot.
// Offset from empty to find which tile moves in.
const ARROW_TO_TILE_OFFSET: Record<Direction, { row: number; column: number }> = {
  up:    { row:  1, column:  0 },
  down:  { row: -1, column:  0 },
  left:  { row:  0, column:  1 },
  right: { row:  0, column: -1 },
};

export function isSolvedBoard(board: PuzzleBoard): boolean {
  return board.tiles.every(
    (tile) =>
      tile.position.row === tile.correctPosition.row &&
      tile.position.column === tile.correctPosition.column,
  );
}

export function findEmptyTile(board: PuzzleBoard): PuzzleBoard['tiles'][number] | null {
  return board.tiles.find((tile) => tile.isEmpty) ?? null;
}

export function getEmptyTilePosition(
  board: PuzzleBoard,
): PuzzleBoard['tiles'][number]['position'] | null {
  return findEmptyTile(board)?.position ?? null;
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
  return Math.abs(a.row - b.row) + Math.abs(a.column - b.column) === 1;
}

export function canMoveTile(board: PuzzleBoard, tileId: number): boolean {
  const tile = board.tiles.find((candidate) => candidate.id === tileId);
  const emptyTile = findEmptyTile(board);

  if (!tile || !emptyTile) {
    return false;
  }

  return areAdjacent(tile.position, emptyTile.position);
}

// Returns the id of the tile that would move into the empty slot in the given direction.
// Arrow key "up" means the tile below the empty slot moves up.
export function getArrowKeyTileId(
  board: PuzzleBoard,
  direction: Direction,
): number | null {
  const emptyTile = findEmptyTile(board);

  if (!emptyTile) {
    return null;
  }

  const offset = ARROW_TO_TILE_OFFSET[direction];
  const targetRow = emptyTile.position.row + offset.row;
  const targetColumn = emptyTile.position.column + offset.column;

  const tile = board.tiles.find(
    (candidate) =>
      candidate.position.row === targetRow &&
      candidate.position.column === targetColumn,
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
      if (candidate.id === tile.id) return { ...candidate, position: emptyTile.position };
      if (candidate.id === emptyTile.id) return { ...candidate, position: tile.position };
      return candidate;
    }),
  };
}
