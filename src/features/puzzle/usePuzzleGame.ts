import { useEffect, useMemo, useState } from 'react';
import { createSolvedBoard } from './puzzle.utils';
import { isSolvedBoard, moveTile } from './puzzle.logic';
import { createKeyboardMoveHandler } from './puzzle.keyboard';
import type { PuzzleBoard } from './puzzle.types';
import { shuffleBoard } from './puzzle.shuffle';

function formatDuration(milliseconds: number): string {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds].map((v) => String(v).padStart(2, '0')).join(':');
}

function freshBoard(rows: number, cols: number): PuzzleBoard {
  return shuffleBoard(createSolvedBoard(rows, cols));
}

const INITIAL_STATE = {
  startedAt: null as number | null,
  now: null as number | null,
  moveCount: 0,
  isWon: false,
  finishedAt: null as number | null,
};

export function usePuzzleGame(rows = 4, cols = 4): Readonly<{
  board: PuzzleBoard;
  elapsedTime: string;
  moveCount: number;
  isWon: boolean;
  showReference: boolean;
  handlePlay: () => void;
  moveByTileId: (tileId: number) => void;
  toggleReference: () => void;
}> {
  const [board, setBoard] = useState(() => freshBoard(rows, cols));
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [now, setNow] = useState<number | null>(null);
  const [moveCount, setMoveCount] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [showReference, setShowReference] = useState(false);
  const [finishedAt, setFinishedAt] = useState<number | null>(null);

  const resetState = (): void => {
    setBoard(freshBoard(rows, cols));
    setStartedAt(INITIAL_STATE.startedAt);
    setNow(INITIAL_STATE.now);
    setMoveCount(INITIAL_STATE.moveCount);
    setIsWon(INITIAL_STATE.isWon);
    setFinishedAt(INITIAL_STATE.finishedAt);
  };

  useEffect(() => {
    resetState();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, cols]);

  const moveByTileId = (tileId: number): void => {
    if (finishedAt) return;

    const nextBoard = moveTile(board, tileId);
    if (nextBoard === board) return;

    setBoard(nextBoard);
    setMoveCount((c) => c + 1);

    if (!startedAt) {
      const now = Date.now();
      setStartedAt(now);
      setNow(now);
    }
  };

  const elapsedTime = useMemo(() => {
    const endTime = finishedAt ?? now ?? startedAt;
    if (!startedAt || !endTime) return '00:00:00';
    return formatDuration(endTime - startedAt);
  }, [finishedAt, now, startedAt]);

  // Tick the clock every second while a game is in progress
  useEffect(() => {
    if (!startedAt || finishedAt) return;

    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [finishedAt, startedAt]);

  // Detect win
  useEffect(() => {
    if (isSolvedBoard(board)) {
      setIsWon(true);
      setFinishedAt(Date.now());
    }
  }, [board]);

  // Keyboard moves
  useEffect(() => {
    const handler = createKeyboardMoveHandler((updater) => {
      if (finishedAt) return;

      setBoard((currentBoard) => {
        const nextBoard = updater(currentBoard);
        if (nextBoard === currentBoard) return currentBoard;

        setMoveCount((c) => c + 1);
        setStartedAt((s) => s ?? Date.now());
        setNow(Date.now());
        return nextBoard;
      });
    });

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  // Re-register when finishedAt changes so the guard inside sees the latest value
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finishedAt]);

  return {
    board,
    elapsedTime,
    moveCount,
    isWon,
    showReference,
    handlePlay: resetState,
    moveByTileId,
    toggleReference: () => setShowReference((s) => !s),
  };
}
