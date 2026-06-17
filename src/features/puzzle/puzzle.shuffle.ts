import { canMoveTile, findEmptyTile, moveTile } from './puzzle.logic';
import type { PuzzleBoard } from './puzzle.types';

function createSeededRandom(seed: number): () => number {
  let current = seed >>> 0;

  return () => {
    current = (current * 1664525 + 1013904223) >>> 0;
    return current / 0x100000000;
  };
}

function getSolvableShuffleSteps(size: number): number {
  return Math.max(size * size * 40, 160);
}

function getNeighborTileIds(board: PuzzleBoard): number[] {
  const emptyTile = findEmptyTile(board);

  if (!emptyTile) {
    return [];
  }

  return board.tiles.filter((tile) => canMoveTile(board, tile.id)).map((tile) => tile.id);
}

export function shuffleBoard(board: PuzzleBoard): PuzzleBoard {
  const random = createSeededRandom(Date.now());
  const steps = getSolvableShuffleSteps(board.size);
  let currentBoard = board;
  let previousTileId: number | null = null;

  for (let step = 0; step < steps; step += 1) {
    const neighborTileIds = getNeighborTileIds(currentBoard).filter(
      (tileId) => tileId !== previousTileId,
    );
    const candidates =
      neighborTileIds.length > 0 ? neighborTileIds : getNeighborTileIds(currentBoard);

    if (candidates.length === 0) {
      break;
    }

    const tileId = candidates[Math.floor(random() * candidates.length)];
    currentBoard = moveTile(currentBoard, tileId);
    previousTileId = tileId;
  }

  return currentBoard;
}
