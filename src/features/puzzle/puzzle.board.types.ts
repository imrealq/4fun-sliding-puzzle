import type { PuzzleBoard as PuzzleBoardModel } from './puzzle.types';

export type PuzzleBoardProps = Readonly<{
  board: PuzzleBoardModel;
  imageSrc: string;
}>;

export type PuzzleBoardPreviewProps = Readonly<{
  board: PuzzleBoardModel;
}>;
