import { DEFAULT_IMAGE } from '@/constants/images';
import { useState } from 'react';
import { createSolvedBoard } from '@/features/puzzle';
import { PuzzleBoard } from '@/features/puzzle/puzzle.board';
import { shuffleBoard } from '@/features/puzzle/puzzle.shuffle';

export function App(): JSX.Element {
  const [board, setBoard] = useState(() => shuffleBoard(createSolvedBoard(4)));

  const handlePlay = (): void => {
    setBoard(shuffleBoard(createSolvedBoard(4)));
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-8 text-slate-100">
      <section className="w-full max-w-5xl space-y-6">
        <header className="text-center">
          <h1 className="text-3xl font-semibold tracking-tight">Sliding Puzzle</h1>
          <button
            type="button"
            onClick={handlePlay}
            className="mt-4 rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
          >
            Play / Shuffle
          </button>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
          <PuzzleBoard board={board} imageSrc={DEFAULT_IMAGE} />

          <div className="rounded-xl border border-slate-800 p-2">
            <img
              src={DEFAULT_IMAGE}
              alt="Default puzzle source"
              className="h-auto w-full rounded-lg"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
