import { createSolvedBoard } from './puzzle.utils';
import type { PuzzleBoard } from './puzzle.types';

function createSeededRandom(seed: number): () => number {
  let current = seed >>> 0;

  return () => {
    current = (current * 1664525 + 1013904223) >>> 0;
    return current / 0x100000000;
  };
}

function shuffleArray<T>(items: readonly T[], random: () => number): T[] {
  const result = [...items];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }

  return result;
}

export function shuffleBoard(board: PuzzleBoard): PuzzleBoard {
  const random = createSeededRandom(Date.now());
  const size = board.size;
  const playableTiles = board.tiles.filter((tile) => !tile.isEmpty);
  const shuffledTiles = shuffleArray(playableTiles, random);

  const tiles = shuffledTiles.map((tile, index) => {
    const row = Math.floor(index / size);
    const column = index % size;

    return {
      ...tile,
      position: { row, column },
    };
  });

  const emptyPosition = { row: size - 1, column: size - 1 };
  const solvedBoard = createSolvedBoard(size);
  const emptyTile = solvedBoard.tiles[solvedBoard.tiles.length - 1];

  tiles.push({
    ...emptyTile,
    position: emptyPosition,
  });

  return {
    size,
    tiles,
  };
}
