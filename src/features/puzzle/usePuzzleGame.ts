import { useEffect, useMemo, useRef, useState } from 'react';
import { createSolvedBoard, getArrowKeyTileId, isSolvedBoard, moveTile } from './index';
import type { PuzzleBoard } from './puzzle.types';
import { shuffleBoard } from './puzzle.shuffle';

function formatDuration(milliseconds: number): string {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds].map((value) => String(value).padStart(2, '0')).join(':');
}

export function usePuzzleGame(boardSize = 5): Readonly<{
  board: PuzzleBoard;
  elapsedTime: string;
  moveCount: number;
  isWon: boolean;
  showReference: boolean;
  handlePlay: () => void;
  moveByTileId: (tileId: number) => void;
  toggleReference: () => void;
}> {
  const [board, setBoard] = useState(() => shuffleBoard(createSolvedBoard(boardSize)));
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [now, setNow] = useState<number | null>(null);
  const [moveCount, setMoveCount] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [showReference, setShowReference] = useState(false);
  const [finishedAt, setFinishedAt] = useState<number | null>(null);
  const boardRef = useRef(board);
  const finishedAtRef = useRef(finishedAt);
  boardRef.current = board;
  finishedAtRef.current = finishedAt;

  useEffect(() => {
    setBoard(shuffleBoard(createSolvedBoard(boardSize)));
    setStartedAt(null);
    setNow(null);
    setMoveCount(0);
    setIsWon(false);
    setFinishedAt(null);
  }, [boardSize]);

  const applyMove = (nextBoard: PuzzleBoard): void => {
    setBoard(nextBoard);
    setMoveCount((current) => current + 1);

    if (!startedAt && !finishedAt) {
      setStartedAt(Date.now());
      setNow(Date.now());
    }
  };

  const moveByTileId = (tileId: number): void => {
    if (finishedAt) {
      return;
    }

    const nextBoard = moveTile(board, tileId);

    if (nextBoard === board) {
      return;
    }

    applyMove(nextBoard);
  };

  const handlePlay = (): void => {
    setBoard(shuffleBoard(createSolvedBoard(boardSize)));
    setStartedAt(null);
    setNow(null);
    setMoveCount(0);
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
    const onKeyDown = (event: KeyboardEvent): void => {
      if (finishedAtRef.current) {
        return;
      }

      const direction =
        event.key === 'ArrowUp'
          ? 'up'
          : event.key === 'ArrowDown'
            ? 'down'
            : event.key === 'ArrowLeft'
              ? 'left'
              : event.key === 'ArrowRight'
                ? 'right'
                : null;

      if (!direction) {
        return;
      }

      event.preventDefault();

      const tileId = getArrowKeyTileId(boardRef.current, direction);

      if (tileId === null) {
        return;
      }

      setBoard((currentBoard) => {
        const nextBoard = moveTile(currentBoard, tileId);

        if (nextBoard === currentBoard) {
          return currentBoard;
        }

        setMoveCount((c) => c + 1);
        setStartedAt((s) => s ?? Date.now());
        setNow(Date.now());

        return nextBoard;
      });
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return {
    board,
    elapsedTime,
    moveCount,
    isWon,
    showReference,
    handlePlay,
    moveByTileId,
    toggleReference: () => setShowReference((current) => !current),
  };
}
