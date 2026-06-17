import { DEFAULT_IMAGE } from '@/constants/images';
import { useEffect, useMemo, useState } from 'react';
import { createKeyboardMoveHandler, createSolvedBoard, isSolvedBoard } from '@/features/puzzle';
import { PuzzleBoard } from '@/features/puzzle/puzzle.board';
import { shuffleBoard } from '@/features/puzzle/puzzle.shuffle';

export function App(): JSX.Element {
  const [board, setBoard] = useState(() => shuffleBoard(createSolvedBoard(4)));
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [now, setNow] = useState<number | null>(null);
  const [isWon, setIsWon] = useState(false);
  const [showReference, setShowReference] = useState(false);
  const [finishedAt, setFinishedAt] = useState<number | null>(null);

  const handlePlay = (): void => {
    setBoard(shuffleBoard(createSolvedBoard(4)));
    setStartedAt(null);
    setNow(null);
    setIsWon(false);
    setFinishedAt(null);
  };

  const formatDuration = (milliseconds: number): string => {
    const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return [hours, minutes, seconds].map((value) => String(value).padStart(2, '0')).join(':');
  };

  const elapsedTime = useMemo(() => {
    const endTime = finishedAt ?? now ?? startedAt;

    if (!startedAt || !endTime) {
      return '00:00:00';
    }

    return formatDuration(endTime - startedAt);
  }, [finishedAt, now, startedAt]);

  useEffect(() => {
    if (!startedAt || finishedAt) {
      return;
    }

    const timer = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [finishedAt, startedAt]);

  useEffect(() => {
    if (isSolvedBoard(board)) {
      setIsWon(true);
      setFinishedAt(Date.now());
    }
  }, [board]);

  useEffect(() => {
    const onKeyDown = createKeyboardMoveHandler(setBoard);

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  useEffect(() => {
    if (startedAt || finishedAt) {
      return;
    }

    const onFirstMove = (): void => {
      setStartedAt(Date.now());
      setNow(Date.now());
    };

    window.addEventListener('keydown', onFirstMove, { once: true });

    return () => {
      window.removeEventListener('keydown', onFirstMove);
    };
  }, [finishedAt, startedAt]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-8 text-slate-100">
      <section className="w-full max-w-5xl space-y-6">
        <header className="text-center">
          <div className="mb-3 text-sm text-slate-300">Time: {elapsedTime}</div>
          <div className="mx-auto flex w-full flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={handlePlay}
              className="rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
            >
              Replay / Shuffle
            </button>
            <button
              type="button"
              onClick={() => setShowReference((current) => !current)}
              className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-800"
              aria-label="Toggle reference image"
            >
              <span className="text-base">🖼️</span>
              <span>{showReference ? 'Hide reference' : 'Show reference'}</span>
            </button>
          </div>
        </header>

        <div className="flex justify-center">
          <PuzzleBoard board={board} imageSrc={DEFAULT_IMAGE} />
        </div>

        {showReference ? (
          <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/60 px-4">
            <button
              type="button"
              className="absolute inset-0 cursor-default"
              aria-label="Close reference image"
              onClick={() => setShowReference(false)}
            />
            <div className="relative z-10 w-full max-w-[22rem] rounded-2xl border border-slate-700 bg-slate-950 p-3 shadow-2xl shadow-black/40">
              <img
                src={DEFAULT_IMAGE}
                alt="Default puzzle source"
                className="h-auto w-full rounded-lg"
              />
            </div>
          </div>
        ) : null}

        {isWon ? (
          <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/60 px-4">
            <div className="w-full max-w-sm rounded-3xl border border-slate-700 bg-slate-950 p-6 text-center shadow-2xl shadow-black/40">
              <h2 className="text-2xl font-semibold text-slate-100">You win</h2>
              <p className="mt-2 text-sm text-slate-300">Completed in {elapsedTime}</p>
              <button
                type="button"
                onClick={handlePlay}
                className="mt-5 rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
              >
                Replay
              </button>
            </div>
          </div>
        ) : null}
      </section>
    </main>
  );
}
