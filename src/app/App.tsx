import { DEFAULT_IMAGE } from '@/constants/images';
import { createSolvedBoard } from '@/features/puzzle';
import { PuzzleBoard } from '@/features/puzzle/puzzle.board';

export function App(): JSX.Element {
  const board = createSolvedBoard(4);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-8 text-slate-100">
      <section className="w-full max-w-5xl space-y-6">
        <header className="text-center">
          <h1 className="text-3xl font-semibold tracking-tight">Sliding Puzzle</h1>
          <p className="mt-2 text-sm text-slate-400">Board rendering stage is active.</p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
          <PuzzleBoard board={board} imageSrc={DEFAULT_IMAGE} />

          <aside className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
            <h2 className="text-lg font-medium">Preview</h2>
            <p className="mt-2 text-sm text-slate-400">
              The default image is wired into the puzzle board.
            </p>
            <div className="mt-4 rounded-xl border border-slate-800 p-2">
              <img
                src={DEFAULT_IMAGE}
                alt="Default puzzle source"
                className="h-auto w-full rounded-lg"
              />
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
