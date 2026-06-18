# Sliding Puzzle

React + TypeScript + Vite. An n-puzzle sliding game with 3 difficulty levels.

**Live:** https://4fun-sliding-puzzle.quynhtn29.workers.dev/

---

## Deploy

Hosted on Cloudflare Workers. Auto-deploys on every push to `main`.

```
Push to main
    ↓
Cloudflare Workers: clone → install → npm run build → deploy dist/
    ↓
Live at https://4fun-sliding-puzzle.quynhtn29.workers.dev/
```

---

## Source structure

```
src/
├── main.tsx                  # Entry point — mounts React into #root
├── app/
│   └── App.tsx               # Root component, renders PuzzleScreen
│
├── assets/
│   └── images/               # Source images for each difficulty
│       ├── default-3x3.svg   # easy   (3×3)
│       ├── default.svg       # normal (4×4)
│       └── default-5x5.svg   # hard   (5×5)
│
├── constants/
│   ├── board.ts              # Default / min / max board size
│   ├── images.ts             # Image paths and difficulty preset list
│   └── routes.ts             # URL route definitions (currently only "/")
│
├── types/
│   └── common.ts             # App-wide shared types: Nullable, Coordinate, GridSize
│
├── styles/
│   └── globals.css           # Tailwind directives + base styles (body, #root)
│
├── lib/                      # Pure utilities — no React dependency
│   ├── math/
│   │   ├── grid.ts           # toGridIndex, toGridPosition, isWithinGrid
│   │   └── random.ts         # randomInt
│   └── storage/
│       └── localStorage.ts   # SSR-safe getLocalStorageItem wrapper
│
├── components/               # Reusable UI components — no game logic
│   ├── index.ts              # Barrel export
│   ├── Button/               # General-purpose button (variant: primary | secondary)
│   ├── IconButton/           # Circular icon-only button
│   ├── HeaderControls/       # Header bar: timer, move count, shuffle + reference buttons
│   └── Modal/                # Overlay modal — accepts children, closes on backdrop click
│
└── features/
    └── puzzle/               # All game logic and UI for the puzzle
        ├── puzzle.types.ts         # Domain types: TileId, TilePosition, PuzzleTile, PuzzleBoard, PuzzleMove
        ├── puzzle.difficulty.ts    # PuzzleDifficulty and PuzzleDifficultyOption types
        ├── puzzle.board.types.ts   # Prop types for the PuzzleBoard component
        │
        ├── puzzle.logic.ts         # Core logic (pure functions): isSolvedBoard, canMoveTile,
        │                           #   getArrowKeyTileId, moveTile, findEmptyTile, areAdjacent
        ├── puzzle.utils.ts         # Helpers: createSolvedBoard, getTileAtPosition,
        │                           #   sortTilesByPosition, getTileSliceStyle
        ├── puzzle.shuffle.ts       # shuffleBoard — seeded random-walk shuffle
        ├── puzzle.keyboard.ts      # createKeyboardMoveHandler — keydown handler factory
        │
        ├── usePuzzleGame.ts        # Main hook: owns all game state (board, timer, moveCount,
        │                           #   isWon) and exposes actions to the UI
        │
        ├── puzzle.board.tsx        # PuzzleBoard component — renders the tile grid,
        │                           #   handles click and touch-swipe to move tiles
        ├── PuzzleDifficultySelector.tsx  # Pill buttons for difficulty selection
        ├── PuzzleScreen.tsx        # Top-level screen — composes all components and the hook,
        │                           #   owns difficulty state, shows win / reference modals
        └── index.ts                # Feature barrel export
```

---

## Where to put new code

| What | Where |
|---|---|
| Type used across multiple features | `src/types/common.ts` |
| Type used only within one feature | `src/features/<feature>/` |
| Reusable UI component with no game knowledge | `src/components/` |
| Pure function with no React dependency | `src/lib/` |
| Pure game logic (no state) | `features/puzzle/puzzle.logic.ts` or `puzzle.utils.ts` |
| Game state and side effects | `features/puzzle/usePuzzleGame.ts` |
| Feature UI / render | `features/puzzle/PuzzleScreen.tsx`, `puzzle.board.tsx` |

---

## Arrow key convention

`ArrowUp` = blank moves up = the tile **below** the blank fills the slot.  
The player steers the blank; surrounding tiles slide in from the opposite direction.

---

## Stack

- **React 18** + **TypeScript**
- **Vite** — dev server and build
- **Tailwind CSS** — styling
