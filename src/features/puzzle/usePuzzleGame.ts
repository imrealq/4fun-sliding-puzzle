import { useEffect, useMemo, useState } from 'react';
import { createKeyboardMoveHandler, createSolvedBoard, isSolvedBoard } from './index';
import type { PuzzleBoard } from './puzzle.types';
import { shuffleBoard } from './puzzle.shuffle';

function formatDuration(milliseconds: number): string {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds].map((value) => String(value).padStart(2, '0')).join(':');
}

export function usePuzzleGame(boardSize = 4): Readonly<{
  board: PuzzleBoard;
  elapsedTime: string;
  isWon: boolean;
  showReference: boolean;
  handlePlay: () => void;
  toggleReference: () => void;
}> {
  const [board, setBoard] = useState(() => shuffleBoard(createSolvedBoard(boardSize)));
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [now, setNow] = useState<number | null>(null);
  const [isWon, setIsWon] = useState(false);
  const [showReference, setShowReference] = useState(false);
  const [finishedAt, setFinishedAt] = useState<number | null>(null);

  const handlePlay = (): void => {
    setBoard(shuffleBoard(createSolvedBoard(boardSize)));
    setStartedAt(null);
    setNow(null);
    setIsWon(false);
    setFinishedAt(null);
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

  return {
    board,
    elapsedTime,
    isWon,
    showReference,
    handlePlay,
    toggleReference: () => setShowReference((current) => !current),
  };
}
