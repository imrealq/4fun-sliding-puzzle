import type { PuzzleBoard as PuzzleBoardModel } from './puzzle.types';

export type PuzzleBoardProps = Readonly<{
  board: PuzzleBoardModel;
  imageSrc: string;
  onTileMove?: (tileId: number) => void;
}>;

export type PuzzleBoardPreviewProps = Readonly<{
  board: PuzzleBoardModel;
}>;
