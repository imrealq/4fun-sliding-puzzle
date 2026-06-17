# Sliding Puzzle Implementation Skeleton

## Status
Initial skeleton requested for the sliding puzzle project.

## Planned Source Structure
### 1. App Shell
- `src/app/`
  - `main.tsx`
  - `App.tsx`
  - `routes.tsx`

### 2. Shared UI Components
- `src/components/`
  - `PuzzleBoard/`
  - `PuzzleTile/`
  - `ImagePreview/`
  - `GameToolbar/`
  - `GameStats/`
  - `Modal/`

### 3. Puzzle Feature
- `src/features/puzzle/`
  - `puzzle.types.ts`
  - `puzzle.logic.ts`
  - `puzzle.utils.ts`
  - `puzzle.shuffle.ts`
  - `puzzle.hooks.ts`

### 4. Game Feature
- `src/features/game/`
  - `game.store.ts`
  - `game.actions.ts`
  - `game.selectors.ts`

### 5. Hooks
- `src/hooks/`
  - `useBoardSize.ts`
  - `usePointerMove.ts`
  - `useResponsiveGrid.ts`

### 6. Libraries
- `src/lib/`
  - `image/sliceImage.ts`
  - `image/preloadImage.ts`
  - `storage/localStorage.ts`
  - `math/random.ts`
  - `math/grid.ts`

### 7. Styles
- `src/styles/`
  - `globals.css`
  - `theme.css`

### 8. Types and Constants
- `src/types/`
  - `common.ts`
  - `game.ts`
- `src/constants/`
  - `board.ts`
  - `images.ts`
  - `routes.ts`

## Intended First Skeleton Contents
- App shell entry points.
- Puzzle board and tile component placeholders.
- Puzzle logic modules for board state, shuffle, and win detection.
- Game state modules for timing, moves, and restart.
- Shared utilities for image slicing and responsive helpers.
- Folder boundaries that match the stage breakdown in `pipeline/2.design/sliding-puzzle.design.md`.

## Notes
This implementation stage should stay minimal and focus on folder scaffolding plus placeholder modules so feature work can proceed in small increments.
