export type PuzzleDifficulty = 'easy' | 'normal' | 'hard';

export type PuzzleDifficultyOption = Readonly<{
  id: PuzzleDifficulty;
  label: string;
  rows: number;
  cols: number;
  imageSrc: string;
}>;
