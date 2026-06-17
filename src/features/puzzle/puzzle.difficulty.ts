export type PuzzleDifficulty = 'easy' | 'normal' | 'hard';

export type PuzzleDifficultyOption = Readonly<{
  id: PuzzleDifficulty;
  label: string;
  boardSize: number;
  imageSrc: string;
}>;
